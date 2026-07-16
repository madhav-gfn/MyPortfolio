/**
 * Medium feed loader
 * ------------------
 * Medium exposes a public RSS feed at https://medium.com/feed/@<user>, but it
 * can't be fetched directly from the browser (CORS). We go through a public
 * RSS→JSON service, and fall back to a raw-CORS proxy + client-side XML parse
 * if the first one is unavailable. No API key required.
 *
 * Returns normalized posts: { id, title, link, author, pubDate, categories,
 * contentHtml, text, excerpt, thumbnail, readingMinutes }.
 */

const stripHtml = (html = '') =>
  html
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();

const firstImage = (html = '') => {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : '';
};

const readingMinutes = (text = '') =>
  Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200));

const excerptFrom = (text = '', n = 160) =>
  text.length > n ? text.slice(0, n).trim() + '…' : text;

const normalize = (raw) => {
  const contentHtml = raw.contentHtml || '';
  const text = stripHtml(contentHtml || raw.description || '');
  return {
    id: raw.link || raw.guid || raw.title,
    title: raw.title || 'Untitled',
    link: raw.link || '',
    author: raw.author || 'Madhav Mishra',
    pubDate: raw.pubDate || '',
    categories: raw.categories || [],
    contentHtml,
    text,
    excerpt: excerptFrom(stripHtml(raw.description || contentHtml)),
    thumbnail: raw.thumbnail || firstImage(contentHtml),
    readingMinutes: readingMinutes(text),
  };
};

const feedUrl = (username) => {
  const handle = username.startsWith('@') ? username : `@${username}`;
  return `https://medium.com/feed/${handle}`;
};

// Parse a Medium RSS XML string (browser DOMParser) into normalized posts.
function parseFeedXml(xml) {
  const doc = new DOMParser().parseFromString(xml, 'text/xml');
  if (doc.querySelector('parsererror')) throw new Error('Invalid RSS XML');
  const items = [...doc.querySelectorAll('item')];
  const get = (el, tag) => el.getElementsByTagName(tag)[0]?.textContent || '';
  return items.map((el) =>
    normalize({
      link: get(el, 'link'),
      guid: get(el, 'guid'),
      title: get(el, 'title'),
      author: get(el, 'dc:creator'),
      pubDate: get(el, 'pubDate'),
      categories: [...el.getElementsByTagName('category')].map((c) => c.textContent),
      contentHtml: get(el, 'content:encoded'),
      description: get(el, 'description'),
    })
  );
}

// --- Source 1 (primary): our own /api/medium (Vercel fn / Vite dev middleware)
async function viaLocalApi(username) {
  const handle = username.startsWith('@') ? username : `@${username}`;
  const res = await fetch(`/api/medium?u=${encodeURIComponent(handle)}`);
  if (!res.ok) throw new Error(`/api/medium HTTP ${res.status}`);
  return parseFeedXml(await res.text());
}

// --- Source 2 (fallback): rss2json -----------------------------------------
async function viaRss2Json(username) {
  const res = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl(username))}`
  );
  if (!res.ok) throw new Error(`rss2json HTTP ${res.status}`);
  const data = await res.json();
  if (data.status !== 'ok') throw new Error(data.message || 'rss2json failed');
  return (data.items || []).map((it) =>
    normalize({
      link: it.link,
      guid: it.guid,
      title: it.title,
      author: it.author,
      pubDate: it.pubDate,
      categories: it.categories,
      contentHtml: it.content,
      description: it.description,
      thumbnail: it.thumbnail,
    })
  );
}

// --- Source 3 (fallback): allorigins raw proxy -----------------------------
async function viaAllOrigins(username) {
  const res = await fetch(
    `https://api.allorigins.win/raw?url=${encodeURIComponent(feedUrl(username))}`
  );
  if (!res.ok) throw new Error(`allorigins HTTP ${res.status}`);
  return parseFeedXml(await res.text());
}

export async function fetchMediumPosts(username) {
  if (!username) throw new Error('No Medium username configured');
  // Try our own endpoint first (fresh, reliable), then public proxies so a
  // single outage — or local dev without the function — isn't fatal.
  const sources = [viaLocalApi, viaRss2Json, viaAllOrigins];
  let lastErr;
  for (const source of sources) {
    try {
      const posts = await source(username);
      if (posts.length > 0) return posts; // got real data — done
      lastErr = new Error('empty feed'); // keep trying other sources
    } catch (err) {
      lastErr = err;
    }
  }
  // Every source was empty or failed. If it was genuinely empty, return [].
  if (lastErr && lastErr.message === 'empty feed') return [];
  throw lastErr || new Error('Could not load Medium feed');
}

export const mediumProfileUrl = (username) => {
  const handle = username?.startsWith('@') ? username : `@${username}`;
  return `https://medium.com/${handle}`;
};

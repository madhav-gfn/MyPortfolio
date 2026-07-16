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

// --- Source 1: rss2json ---------------------------------------------------
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

// --- Source 2: allorigins raw proxy + DOMParser ---------------------------
async function viaAllOrigins(username) {
  const res = await fetch(
    `https://api.allorigins.win/raw?url=${encodeURIComponent(feedUrl(username))}`
  );
  if (!res.ok) throw new Error(`allorigins HTTP ${res.status}`);
  const xml = await res.text();
  const doc = new DOMParser().parseFromString(xml, 'text/xml');
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

export async function fetchMediumPosts(username) {
  if (!username) throw new Error('No Medium username configured');
  try {
    return await viaRss2Json(username);
  } catch (err) {
    // Fall back to the raw proxy so a single service outage isn't fatal.
    return await viaAllOrigins(username);
  }
}

export const mediumProfileUrl = (username) => {
  const handle = username?.startsWith('@') ? username : `@${username}`;
  return `https://medium.com/${handle}`;
};

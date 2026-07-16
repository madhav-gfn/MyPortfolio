/**
 * Vercel serverless function: /api/medium?u=@handle
 * --------------------------------------------------
 * Fetches a Medium RSS feed server-side (no browser CORS, real User-Agent so
 * Medium returns the full feed) and returns the raw XML. The frontend parses
 * it. This is the reliable primary source; third-party proxies are only
 * client-side fallbacks. Runs on Vercel's Node runtime.
 */
export default async function handler(req, res) {
  const raw = (req.query?.u || process.env.VITE_MEDIUM_USERNAME || '').toString().trim();
  const handle = raw.startsWith('@') ? raw : `@${raw}`;

  if (!raw) {
    res.status(400).json({ error: 'Missing Medium handle (?u=@handle)' });
    return;
  }

  try {
    const upstream = await fetch(`https://medium.com/feed/${handle}`, {
      headers: {
        // A browser-like UA — Medium serves an empty stub to unknown agents.
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36',
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.9, */*; q=0.8',
      },
    });

    if (!upstream.ok) {
      res.status(502).json({ error: `Medium responded ${upstream.status}` });
      return;
    }

    const xml = await upstream.text();
    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    // Cache at the edge for 30 min, serve stale while revalidating.
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
    res.status(200).send(xml);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch Medium feed' });
  }
}

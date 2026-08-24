/**
 * XML sitemap for silmatervis.ksa.ee.
 *
 * The platform had no sitemap and no robots.txt, so its 110 education pages
 * were only reachable by following internal links — invisible to search
 * engines and AI crawlers doing discovery. Built from the same
 * public/data/pilot-pages.json the pages themselves render from, so it cannot
 * drift out of sync with the content.
 */
import fs from "fs";
import path from "path";

const SITE = "https://silmatervis.ksa.ee";

const STATIC_PATHS = [
  "/",
  "/refraktiivkirurgia-tarbijajuhend",
  "/refraktiivkirurgia-tarbijajuhend-en",
  "/refraktiivkirurgia-tarbijajuhend-ru",
  "/refraktiivkirurgia-juhend",
  "/refraktiivkirurgia-juhend-en",
  "/refraktiivkirurgia-juhend-ru",
  "/refraktiivkirurgia-juhend-flow3-jarel",
  "/refraktiivkirurgia-juhend-flow3-jarel-en",
  "/refraktiivkirurgia-juhend-flow3-jarel-ru",
];

function xmlEscape(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function getServerSideProps({ res }) {
  const file = path.join(process.cwd(), "public", "data", "pilot-pages.json");
  let pages = [];
  try {
    pages = JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {
    pages = [];
  }

  const urls = [
    ...STATIC_PATHS.map((p) => ({ loc: SITE + p, priority: p === "/" ? "1.0" : "0.7" })),
    ...pages.map((p) => ({
      loc: `${SITE}/${p.category}/${p.slug}`,
      priority: p.priority === 1 ? "0.8" : "0.6",
    })),
  ];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map((u) => `  <url>\n    <loc>${xmlEscape(u.loc)}</loc>\n    <priority>${u.priority}</priority>\n  </url>`)
      .join("\n") +
    `\n</urlset>\n`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(xml);
  res.end();
  return { props: {} };
}

export default function Sitemap() {
  return null;
}

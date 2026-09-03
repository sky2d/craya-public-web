import { Store } from "components/src/interfaces";
import { fetchAllStores } from "components/src/services/api";

export async function GET() {
  const stores = await fetchAllStores();

  if (!stores || !stores.data || stores.data.length === 0) {
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
       <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      {
        headers: {
          "Content-Type": "application/xml",
        },
      },
    );
  }

  const urls = stores.data
    .map((store: Store) => {
      return `
    <url>
      <loc>${store.url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

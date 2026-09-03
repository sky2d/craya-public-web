const BASE_URL = "https://craya.store";

// Static routes to include in the sitemap
const staticRoutes = [
  "/sellers",
  "/dashboard",
  "/contact",
  "/about",
  "/faq",
  "/policy",
  "/store",
  "/dashboard/products",
  "/builder",
  "/dashboard/link",
  "/dashboard/product/details",
];

export async function GET() {
  const urls = staticRoutes
    .map(
      path => `
    <url>
      <loc>${BASE_URL}${path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1</priority>
    </url>`,
    )
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

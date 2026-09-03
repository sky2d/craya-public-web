type SitemapParams = {
  params: {
    name: string;
  };
};

export async function GET(_: Request, { params }: SitemapParams) {
  const storeName = params.name;

  const urls = [`/`, `/products`, `/about`, `/contact`];

  const baseUrl = `https://${storeName}.craya.shop`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    url => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`,
  )
  .join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

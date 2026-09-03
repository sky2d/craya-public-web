/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      oneOf: [
        {
          resourceQuery: /component/, // e.g. ?component
          use: ["@svgr/webpack"],
        },
        {
          type: "asset/resource", // default export as URL
        },
      ],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/auth/:path*",
        has: [
          {
            type: "header",
            key: "rid",
          },
        ],
        destination: "http://localhost:8080/auth/:path*",
      },
    ];
  },
};

export default nextConfig;

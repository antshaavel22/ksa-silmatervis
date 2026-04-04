/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ksa.ee",
      },
      {
        protocol: "https",
        hostname: "rendia.com",
      },
      {
        protocol: "https",
        hostname: "silmatervis.ksa.ee",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
      ],
    },
  ],
  redirects: async () => [
    // Redirect old blog URLs to new platform if needed
    // Example: redirect blog posts that are moved to new platform
  ],
  rewrites: async () => ({
    beforeFiles: [
      // Add rewrites here if needed for API routes or external services
    ],
  }),
  env: {
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID || "GTM-KCZVRJ8",
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://silmatervis.ksa.ee",
  },
};

module.exports = nextConfig;

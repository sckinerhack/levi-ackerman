/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ["image.tmdb.org"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "image.tmdb.org",
      },

      {
        protocol: "https",
        hostname: "links.papareact.com",
      },
      {
        protocol: "https",
        hostname: "cimawbas.tv",
      },
    ],
  },
};

module.exports = nextConfig;

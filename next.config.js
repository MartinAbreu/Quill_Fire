/** @type {import('next').NextConfig} */

const { version } = require("./package.json");

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "upload.wikimedia.org",
      "avatar.iran.liara.run",
    ],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  env: {
    APP_VERSION: version,
  },
};

module.exports = nextConfig;

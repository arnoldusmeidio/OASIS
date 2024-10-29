const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "*.googleusercontent.com",
            port: "",
            pathname: "**",
         },
         {
            protocol: "https",
            hostname: "picsum.photos",
         },
         {
            protocol: "https",
            hostname: "images.unsplash.com",
         },
         {
            protocol: "https",
            hostname: "plus.unsplash.com",
         },
         {
            protocol: "https",
            hostname: "res.cloudinary.com",
         },
      ],
   },
   trailingSlash: true,
};

module.exports = withNextIntl(nextConfig);

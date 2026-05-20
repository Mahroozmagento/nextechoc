/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['sanity', 'next-sanity', '@sanity/ui', '@sanity/icons'],
}

module.exports = nextConfig
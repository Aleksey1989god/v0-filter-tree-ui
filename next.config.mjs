/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Важно для GitHub Pages
  trailingSlash: true,
  images: {
    unoptimized: true, // Важно для GitHub Pages
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

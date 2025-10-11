/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable TypeScript and ESLint checks during builds
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

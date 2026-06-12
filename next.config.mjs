/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Enable optimization — serve WebP/AVIF for much faster loads
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [32, 64, 128, 256, 384],
    // Allow external Pexels video domain for poster images if needed
    remotePatterns: [
      { protocol: 'https', hostname: 'videos.pexels.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
}

export default nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'pub-f96fb59b390c4a1a8c14efd70584ff15.r2.dev',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'lh3.googleusercontent.com',
        protocol: 'https',
        port: '',
      },
    ],
  },
}

export default nextConfig

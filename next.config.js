/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/redefinir-senha',
        destination: '/app/redefinir-senha/page',
      },
    ]
  },
}

module.exports = nextConfig 
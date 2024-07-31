/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      },
    distDir: 'build'
};

export default nextConfig;

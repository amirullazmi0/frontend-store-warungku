/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['ik.imagekit.io'],
    },
    env: {
        API_URL: process.env.API_URL,
    },
};

export default nextConfig;

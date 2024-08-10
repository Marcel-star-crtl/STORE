/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['res.cloudinary.com', 'anniesboutique.ulevus.com', 'anniesboutiqueadmin.ulevus.com', 'https://github.com/ulevus-team'], 
    },
    output: 'standalone',
    experimental: {
        wasm: {
            maxMemory: 1024 * 1024 * 1024, 
        },
    },
};

export default nextConfig;



/** @type {import('next').NextConfig} */


const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'bucketdemojava.s3.eu-west-3.amazonaws.com',
            },
        ],
    },
    // async rewrites() {
    //     return [
    //         {
    //             source: '/api_v2:path*', // Orice cerere către `/api/*`
    //             destination: 'http://localhost:8080:path*', // Redirecționează către serverul backend
    //         },
    //     ];
    // },
};

export default nextConfig;

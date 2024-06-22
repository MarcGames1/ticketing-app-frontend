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
    async rewrites() {
        return [
            {
                source: '/api_v2/:path*', //  `/api/*`
                destination: process.env.NEXT_PUBLIC_API, // redirect  backend
            },
        ];
    },
    skipTrailingSlashRedirect: true,
};

export default nextConfig;

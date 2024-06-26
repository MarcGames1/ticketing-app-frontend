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
    //             source: '/api/v2/:path*', //  `/api/*`
    //             destination: `http://localhost:8080/:path*`, // redirect  backend
    //         },
    //     ];
    // },
    skipTrailingSlashRedirect: true,
};

export default nextConfig;

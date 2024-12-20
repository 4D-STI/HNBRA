/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    async rewrites() {
        return [
            {
                source: '/api/files/:id/download',
                destination: `${process.env.NEXT_PUBLIC_API_BACK}/files/:id/download`,
            },
            {
                source: '/api/files/:name/view',
                destination: `${process.env.NEXT_PUBLIC_API_BACK}/files/:name/view`,
            },
        ];
    },
};

export default nextConfig;

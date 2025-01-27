    /** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'standalone',
    // async rewrites() {
    //     console.log('REGRAS: ', this.rewrites());
        
    //     return [
    //         {
    //             source: '/api/files/:id/download',
    //             destination: `${process.env.NEXT_PUBLIC_API_BACK}/files/:id/download`,
    //         },
    //         {
    //             source: '/api/files/:name/view',
    //             destination: `${process.env.NEXT_PUBLIC_API_BACK}/files/:name/view`,
    //         },
    //         {
    //             source: '/api/files/:id/viewLast',
    //             destination: `${process.env.NEXT_PUBLIC_API_BACK}/files/:id/viewLast`,
    //         },
    //     ];
    // },
};

export default nextConfig;

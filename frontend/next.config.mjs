    /** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol:'http',
                hostname:'localhost',
                port: '3002',
                pathname: '/',
                search: ''
            }
        ]
    }
    // output: 'standalone',
    // async rewrites() {
    //     console.log('REGRAS: ', this.rewrites());
        
    //     return [
    //         {
    //             source: '/api/files/:id/download',
    //             destination: `${process.env.URL_API}/files/:id/download`,
    //         },
    //         {
    //             source: '/api/files/:name/view',
    //             destination: `${process.env.URL_API}/files/:name/view`,
    //         },
    //         {
    //             source: '/api/files/:id/viewLast',
    //             destination: `${process.env.URL_API}/files/:id/viewLast`,
    //         },
    //     ];
    // },
};

export default nextConfig;

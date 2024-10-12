/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['localhost',"https://img.clerk.com","img.clerk.com"]
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        
        ignoreDuringBuilds: true,
      }
};

export default nextConfig;

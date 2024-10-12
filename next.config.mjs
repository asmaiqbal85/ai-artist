/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: "*.pollinations.ai"
        },
      ],
    },
  };
  
  export default nextConfig;

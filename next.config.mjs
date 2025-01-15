/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        domains : [
            "cdn2.iconfinder.com",
            "lh3.googleusercontent.com",
            "www.iconfinder.com"
        ]
    },
    typescript : {
        ignoreBuildErrors : true
    }
    
};

export default nextConfig;

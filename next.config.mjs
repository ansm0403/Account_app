/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        domains : [
            "cdn2.iconfinder.com",
            "lh3.googleusercontent.com",
            "www.iconfinder.com",
            "cdn1.iconfinder.com",
            "cdn4.iconfinder.com",
            "cdn.pixabay.com"
        ]
    },
    typescript : {
        ignoreBuildErrors : true
    }
    
};

export default nextConfig;

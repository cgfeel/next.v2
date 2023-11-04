import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/error/',
        },
        // sitemap: 'https://acme.com/sitemap.xml',
    };
}
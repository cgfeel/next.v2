import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://acme.com',
            lastModified: new Date(),
        },
        {
            url: 'https://acme.com/about',
            lastModified: new Date(),
        },
        {
            url: 'https://acme.com/blog',
            lastModified: new Date(),
        },
    ];
}
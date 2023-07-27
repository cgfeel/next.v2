'use client'

type ImgLoaderProps = {
    src: string;
    width: number;
    quality?: number;
};

const myImageLoader: (props: ImgLoaderProps) => string = ({ src, width, quality }) => `https://assets.vercel.com/image/upload/v1538361091/repositories/next-js/${src}?w=${width}&q=${quality || 75}`;

export default myImageLoader;
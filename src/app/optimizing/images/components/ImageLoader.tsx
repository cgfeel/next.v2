'use client'

import myImageLoader from "@/src/utils/myImageLoader";
import Image from "next/image";
import { FC } from "react";

const ImageLoader: FC = () => (
    <Image
        alt="Picture of the author"
        src="next-js-bg.png"
        loader={myImageLoader}
        width={1200}
        height={400}
        style={{
            maxWidth: '100%',
            height: 'auto',
        }}
    />
);

export default ImageLoader;
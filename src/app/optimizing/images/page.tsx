import vercel from "@/public/imgdir/vercel.png";
import Image from "next/image";
import ImageLoader from "./components/ImageLoader";
import LoadingComplete from "./components/LoadingComplete";

export default function Page() {
    return (
        <div>
            <h2>内部图片</h2>
            <Image
                alt="Vercel logo"
                src={vercel}
                width={1000}
                height={1000}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
                priority
            />
            <hr />
            <h2>外部图片</h2>
            <Image
                alt="Next.js logo"
                src="https://assets.vercel.com/image/upload/v1538361091/repositories/next-js/next-js-bg.png"
                width={1200}
                height={400}
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                }}
            />
            <hr />
            <h2>加载器图片</h2>
            <ImageLoader />
            <hr />
            <LoadingComplete />
        </div>
    );
}
import cat from "@/public/imgdir/cat.jpg";
import doc from "@/public/imgdir/dog.jpg";
import Image from "next/image";

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

const triplet = (e1: number, e2: number, e3: number) => 
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63);

const rgbDataURL = (r: number, g: number, b: number) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${
        triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

export default function Page() {
    return (
        <div>
            <h1>Image Component With Color Data URL</h1>
            <Image
                alt="Dog"
                src={doc}
                placeholder="blur"
                blurDataURL={rgbDataURL(237, 181, 6)}
                width={750}
                height={1000}
                style={{
                    display: 'inline',
                    maxWidth: '100%',
                    height: 'auto',
                }}
            />
            <Image
                alt="Cat"
                src={cat}
                placeholder="blur"
                blurDataURL={rgbDataURL(2, 129, 210)}
                width={750}
                height={1000}
                style={{
                    display: 'inline',
                    maxWidth: '100%',
                    height: 'auto',
                }}
            />
        </div>
    );
}
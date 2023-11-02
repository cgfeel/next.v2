import mountains from "@/public/imgdir/mountains.jpg";
import Image from "next/image";

export default function Page() {
    return (
        <div>
            <h1>Image Component With Placeholder Blur</h1>
            <Image
                alt="Mountains"
                src={mountains}
                placeholder="blur"
                width={700}
                height={475}
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                }}
            />
        </div>
    );
}
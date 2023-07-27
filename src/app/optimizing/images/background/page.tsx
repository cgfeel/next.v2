import mountains from "@/public/imgdir/mountains.jpg";
import Image from "next/image";

export default function Page() {
    return (
        <Image
            alt="Mountains"
            src={mountains}
            placeholder="blur"
            quality={100}
            fill
            sizes="100vw"
            style={{
                objectFit: 'cover',
            }}
        />
    );
}
import mountains from "@/public/imgdir/mountains.jpg";
import Image from "next/image";

export default function Page() {
    return (
        <div
            style={{ display: 'flex', flexDirection: 'column' }}
        >
            <Image
                alt="Mountains"
                src={mountains}
                sizes="100vw"
                style={{
                    width: '100%',
                    height: 'auto',
                }}
                priority
            />
        </div>
    );
}
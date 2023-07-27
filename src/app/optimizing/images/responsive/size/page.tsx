import mountains from "@/public/imgdir/mountains.jpg";
import Image from "next/image";

export default function Page() {
    return (
        <div
            style={{ 
                display: 'flex', 
                flexDirection: 'column',
            }}
        >
            <h1>Image Component With Layout Responsive</h1>
            <Image
                alt="Mountains"
                src={mountains}
                width={700}
                height={475}
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
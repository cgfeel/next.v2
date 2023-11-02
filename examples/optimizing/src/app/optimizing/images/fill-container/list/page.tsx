import mountains from "@/public/imgdir/mountains.jpg";
import Image from "next/image";

export default function Page() {
    return (
        <div>
            <h1>Image Component With Layout Fill</h1>
            <div
                style={{ 
                    position: 'relative', 
                    width: '300px', 
                    height: '500px'
                }}
            >
                <Image
                    alt="Mountains"
                    src={mountains}
                    fill
                    style={{
                        objectFit: 'cover',
                    }}
                    sizes="100vw"
                    priority
                />
            </div>
            <div
                style={{ 
                    position: 'relative', 
                    width: '300px', 
                    height: '500px'
                }}
            >
                <Image
                    alt="Mountains"
                    src={mountains}
                    fill
                    style={{
                        objectFit: 'contain',
                    }}
                    sizes="100vw"
                    priority
                />
            </div>
            <div
                style={{ 
                    position: 'relative', 
                    width: '300px', 
                    height: '500px'
                }}
            >
                <Image
                    alt="Mountains"
                    src={mountains}
                    quality={100}
                    fill
                    style={{
                        objectFit: 'none',
                    }}
                    sizes="100vw"
                    priority
                />
            </div>
        </div>
    );
}
import mountains from "@/public/imgdir/mountains.jpg";
import Image from "next/image";

export default function Page() {
    return (
        <div
            style={{ 
                display: 'grid', 
                gap: '8px',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, auto))'
            }}
        >
            <div
                style={{
                    position: 'relative',
                    height: '400px',
                }}
            >
                <Image
                    alt="Mountains"
                    src={mountains}
                    fill
                    sizes="(min-width: 808px) 50vw, 100vw"
                    style={{
                        objectFit: 'cover',
                    }}
                    priority
                />
            </div>
            <div
                style={{
                    position: 'relative',
                    height: '400px',
                }}
            >
                <Image
                    alt="Mountains"
                    src={mountains}
                    fill
                    sizes="(min-width: 808px) 50vw, 100vw"
                    style={{
                        objectFit: 'cover',
                    }}
                    priority
                />
            </div>
            <div
                style={{
                    position: 'relative',
                    height: '400px',
                }}
            >
                <Image
                    alt="Mountains"
                    src={mountains}
                    fill
                    sizes="(min-width: 808px) 50vw, 100vw"
                    style={{
                        objectFit: 'cover',
                    }}
                    priority
                />
            </div>
            <div
                style={{
                    position: 'relative',
                    height: '400px',
                }}
            >
                <Image
                    alt="Mountains"
                    src={mountains}
                    fill
                    sizes="(min-width: 808px) 50vw, 100vw"
                    style={{
                        objectFit: 'cover',
                    }}
                    priority
                />
            </div>
        </div>
    );
}
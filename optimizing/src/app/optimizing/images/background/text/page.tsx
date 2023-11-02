import mountains from "@/public/imgdir/mountains.jpg";
import Image from "next/image";

export default function Page() {
    return (
        <div>
            <div
                style={{
                    position: 'fixed',
                    height: '100vh',
                    width: '100vw',
                    overflow: 'hidden',
                    zIndex: -1,
                }}
            >
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
            </div>
            <p
                style={{
                    margin: 0,
                    fontSize: '2rem',
                    lineHeight: '3rem',
                    textAlign: 'center',
                    paddingTop: '40vh',
                    textShadow: '1px 1px 1px #3c5c5e',
                }}>
                    Image Component<br />
                    as a Background
                </p>
        </div>
    );
}
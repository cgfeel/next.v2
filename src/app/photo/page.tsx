import { PhotoItemType } from "@/src/components/frame/Frame";
import Api from "@/src/utils/api";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
    const photos = await Api.get<PhotoItemType[]>('http://localhost:3000/api/photo');
    return (
        <main
            className="container mx-auto"
        >
            <h1
                className="text-center text-4xl font-bold m-10"
            >
                NextGram
            </h1>
            <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 auto-rows-max gap-6 m-10"
            >
                {photos.map(({ id, imageSrc }) => (
                    <Link
                        href={`/photo/photos/${id}`}
                        key={id}
                    >
                        <Image
                            alt="w-full object-cover aspect-square"
                            className=""
                            height={500}
                            src={`/photo/${imageSrc}`}
                            width={500}
                        />
                    </Link>
                ))}
            </div>
        </main>
    );
}
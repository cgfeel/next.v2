import Image from "next/image";
import { FC } from "react";

export type PhotoItemType = {
    href: string;
    id: string;
    imageSrc: string;
    name: string;
    username: string;
}

const Frame: FC<{ photo: PhotoItemType; }> = ({ photo: { imageSrc, name, username } }) => (
    <>
        <Image
            alt=""
            className="w-full object-cover aspect-square col-span-2"
            height={600}
            src={`/photo/${imageSrc}`}
            width={600}
        />
        <div
            className="bg-black p-4 px-6"
        >
            <h3>{name}</h3>
            <p>Take by {username}</p>
        </div>
    </>
);

export default Frame;
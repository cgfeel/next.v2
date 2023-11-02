import Frame from "@/src/components/frame/Frame";
import { getPhotoItem } from "../../service";

export default async function Page({ params: { id } }: { params: { id: string } }) {
    const photo = await getPhotoItem(id);
    return (
        <div 
            className="container mx-auto my-10"
        >
            <div 
                className="w-1/2 mx-auto border border-gray-700"
            >
                <Frame photo={photo} />
            </div>
        </div>
    );
}
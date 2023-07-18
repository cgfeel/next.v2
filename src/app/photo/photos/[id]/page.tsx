import Frame, { PhotoItemType } from "@/src/components/frame/Frame";
import Api from "@/src/utils/api";

export default async function Page({ params: { id } }: { params: { id: string } }) {
    const photo = await Api.get<PhotoItemType>(`http://localhost:3000/api/photo?id=${id}`);
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
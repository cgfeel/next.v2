import Frame, { PhotoItemType } from "@/src/components/frame/Frame";
import Modal from "@/src/components/modal/Modal";
import Api from "@/src/utils/api";

export default async function Page({ params: { id } }: { params: { id: string } }) {
    const photo = await Api.get<PhotoItemType>(`http://localhost:3000/api/photo?id=${id}`);

    return (
        <Modal>
            <Frame photo={photo} />
        </Modal>
    );
}
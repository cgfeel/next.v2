import Frame from "@/src/components/frame/Frame";
import Modal from "@/src/components/modal/Modal";
import { getPhotoItem } from "../../../service";

export default async function Page({ params: { id } }: { params: { id: string } }) {
    const photo = await getPhotoItem(id);

    return (
        <Modal>
            <Frame photo={photo} />
        </Modal>
    );
}
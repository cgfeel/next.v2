import { PhotoItemType } from "@/src/components/frame/Frame";

const photos: PhotoItemType[] = [
    {
        id: '1',
        name: '美漫参考',
        href: 'https://huaban.com/pins/4195619020',
        username: '@Kaman、',
        imageSrc: '609d6bc5cc55be62018df74561414d4cb077f3a9a05d4-EUDMv6.jpeg',
    },
    {
        id: '2',
        name: '【大神堂】berni wrightson-科学怪人',
        href: 'https://huaban.com/pins/352784716',
        username: '@小K-ART',
        imageSrc: 'b9fef52116c6f18c80be0fa58c1360c3d177804c30f7a-6HIwK5.jpeg',
    },
    {
        id: '3',
        name: '马克笔大神',
        href: 'https://huaban.com/pins/3667639942',
        username: '@C2+',
        imageSrc: '67832e345e5fa85add06defded6ee5e74f4b668936324-YgIWjS_fw1200.jpeg',
    },
    {
        id: '4',
        name: 'Est13话漫画_Levius漫画Est13话第14页_Levius情报',
        href: 'https://huaban.com/pins/2484899965',
        username: '@TOOTOOMUA',
        imageSrc: '668a2ae6ff579c455d7cc86ed68bb61f491ac7b541092-uC835d_fw1200.jpeg',
    },
    {
        id: '5',
        name: 'City of Steam, min seub Jung : City of Steam by min seub Jung on ArtStation.',
        href: 'https://huaban.com/pins/482784375',
        username: '@Yora',
        imageSrc: '3a4283df86aeb5532ed8d1bc292830cee42425d4760e1-wHjcmn_fw1200.jpeg',
    },
    {
        id: '6',
        name: '【JACK游戏UI】游戏原画人物立绘设定角色美宣插画动漫',
        href: 'https://huaban.com/pins/4247247518',
        username: '@DEVILJACK-99',
        imageSrc: '3e9d300a6834ccebb7cc018b0ef4a4dd57e292cc7eec2-akhPDe_fw1200.jpeg',
    },
    {
        id: '7',
        name: 'EVA漫画扉页精选',
        href: 'https://huaban.com/pins/794761589',
        username: '@清如许95',
        imageSrc: '3427a7dd003e28a7caf527f025f33af2351413d1131b6c-qmg318.jpeg',
    },
    {
        id: '8',
        name: '【DA】seangordonmurphy',
        href: 'https://huaban.com/pins/1164768401',
        username: '@行天之道总萌一切',
        imageSrc: '9af8611c60504c2571778f69bf28c346fa1220aa59edd-Hsktrg_fw1200.jpeg',
    },
    {
        id: '9',
        name: 'Victo倪传婧的微博',
        href: 'https://huaban.com/pins/2794749038',
        username: '@流苏-LIUSU',
        imageSrc: '991f997dbd5a9e38810a8cb9531a95c21f13a8f954974-WkEtrw_fw1200.jpeg',
    },
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id === null) {
        return new Response(JSON.stringify(photos), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }, 
        });
    }

    const data = photos.find(item => item.id === id);
    return new Response(JSON.stringify(data||photos[0]), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        }, 
    });
}
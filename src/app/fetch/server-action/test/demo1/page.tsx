import Api from "@/src/utils/api";
import RevalidateTrigger from "./RevalidateTrigger";

type UserItem = {
    id: number;
    uid: string;
    username: string;
};

function sleep(time: number) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

const getData = async () => {
    const resposne = await fetch('https://random-data-api.com/api/users/random_user?size=1', {
        cache: 'no-store'
    });
    const data: UserItem[] = await resposne.json();
    const { id, uid, username } = data[0];
  
    return { id, uid, username };
};

export default async function Page() {
    const data = await getData();

    // 暂且屏蔽，因为编译可能过不去
    /*console.log('=======================');
    console.log('rendering DemoPage', data);

    if (data.id % 2 === 0) {
        throw Error(`user id is an even number: ${data.id}`);;
    }*/

    return (
        <div>
            <h2>Hello, {data.username} - {data.id}</h2>
            <RevalidateTrigger />
        </div>
    );
}
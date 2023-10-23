import { getTime } from "../react-cache/service";

export const preload = (num: number) => {
    void getTime(num);
};

export default async function TimeInfo({ num }: { num: number }) {
    const data = await getTime(num);
    return (
        <div>time info: {data.fromDateTime}</div>
    );
}
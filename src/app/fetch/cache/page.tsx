import Api from "@/src/utils/api";

export default async function Page() {
    // const data = await Api.get<{time: number}>(`${process.env.HOME_URL}/api/time`);
    // : {new Date(data.time).toLocaleTimeString()}
    return (
        <div>page time</div>
    );
}
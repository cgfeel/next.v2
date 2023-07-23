import { TimeType } from "@/src/app/blog/time/page";
import Api from "@/src/utils/api";
import dayjs from "dayjs";
import { DateTimeType } from "./layout";

export default async function Page() {
    const data = await Api.post<DateTimeType>('https://timeapi.io/api/Conversion/ConvertTimeZone', {
        data: {
            fromTimeZone: 'Europe/Amsterdam',
            dateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            toTimeZone: 'Asia/Shanghai',
            dstAmbiguity: '',
        },
    });
    return (
        <div>page time: {data.fromDateTime}</div>
    );
}
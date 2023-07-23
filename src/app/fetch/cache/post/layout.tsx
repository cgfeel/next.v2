import { TimeType } from "@/src/app/blog/time/page";
import Api from "@/src/utils/api";
import dayjs from "dayjs";
import { PropsWithChildren } from "react";

export type DateTimeType = {
    fromDateTime: string;
};

export default async function Layout({ children }: PropsWithChildren<{}>) {
    const data = await Api.post<DateTimeType>('https://timeapi.io/api/Conversion/ConvertTimeZone', {
        data: {
            fromTimeZone: 'Europe/Amsterdam',
            dateTime: dayjs().add(-1, 'day').format('YYYY-MM-DD HH:mm:ss'),
            toTimeZone: 'Asia/Shanghai',
            dstAmbiguity: '',
        },
    });
    return (
        <div>
            <div>post layout time: {data.fromDateTime}</div>
            <hr />
            {children}
        </div>
    );
}
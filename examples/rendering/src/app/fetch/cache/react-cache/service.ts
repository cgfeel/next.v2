import Api from "@/src/utils/api";
import dayjs from "dayjs";
import { cache } from "react";
import { DateTimeType } from "../post/layout";

export const getTime: (num: number) => Promise<DateTimeType> = cache(async num => {
    const random = Math.ceil(Math.random()*1000);
    const data = await Api.post<DateTimeType>('https://timeapi.io/api/Conversion/ConvertTimeZone', {
        data: {
            fromTimeZone: 'Europe/Amsterdam',
            dateTime: dayjs().add(-1, 'day').add(random, 'minute').format('YYYY-MM-DD HH:mm:ss'),
            toTimeZone: 'Asia/Shanghai',
            dstAmbiguity: '',
        },
    });
    return data;
});
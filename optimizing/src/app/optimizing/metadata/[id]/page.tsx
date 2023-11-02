import Api from "@/src/utils/api";
import dayjs from "dayjs";
import { Metadata, ResolvingMetadata } from "next";
import { DateTimeType } from "../layout";
import { openGraphSubImage } from "../share-metadata";

export async function generateMetadata(
    { params, searchParams }: Props, parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = params;
    const num = parseInt(id)||0;

    const data = await Api.post<DateTimeType>('https://timeapi.io/api/Conversion/ConvertTimeZone', {
        data: {
            fromTimeZone: 'Europe/Amsterdam',
            dateTime: dayjs().add(num * -1, 'day').format('YYYY-MM-DD HH:mm:ss'),
            toTimeZone: 'Asia/Shanghai',
            dstAmbiguity: '',
        },
    });

    const previousImages = (await parent).openGraph?.images||[];
    return {
        title: `The date is: ${data.fromDateTime}`,
        openGraph: {
            images: ['/imgdir/vercel.png', ...previousImages, ...(openGraphSubImage.images)],
        },
    };
}

export default function Page({ params, searchParams }: Props) {
    const { id } = params;
    return (
        <div>Dynamic metadata, id: {id} - searchParams: {JSON.stringify(searchParams)}.</div>
    );
}

type Props = {
    params: { id: string };
    searchParams: {
        [key: string]: string|string[]|undefined
    }
};
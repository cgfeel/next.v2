import { DateTimeType } from "@/src/app/fetch/cache/post/layout";
import Api from "@/src/utils/api";
import dayjs from "dayjs";
import { ImageResponse } from "next/server";

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'About Acme';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

// Font
const interSemiBold = fetch(
    'http://up1.yii.so/jianli/static/Inter-Bold.ttf'
).then(
    res => res.arrayBuffer()
);

// Image generation
export default async function Image({ params }: { params: { id: string } }) {
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

    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 128,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                <p style={{ fontSize: 78, margin: 0 }}>{data.fromDateTime}</p>
                <p style={{ margin: 0 }}>About Acme - {id}</p>
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported opengraph-image
            // size config to also set the ImageResponse's width and height.
            ...size,
            fonts: [
                {
                    name: 'Inter',
                    data: await interSemiBold,
                    style: 'normal',
                    weight: 400,
                }
            ],
        }
    );
}
'use client'

import vercel from "@/public/imgdir/vercel.png";
import Image from "next/image";
import { FC, useState } from "react";

type InfoType = Record<'onError'|'onLoad'|'onLoadingCompleteNaturalWidth', number>;

const LoadingComplete: FC = () => {
    const [info, setInfo] = useState<InfoType>({
        onError: 0,
        onLoad: 0,
        onLoadingCompleteNaturalWidth: 0,
    });

    return (
        <div>
            <h2>onLoadingComplete naturalWidth：{info.onLoadingCompleteNaturalWidth||'--'}</h2>
            <h2>onLoad info：{info.onLoad > 0 ? 'load' : 'wait'}</h2>
            <h2>onError info：{info.onError > 0 ? 'error' : 'normal'}</h2>
            <Image
                alt="Vercel logo"
                src={vercel}
                width={1000}
                height={1000}
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                }}
                onError={e => setInfo(data => ({
                    ...data,
                    onError: 1,
                }))}
                onLoad={() => setInfo(data => ({
                    ...data,
                    onLoad: 1,
                }))}
                onLoadingComplete={img => setInfo(data => ({
                    ...data,
                    onLoadingCompleteNaturalWidth: img.naturalWidth
                }))}
                priority
            />
        </div>
    );
};

export default LoadingComplete;
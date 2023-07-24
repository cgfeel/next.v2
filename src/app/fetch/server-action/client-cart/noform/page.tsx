'use client'

import { TimeType } from '@/src/app/blog/time/page';
import Api from '@/src/utils/api';
import useSWR from 'swr';
import { useState } from 'react';
import { addItem } from "../action";

const getTimeInfo: () => Promise<TimeType> = async () => {
    return await Api.get<TimeType>('http://worldtimeapi.org/api/timezone/Asia/Shanghai');
};

export default function Page() {
    const [update, setUpdate] = useState(0);
    useSWR(update > 0 ? 'time' : null, getTimeInfo, {
        refreshInterval: 1000,
        onError: () => console.error('fetch fail'),
        onSuccess: info => {
            setUpdate(num => num > 3 ? 0 : num + 1);
            console.log('success', info);
        },
    });

    return (
        <button 
            type="submit"
            onClick={() => addItem().then(success => success && setUpdate(1))}
        >
            Add to noform Cart
        </button>
    );
}
'use client'

import confetti from 'http://up1.yii.so/canvas-confetti';
import { FC, useEffect } from 'react';

const Canvas: FC = () => {
    useEffect(() => {
        confetti();
    }, []);
    return <p>Hello</p>
};

export default Canvas;
'use client'

import confetti from 'http://up1.yii.so/canvas-confetti';
// import { name } from 'http://up1.yii.so/jianli/static/square_1.js';
import { FC, useEffect } from 'react';

const Canvas: FC = () => {
    const name = 'canvas';
    useEffect(() => {
        confetti();
        return () => {
            confetti.reset();
        };
    }, []);
    return <p>Hello, {name}</p>
};

export default Canvas;
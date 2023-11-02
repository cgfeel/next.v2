'use client'

// import confetti from 'http://up1.yii.so/canvas-confetti';
import { name } from 'http://up1.yii.so/jianli/static/square_1.js';
import { FC, useEffect } from 'react';

const Canvas: FC = () => {
    /*useEffect(() => {
        confetti();
    }, []);*/
    return <p>Hello, {name}</p>
};

export default Canvas;
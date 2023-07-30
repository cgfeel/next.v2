'use client'

import localFont from 'next/font/local';
import { FC } from "react";
import styles from "../About.module.css";
import Paragraph from "./Paragraph";

const cooper = localFont({
    src: [
        {
            path: '../../../../../../public/font/cooperhewitt-book-webfont.woff2',
            weight: '400',
        },
        {
            path: '../../../../../../public/font/cooperhewitt-bold-webfont.woff2',
            weight: '700',
        },
    ],
});

// variable font
// const variableFont = localFont({ src: '../public/fonts/my-variable-font.woff2' });

const LocalFont: FC = () => {
    return (
        <>
            <Paragraph className={styles.contact} name="cooper(local)" />
            <style jsx global>{`
                :root {
                    --cooper-font: ${cooper.style.fontFamily};
                }
            `}</style>
        </>
    )
};

export default LocalFont;
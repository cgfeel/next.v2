'use client'

import { MDXProvider } from "@mdx-js/react";
import Image from "next/image";
import { FC, PropsWithChildren, ReactNode } from "react";
import Main from './main.mdx';

const ResponsiveImage = (props: Omit<JSX.IntrinsicElements['img'], 'placeholder'|'ref'>) => (
    <Image
        {...props}
        src={props.src as string}
        alt={(props.alt||'') as string}
        sizes="100vw"
        width={1200}
        height={400}
        style={{ width: '100%', height: 'auto' }}
    />
);

const ResponsiveUl = ({ children }: JSX.IntrinsicElements['ul']) => (
    <ul
        style={{
            listStyle: 'inherit',
            margin: 18,
        }}
    >
        {children}
    </ul>
);

const ResponsiveH2 = ({ children }: JSX.IntrinsicElements['h2']) => (
    <h2
        style={{
            fontSize: 28,
        }}
    >
        {children}
    </h2>
);

const components = {
    img: ResponsiveImage,
    ul: ResponsiveUl,
    h2: ResponsiveH2,
};

export default function Page() {
    return (
        <MDXProvider components={components}>
            <Main />
        </MDXProvider>
    );
}
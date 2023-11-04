import { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import { ReactNode } from "react";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.
 
// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Allows customizing built-in components, e.g. to add styling.
        h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
        img: (props) => {
            const dataProps = props as ImageProps;
            const data = (
                <Image
                    {...dataProps}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    width={1200}
                    height={400}
                    alt={dataProps.alt||''}
                    priority
                />
            );
            return data as ReactNode;
        },
        ...components,
    };
}
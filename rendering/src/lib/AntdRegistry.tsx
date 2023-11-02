'use client'

import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs";
import Entity from "@ant-design/cssinjs/lib/Cache";
import { useServerInsertedHTML } from "next/navigation";
import { FC, PropsWithChildren, useMemo } from "react"

const StyledComponentsRegistry: FC<PropsWithChildren<{}>> = ({ children }) => {
    const cache = useMemo<Entity>(() => createCache(), []);
    useServerInsertedHTML(() => (
        <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
    ));

    return <StyleProvider cache={cache}>{children}</StyleProvider>
};

export default StyledComponentsRegistry;
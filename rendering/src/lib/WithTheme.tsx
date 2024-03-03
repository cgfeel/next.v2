"use client";

import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider, theme as antdTheme } from "antd";
import { FC, PropsWithChildren } from "react";
import theme from "./themeConfig";

const WithTheme: FC<PropsWithChildren<WithThemeProps>> = ({ children, darkTheme }) => {
    return (
        <ConfigProvider
            theme={{ ...theme, algorithm: darkTheme ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm }}>
            <StyleProvider hashPriority="high">{children}</StyleProvider>
        </ConfigProvider>
    );
};

export interface WithThemeProps {
    darkTheme?: boolean;
}

export default WithTheme;

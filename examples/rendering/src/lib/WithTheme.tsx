'use client'

import { ConfigProvider } from "antd";
import { FC, PropsWithChildren } from "react";
import theme from "./themeConfig";

const WithTheme: FC<PropsWithChildren<{}>> = ({ children }) => (
    <ConfigProvider theme={theme}>
        {children}
    </ConfigProvider>
);

export default WithTheme;
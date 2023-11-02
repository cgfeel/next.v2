'use client';

import { Layout } from "@douyinfe/semi-ui";
import { ThemeProvider } from "next-themes";
import { FC, PropsWithChildren } from "react";

/**
 * https://github.com/hamster1963/HomeDash
 * https://blog.maximeheckel.com/posts/switching-off-the-lights-part-2-fixing-dark-mode-flashing-on-servered-rendered-website/
 * https://www.joshwcomeau.com/css/css-variables-for-react-devs/#dark-mode-flash-fix
 */

const ProvidersClient: FC<PropsWithChildren<ProvidersClientProps>> = ({ children, nonce }) => (
    <ThemeProvider
        attribute="theme-mode"
        enableColorScheme={true}
        enableSystem={true}
    >
        <Layout>{children}</Layout>
    </ThemeProvider>
);

export interface ProvidersClientProps {
    nonce: string;
};

export default ProvidersClient;
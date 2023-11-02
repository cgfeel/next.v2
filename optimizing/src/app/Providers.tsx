'use client';

import { Layout } from "@douyinfe/semi-ui";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

/**
 * https://github.com/hamster1963/HomeDash
 * https://blog.maximeheckel.com/posts/switching-off-the-lights-part-2-fixing-dark-mode-flashing-on-servered-rendered-website/
 * https://www.joshwcomeau.com/css/css-variables-for-react-devs/#dark-mode-flash-fix
 */

export function Providers({ children }: PropsWithChildren<{}>) {
    return (
        <ThemeProvider
            attribute="theme-mode"
            enableColorScheme={true}
            enableSystem={true}
            nonce={''}
        >
            <Layout>{children}</Layout>
        </ThemeProvider>
    );
}
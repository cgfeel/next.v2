"use client";

import { Flex } from "antd";
import { FC, PropsWithChildren, ReactNode, useEffect } from "react";
import PickCard, { ThemeMode } from "./PickCard";

const SelectTheme: FC<PropsWithChildren<SelectThemeProps>> = ({ children, system, theme, changeSystem, onChange }) => {
    useEffect(() => {
        const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
        const themeValue = themeMedia.matches ? "light" : "dark";
        const handle = (event: MediaQueryListEvent) => {
            changeSystem(event.matches ? "light" : "dark");
        };

        system !== themeValue && changeSystem(themeMedia.matches ? "light" : "dark");
        themeMedia.addEventListener("change", handle);
        return () => {
            themeMedia.removeEventListener("change", handle);
        };
    }, [system, changeSystem]);

    return (
        <div style={{ padding: 24 }}>
            <Flex vertical gap={12}>
                <Flex justify="space-between">
                    <h1>主题测试</h1>
                    <PickCard
                        value={theme}
                        onChange={theme => {
                            onChange(theme);
                        }}
                    />
                </Flex>
                {children}
            </Flex>
        </div>
    );
};

export type StstemMode = Exclude<ThemeMode, "auto">;

export interface SelectThemeProps extends Pick {
    system: StstemMode;
    theme: ThemeMode;
    changeSystem: (val: StstemMode) => Promise<void>;
    onChange: (val: ThemeMode) => Promise<void>;
}

export default SelectTheme;

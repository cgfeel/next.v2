"use client";

import { Flex } from "antd";
import { FC, PropsWithChildren } from "react";
import PickCard, { ThemeMode } from "./PickCard";

const SelectTheme: FC<PropsWithChildren<SelectThemeProps>> = ({ children, theme, onChange }) => {
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

export interface SelectThemeProps {
    theme: ThemeMode;
    onChange: (val: ThemeMode) => Promise<void>;
}

export default SelectTheme;

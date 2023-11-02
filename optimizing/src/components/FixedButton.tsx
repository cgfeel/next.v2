'use client';

import { IconDesktop, IconMoon, IconSun } from "@douyinfe/semi-icons";
import { Button } from "@douyinfe/semi-ui";
import { useTheme } from "next-themes";
import { FC, useEffect, useState } from "react";

const FixedButton: FC = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // 避免闪烁
    useEffect(() => {
        setMounted(true);
    }, [setMounted]);

    if (!mounted) {
        return null;
    }

    return (
        <div 
            className="fixedButton"
        >
            <Button
                aria-label="浅色模式"
                type="tertiary"
                icon={<IconSun />}
                style={{ borderRadius: '50%' }}
                theme={theme === "light" ? "solid" : "borderless"}
                onClick={() => setTheme('light')}
            />
            <Button
                aria-label="深色模式"
                type="tertiary"
                icon={<IconMoon />}
                style={{ borderRadius: '50%' }}
                theme={theme === "dark" ? "solid" : "borderless"}
                onClick={() => setTheme('dark')}
            />
            <Button
                aria-label="系统设置"
                type="tertiary"
                icon={<IconDesktop />}
                style={{ borderRadius: '50%' }}
                theme={theme === "system" ? "solid" : "borderless"}
                onClick={() => setTheme('system')}
            />
        </div>
    );
};

export default FixedButton;
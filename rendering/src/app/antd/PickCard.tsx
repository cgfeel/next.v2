"use client";

import { Card, Flex, Segmented, SegmentedProps } from "antd";
import { SegmentedOptions } from "antd/es/segmented";

const PickCard = <T extends string = string, U extends FormatDate<T> = FormatDate<T>>({
    value,
    onChange,
    options,
}: PickCardProps<T, U>) => {
    const defaultOptions = [
        { label: "自动", value: "auto" },
        { label: "亮色", value: "light" },
        { label: "暗色", value: "dark" },
    ] as SegmentedOptions<U>;
    return (
        <Card size="small">
            <Flex align="center" gap={16}>
                主题模式：
                <Segmented<U> options={options || defaultOptions} value={value} onChange={onChange} />
            </Flex>
        </Card>
    );
};

type ThemeAppearance = "dark" | "light" | string;

type FormatDate<Pattern extends string> = Pattern extends ThemeMode ? ThemeMode : CustomAppearance;

export type ThemeMode = "auto" | "dark" | "light";

export type CustomAppearance = ThemeAppearance | "grey";

export interface PickCardProps<T extends string = string, U extends FormatDate<T> = FormatDate<T>>
    extends Pick<SegmentedProps<U>, "onChange" | "value"> {
    options?: SegmentedProps<U>["options"];
}

export default PickCard;

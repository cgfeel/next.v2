"use client";

import { Divider, Space, Typography } from "antd";
import Image from "next/image";
import { FC, PropsWithChildren, ReactNode } from "react";

const { Title } = Typography;

const TopLog: FC<PropsWithChildren<TopLogProps>> = ({ children, className, tips = <>Divider</> }) => (
    <section className={className}>
        <Space align="center">
            <Image alt="Ant Design" height={40} src="/antd.svg" width={40} priority />
            <Title level={2} style={{ marginBottom: 0 }}>
                Ant Design (Without Sub Components)
            </Title>
        </Space>
        <div className="mb-10">
            <Divider>{tips}</Divider>
        </div>
        {children}
    </section>
);

export interface TopLogProps {
    className?: string;
    tips?: ReactNode;
}

export default TopLog;

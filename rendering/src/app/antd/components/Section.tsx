"use client";

import { Button } from "antd";
import { FC } from "react";
import TopLog from "./TopLogo";

const Section: FC = () => (
    <TopLog className="mb-10 mt-12 p-[100px] text-center">
        <Button type="primary" block>
            With Sub Components
        </Button>
    </TopLog>
);

export default Section;

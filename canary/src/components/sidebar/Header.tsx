import { FC } from "react";
import NextLogo from "../icon/NextLogo";

const Header: FC = () => (
    <div
        className="flex h-14 items-center px-4 py-4 lg:h-auto"
    >
        <div
            className="group flex w-full items-center gap-x-2.5"
        >
            <div 
                className="h-7 w-7 rounded-full border border-white/30"
            >
                <NextLogo />
            </div>
            <h3 
                className="font-semibold tracking-wide text-gray-400"
            >
                Partial Prerendering
            </h3>
        </div>
    </div>
);

export default Header;
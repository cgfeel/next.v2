import { FC, PropsWithChildren } from "react";

const Header: FC<PropsWithChildren<{}>> = ({ children }) => (
    <div
        className="flex items-center justify-between gap-x-3 rounded-lg bg-gray-800 px-3 py-3 lg:px-5 lg:py-4"
    >
        {children}
    </div>
);

export default Header;
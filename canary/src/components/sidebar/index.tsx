'use client';

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { FC, PropsWithChildren, ReactNode, useState } from "react";

const Sidebar: FC<PropsWithChildren<SidebarProps>> = ({ children, header }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div
            className="fixed top-0 z-20 flex w-full flex-col border-b border-gray-800 bg-black lg:bottom-0 lg:z-auto lg:w-72 lg:border-b-0 lg:border-r lg:border-gray-800"
        >
            {header}
            <button
                type="button"
                className="group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div 
                    className="font-medium text-gray-100 group-hover:text-gray-400"
                >
                    Menu
                </div>
                {isOpen ? (
                    <XMarkIcon className="block w-6 text-gray-400" />
                ) : (
                    <Bars3Icon className="block w-6 text-gray-400" />
                )}
            </button>
            <div
                className={clsx('overflow-y-auto lg:static lg:block', {
                    'fixed inset-x-0 bottom-0 top-14 mt-px bg-black': isOpen,
                    hidden: !isOpen,
                })}
            >
                {children}
            </div>
        </div>
    );
};

export interface SidebarProps {
    header: ReactNode;
}

export default Sidebar;
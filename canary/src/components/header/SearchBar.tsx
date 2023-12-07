import { FC } from "react";
import NextLogo from "../icon/NextLogo";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const SearchBar: FC = () => (
    <div 
        className="flex gap-x-3"
    >
        <div 
            className="h-10 w-10 hover:opacity-70"
        >
            <NextLogo />
        </div>
        <div 
            className="relative flex-1"
        >
            <div 
                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            >
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-300" />
            </div>
            <input
                aria-label="Search"
                autoComplete="off"
                className="block w-full rounded-full border-none bg-gray-600 pl-10 font-medium text-gray-200 focus:border-vercel-pink focus:ring-2 focus:ring-vercel-pink"
                id="search"
                name="search"
                type="search"
            />
        </div>
    </div>
);

export default SearchBar;
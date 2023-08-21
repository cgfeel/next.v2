'use client'

import { useSearchParams } from "next/navigation";
import { FC } from "react";

const SearchBar: FC = () => {
    const searchParams = useSearchParams();

    return (
        <div>
            <div>get:</div>
            <ul>
                <li>
                    <code>search-params?a=1&a=2&b</code> get a: <code>{JSON.stringify(searchParams.get('a'))}</code>
                </li>
                <li>
                    <code>search-params?a=1&a=2&b</code> get b: <code>{JSON.stringify(searchParams.get('b'))}</code>
                </li>
                <li>
                    <code>search-params?a=1&a=2&b</code> get c: <code>{JSON.stringify(searchParams.get('c'))}</code>
                </li>
                <li>
                    <code>search-params?a=1&a=2&b</code> get all: <code>{JSON.stringify(searchParams.getAll('a'))}</code>
                </li>
            </ul>
            <hr />
            <div>has {'(suspense)'}:</div>
            <ul>
                <li>
                    <code>search-params?a=1&a=2&b</code> has a: <code>{JSON.stringify(searchParams.has('a'))}</code>
                </li>
                <li>
                    <code>search-params?a=1&a=2&b</code> has c: <code>{JSON.stringify(searchParams.has('c'))}</code>
                </li>
            </ul>
        </div>
    );
};

export default SearchBar;
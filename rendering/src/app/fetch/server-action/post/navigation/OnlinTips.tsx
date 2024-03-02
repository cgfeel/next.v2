"use client";

import { useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";

const OnlineTips: FC = () => {
    const [online, setOnline] = useState(0);
    const router = useRouter();

    const navHandle = useCallback(() => {
        const hash = window.location.hash.split("#")[1];
        const parsedHash = new URLSearchParams(hash);

        const name = parsedHash.get("name");
        if (name === "python") {
            router.replace("/fetch/server-action/post/6");
        }
    }, [router]);

    useEffect(() => {
        if (navigator.onLine) {
            navHandle();
        } else {
            setOnline(1);
        }
        return () => {
            setOnline(0);
        };
    }, [navHandle, setOnline]);

    return online === 0 ? (
        <>loading...</>
    ) : (
        <div>
            <h2>Not Found-app in tag post.</h2>
            <p>Could not find requested resource</p>
            <button onClick={() => navigator.onLine && navHandle()}>Try again</button>
        </div>
    );
};

export default OnlineTips;

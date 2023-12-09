'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

const NavigationEvent = forwardRef<NavigationEventInstance, NavigationEventProps>((_, ref) => {
    const demoRef = useRef({ path: '', name: '' });
    const router = useRouter();

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentUrl = useCallback(
        () => [pathname, searchParams].filter(i => i).join('?'), 
        [pathname, searchParams]
    );

    useImperativeHandle(ref, () => ({
        flag: pending => {
            demoRef.current.path = pending !== '' ? currentUrl() : '';
            demoRef.current.name = pending;
        }
    }));

    useEffect(() => {
        const url = currentUrl();
        const path = demoRef.current.path;
        if (path !== '' && url !== path) {
            const confirm = window.confirm("Are you sure want to leave this page?");
            if (!confirm) {
                router.back();
            } else {
                localStorage.removeItem(demoRef.current.name);
            }
        }
    }, [demoRef, router, currentUrl]);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = 'confirm';
            return 'confirm';
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        }
    }, []);

    return null;
});

if (process.env.NODE_ENV !== 'production') {
    NavigationEvent.displayName = 'NavigationEvent';
}

export interface NavigationEventInstance {
    flag: (pending: string) => void;
}

export interface NavigationEventProps {}

export default NavigationEvent;
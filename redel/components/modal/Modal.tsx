'use client'

import { useRouter } from "next/navigation";
import { FC, KeyboardEventHandler, MouseEventHandler, PropsWithChildren, useCallback, useEffect, useRef } from "react"

const Modal: FC<PropsWithChildren<{}>> = ({ children }) => {
    const overlay = useRef(null);
    const wrapper = useRef(null);
    const router = useRouter();

    const onDismiss = useCallback(() => {
        router.back();
    }, [router]);

    const onClick: MouseEventHandler = useCallback(e => {
        if (e.target === overlay.current || e.target === wrapper.current) {
            if (onDismiss) onDismiss();
        }
    }, [overlay, wrapper, onDismiss]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onDismiss();
    }, [onDismiss]);

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [onKeyDown]);

    return (
        <div
            className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60"
            ref={overlay}
            onClick={onClick}
        >
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-10/12 md:w-8/12 lg:w-1/2 p-6"
                ref={wrapper}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
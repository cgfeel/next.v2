'use client';

import { FC, PropsWithChildren, Suspense, createContext, useRef } from "react";
import NavigationEvent, { NavigationEventInstance } from "./NavigationEvents";

const NavigationContext = createContext<NavigationInstance>({
    open: pending => {}
});

const NavigationProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const ref = useRef<NavigationEventInstance>(null);
    return (
        <NavigationContext.Provider
            value={{
                open: pending => ref.current?.flag(pending||'')
            }}
        >
            {children}
            <Suspense
                fallback={null}
            >
                <NavigationEvent ref={ref} />
            </Suspense>
        </NavigationContext.Provider>
    );
};

export interface NavigationInstance {
    open: (pending?: string) => void;
}

export { NavigationContext };

export default NavigationProvider;
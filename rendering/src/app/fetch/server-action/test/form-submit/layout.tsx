import { PropsWithChildren, Suspense } from "react";
import NotificationCom from "./components/NotificationCom";

export default function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <div>
            {children}
            <Suspense fallback={null}>
                <NotificationCom />
            </Suspense>
        </div>
    );
}
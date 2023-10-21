import { PropsWithChildren } from "react";

export default function GroupShopLayout({ children }: PropsWithChildren<{}>) {
    return (
        <div>
            <div>group layout by shop</div>
            {children}
        </div>
    );
}
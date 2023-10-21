import { PropsWithChildren } from "react";

export default function GroupMarketingLayout({ children }: PropsWithChildren<{}>) {
    return (
        <div>
            <div>group layout by marketing</div>
            {children}
        </div>
    );
}
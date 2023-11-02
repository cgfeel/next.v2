'use client'

import { usePathname } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";
import { FC, useEffect } from "react";
import { pageview } from "../lib/gtag";

const NavigationEvent: FC = () => {
    const pathname = usePathname();

    useReportWebVitals((metric) => {
        window.gtag('event', metric.name, {
            event_label: metric.id,
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            non_interaction: true,
        });
    });

    useEffect(() => {
        pageview(pathname);
    }, [pathname]);

    return null;
};

export default NavigationEvent;
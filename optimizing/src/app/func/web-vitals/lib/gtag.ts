type EventType = {
    action: string;
    category: string;
    label: string;
    value?: number;
};

type EtagInfoType = {
    event_category?: EventType['category'];
    event_label?: EventType['label'];
    non_interaction?: boolean;
    page_path?: string;
    value?: EventType['value'];
};

declare global {
    interface Window {
        gtag: (type: string, action: string, info: EtagInfoType) => void;
    }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID||'';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview: (url: string) => void = url => {
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event: (props: EventType) => void = ({ action, category, label, value }) => {
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value,
    });
};
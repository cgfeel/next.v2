'use client'

import { message, notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { useSearchParams } from "next/navigation";
import { FC, createContext, useCallback, useEffect, useMemo } from "react";
import useRedirect from "../useRedirect";

const Context = createContext({ name: 'Default' });

const NotificationCom: FC = () => {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = useCallback((placement: NotificationPlacement) => {
        api.info({
            message: `Joined Waitlist`,
            description: (
                <Context.Consumer>{({ name }) => `Added ${name} to the fake waitlist.`}</Context.Consumer>
            ),
            placement,
        });
    }, [api]);

    const searchParams = useSearchParams();
    const contextValue = useMemo(() => ({ name: searchParams.get('email')||'' }), [searchParams]);

    const redirect = useRedirect();
    useEffect(() => {
        const form = searchParams.has('form') && searchParams.get('form');
        const email = searchParams.get('email') && searchParams.get('email');

        if (form === 'success' && email) {
            openNotification('bottomRight');
            redirect(searchParams);
        }
    }, [searchParams, openNotification, redirect]);

    return (
        <Context.Provider 
            value={contextValue}
        >
            {contextHolder}
        </Context.Provider>
    );
};

export default NotificationCom;
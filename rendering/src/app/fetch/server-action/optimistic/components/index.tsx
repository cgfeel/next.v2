"use client";

import { FC, PropsWithChildren, useRef } from "react";
import List, { ListInstance, ListProps } from "./List";
import Form from "./Form";

const ListForm: FC<PropsWithChildren<ListProps>> = ({ children, data, remove, send }) => {
    const listRef = useRef<ListInstance>(null);
    return (
        <List data={data} ref={listRef} remove={remove} send={send}>
            <Form submit={msg => listRef.current?.submit(msg)}>{children}</Form>
        </List>
    );
};

export default ListForm;

'use server';

import { redirect } from "next/navigation";

export const submitAction = async () => {
    console.log(Date.now());
    redirect('/fetch/server-action/test/form-submit/antd?form=faild&email=me@email.com');
};
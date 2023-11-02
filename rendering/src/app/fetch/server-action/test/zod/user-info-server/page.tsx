import Form, { SchemaType } from "./Form";

export default async function Page() {
    async function sendHandle(data: SchemaType) {
        'use server';
        await fetch(`${process.env.HOME_URL}/api/user`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    return <Form action={sendHandle} />
}
'use server';

import Api from "@/src/utils/api";
import { revalidatePath } from "next/cache";
import { ZodError, z } from "zod";

const schemas = z.object({
    todo: z.string().min(5).max(12),
});

const actionSchemas = schemas.extend({
    id: z.coerce.number().min(1),
});

export async function createTodo(formData: FormData) {
    try {
        const data = schemas.parse({
            todo: formData.get('todo'),
        });

        await Api.post('https://ckbbmba5g6h95mu41o8g.baseapi.memfiredb.com/rest/v1/todolist', {
            data: {
                id: Date.now(),
                name: data.todo,
            },
            headers: {
                "apikey": process.env.ENV_DATABASE_APIKEY||'',
                "Authorization": `Bearer ${process.env.ENV_DATABASE_APIKEY||''}`,
                "Content-Type": "application/json",
                "Prefer": "return=minimal",
            },
        });

        revalidatePath('/fetch/server-action/test/zod/todolist');
        return { message: `Added todo ${data.todo}` };
    } catch (error: any) {
        if (error instanceof ZodError) {
            const { issues } = error;
            const first = issues[0];

            return { message: `Faild: ${first.message}` };
        }

        return { message: 'Insert fetch faild.' };
    }
}

export async function deleteTodo(formData: FormData) {
    try {
        const data = Object.fromEntries(formData);
        const delInfo = actionSchemas.parse(data);

        await Api.delete(`https://ckbbmba5g6h95mu41o8g.baseapi.memfiredb.com/rest/v1/todolist?id=eq.${delInfo.id}`, {
            headers: {
                "apikey": process.env.ENV_DATABASE_APIKEY||'',
                "Authorization": `Bearer ${process.env.ENV_DATABASE_APIKEY||''}`,
                "Content-Type": "application/json",
                "Prefer": "return=minimal",
            },
        });

        revalidatePath('/fetch/server-action/test/zod/todolist');
        return { message: `Delete todo ${delInfo.todo}` };
    } catch (error: any) {
        if (error instanceof ZodError) {
            const { issues } = error;
            const first = issues[0];

            return { message: `Faild: ${first.message}` };
        }
        return { message: 'Delete fetch faild.' };
    }
}
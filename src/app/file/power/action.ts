'use server'

import { cookies } from "next/headers"

export const setPower: (login?: boolean) => Promise<void> = async (login = true) => {
    login ? cookies().set('file-power', Date.now() + '') : cookies().delete('file-power');
}
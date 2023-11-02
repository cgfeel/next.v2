import { cookies } from "next/headers";

export function hasPower() {
    const power = cookies().get('file-power');
    return Boolean(power)&&!!power?.value;
}
import { NextResponse } from "next/server";
import { data } from "../route";

export async function GET(request: Request, { params }: {
    params: { id: `${number}` };
}) {
    const { id } = params;
    const point = parseInt(id)||1;

    const item = data.find(({ id }) => id === point);
    return NextResponse.json(item||data[0]);
}
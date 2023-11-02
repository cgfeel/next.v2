// import { userSchema } from "@/src/lib/schemas/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    return NextResponse.json({
    });
    /*const resData = await req.json();
    const response = userSchema.safeParse(resData);
    
    if (!response.success) {
        const { errors } = response.error;
        return NextResponse.json({
            error: {
                message: 'Invalid request',
                errors
            },
        }, {
            status: 400,
        });
    }

    return NextResponse.json({
        message: 'Success',
        data: response.data,
    });*/
}
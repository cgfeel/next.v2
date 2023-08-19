import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(Response: Request) {
    draftMode().disable();
    NextResponse.redirect('/blog/draft');
}
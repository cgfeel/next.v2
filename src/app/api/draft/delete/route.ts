import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(Response: Request) {
    draftMode().disable();
    redirect('/blog/draft');
}
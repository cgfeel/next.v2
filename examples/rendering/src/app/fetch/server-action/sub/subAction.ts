"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const submitAction = async () => {
  cookies().set('__test_sub', Date.now().toString());
  console.log("form:", Date.now(), '-subaction');
  revalidatePath('/optimizing/sub');
};

export const linkAction = async () => {
  console.log("link:", Date.now(), '-subaction');
};

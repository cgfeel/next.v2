"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect } from "react";
import { linkAction } from "./subAction";

const BtnAction: FC<{ action: () => Promise<void> }> = ({ action }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.toString() !== "") {
      router.replace(pathname);
    }
  }, [pathname, searchParams, router]);
  
  return (
    <div>
      <div>
        <button
          onClick={() => {
            linkAction();
          }}
        >
          test link
        </button>
      </div>
      <hr />
      <div>
        <form action={async () => {
            action();
            router.refresh();
        }}>
          <button type="submit">click to server action</button>
        </form>
      </div>
      <p>
        <Link href="/">back to home</Link>
      </p>
    </div>
  );
};

export default BtnAction;
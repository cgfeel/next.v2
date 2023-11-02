"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

const BtnAction: FC<{ action: () => Promise<void> }> = ({ action }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div>
      <div>
        <form action={async () => {
          await action();
          router.refresh();
        }}>
          <input 
            type="email" 
            name="email"
            defaultValue="" 
            style={{ color: '#000' }}
            required 
          />
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
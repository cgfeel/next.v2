import type { Metadata } from "next";
import { Inter } from "next/font/google";
import FixedButton from "../components/FixedButton";
import Providers from "../lib/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  metadataBase: new URL(`${process.env.HOME_URL}`),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          {children}
          <FixedButton />
        </Providers>
      </body>
    </html>
  );
}

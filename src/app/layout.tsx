import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";
import {LoginModalProvider} from "~/modal/LoginModal";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Diver",
  description: "",
};

export default function RootLayout(
    {
      children,
    }: Readonly<{
      children: ReactNode;
    }>) {
  return (
      <html lang="ja">
        <body className={inter.className}>
          <LoginModalProvider>
            {children}
          </LoginModalProvider>
        </body>
      </html>
  );
}

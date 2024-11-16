import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.scss";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import ContextWrapper from "@/context/context-wrapper";
import { Fragment } from "react";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "AynaPay",
  description: "AynaPay: A payment Gateway",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-muted font-sans antialiased",
          fontSans.variable
        )}
      >
        <ContextWrapper>
          <Fragment>
            {children}
            <Toaster />
          </Fragment>
        </ContextWrapper>
      </body>
    </html>
  );
}

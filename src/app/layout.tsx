import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "@/app/components/theme-provider"
import Header from "./components/Header";
import React from "react";
import { ConvexClientProvider } from "./components/ConvexClientProvider";

export const metadata: Metadata = {
  title: "bolt.new",
  description: "Create Fullstack apps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href="https://bolt.new/static/favicon.svg" type="image/svg+xml" />
      </head>
      <body >
      <ConvexClientProvider>

        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange >
              <Header/>
            {children}
          </ThemeProvider>
      </ConvexClientProvider>
      </body>
    </html>
  );
}

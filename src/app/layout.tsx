import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/app/components/theme-provider"
import React from "react";
import { ConvexClientProvider } from "./components/ConvexClientProvider";

export const metadata: Metadata = {
  title: "Sloth - Build with ease",
  description: "Create Fullstack apps with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href="/sloth.png" type="image/png" />
      </head>
      <body className="dot-grid">
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange 
          >
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
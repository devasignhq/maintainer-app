"use client";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "./components/ToastProvider";

const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <title>DevAsign (Project Maintainer)</title>
                <meta name="description" content="The Open Source Project Management Tool" />
            </head>
            <body className={`${geistMono.className} antialiased`}>
                <ToastProvider>
                    {children}
                </ToastProvider>
            </body>
        </html>
    );
}

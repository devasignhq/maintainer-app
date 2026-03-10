"use client";
import React from "react";
import { LogLevel, StatsigProvider } from "@statsig/react-bindings";
import useUserStore from "./state-management/useUserStore";

export default function Statsig({ children }: { children: React.ReactNode }) {
    const { currentUser } = useUserStore();
    const sdkKey = process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY;

    // The user object sent to Statsig
    const user = {
        // Only set userID if the user is authentically logged in
        ...(currentUser?.userId ? { userID: currentUser.userId } : {}),
        custom: {
            username: currentUser?.username,
            email: currentUser?.email || undefined,
            hasWallet: !!currentUser?.wallet,
            verified: currentUser?.verified
        }
    };

    // If no sdkKey, return children without StatsigProvider
    if (!sdkKey) {
        return <>{children}</>;
    }

    return (
        <StatsigProvider
            sdkKey={sdkKey}
            user={user}
            options={{ logLevel: process.env.NODE_ENV === "development" ? LogLevel.Debug : LogLevel.Error }}
        >
            {children}
        </StatsigProvider>
    );
}

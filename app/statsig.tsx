"use client";
import React from "react";
import { LogLevel, StatsigProvider } from "@statsig/react-bindings";
import useUserStore from "./state-management/useUserStore";

export default function Statsig({ children }: { children: React.ReactNode }) {
    const { currentUser } = useUserStore();

    // The user object sent to Statsig
    const user = {
        // Only set userID if the user is authentically logged in
        ...(currentUser?.userId ? { userID: currentUser.userId } : {}),
        email: currentUser?.username, // use username as email context
        custom: {
            username: currentUser?.username,
            hasWallet: !!currentUser?.wallet,
            verified: currentUser?.verified
        }
    };

    return (
        <StatsigProvider
            sdkKey={process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY!}
            user={user}
            options={{ logLevel: LogLevel.Debug }}
        >
            {children}
        </StatsigProvider>
    );
}

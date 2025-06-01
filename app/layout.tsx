"use client";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "./components/ToastProvider";
import { auth, githubProvider } from "@/lib/firebase";
import { 
    signInWithPopup, 
    GithubAuthProvider, 
    getAdditionalUserInfo,
    AdditionalUserInfo,
    UserCredential
} from "@firebase/auth";
import { useContext, useState, createContext } from "react";
import { toast } from "react-toastify";

const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
});

type GitHubTokenContextType = {
    githubToken: string;
    githubUser: Record<string, unknown>; 
    handleGitHubAuth: () => Promise<{
        result: UserCredential;
        additionalInfo: AdditionalUserInfo | null;
    } | undefined>;
    reAuthenticate: () => Promise<void>;
};

const GitHubTokenContext = createContext<GitHubTokenContextType | null>(null);

export const useGitHubContext = () => {
    const context = useContext(GitHubTokenContext);
    if (!context) {
        throw new Error('useGitHubContext must be used within GitHubTokenProvider');
    }
    return context;
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [githubToken, setGithubToken] = useState("");
    const [githubUser, setGithubUser] = useState<Record<string, unknown>>({});
    
    const handleGitHubAuth = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            const credential = GithubAuthProvider.credentialFromResult(result);
            const additionalInfo = getAdditionalUserInfo(result);
            
            if (credential?.accessToken) {
                setGithubToken(credential.accessToken);
                setGithubUser(additionalInfo?.profile || {});
            }

            return { result, additionalInfo };
        } catch (error) {
            toast.error("GitHub sign-in failed. Please try again.");
            console.error(error);
        }
    };

    const reAuthenticate = async () => {
        if (!githubToken) {
            await handleGitHubAuth();
        }
    };

    return (
        <html lang="en">
            <head>
                <title>DevAsign</title>
                <meta name="description" content="The Open Source Project Management Tool" />
            </head>
            <body className={`${geistMono.className} antialiased`}>
                <ToastProvider>
                    <GitHubTokenContext.Provider value={{
                        githubToken,
                        githubUser,
                        handleGitHubAuth,
                        reAuthenticate
                    }}>
                        {children}
                    </GitHubTokenContext.Provider>
                </ToastProvider>
            </body>
        </html>
    );
}

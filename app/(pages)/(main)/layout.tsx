/* eslint-disable @next/next/no-img-element */
"use client";
import { HiOutlineSelector } from "react-icons/hi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/app/helper";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const currentPath = usePathname();
    const checkPath = (path: string) => currentPath.includes(path);

    return (
        <main className="h-full w-full px-[6.75%] flex flex-col">
            <section className="pt-5 flex items-center justify-between">
                <img src="/davasign-logo.svg" alt="DevAsign" className="h-auto w-auto" />
                <div className="flex items-center gap-2.5 text-light-100">
                    <div className="flex items-center gap-[15px] text-headline-small">
                        <img src="/project-logo.svg" alt="PL" className="h-auto w-auto" />
                        <span>PostgreSQL</span>
                    </div>
                    <div className="px-2.5 py-[px] bg-dark-300 text-table-header">Free</div>
                    <button className="cursor-pointer">
                        <HiOutlineSelector className="text-2xl text-[#BCBCBC]" />
                    </button>
                </div>
            </section>
            {!currentPath.includes(ROUTES.ONBOARDING) && (
                <nav className="w-full flex items-center gap-[15px] border-b border-dark-200 text-title-large text-dark-200 mt-[15px]">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`px-[5px] py-[20px] 
                                ${checkPath(item.path) 
                                    ? "text-light-100 border-b border-light-100" 
                                    : "hover:text-[#F0C298]"}`
                            }
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            )}
              
            {children}
        </main>
    );
}

const navItems = [
    { name: "Overview", path: "/overview" },
    { name: "Tasks", path: "/tasks" },
    { name: "Wallet", path: "/wallet" },
    { name: "Contributors", path: "/contributors" },
    { name: "Settings", path: "/settings" },
];

/* eslint-disable @next/next/no-img-element */
"use client";
import { useViewPort } from "@/app/utils/hooks";

export default function AuthLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const viewPortWidth = useViewPort();

    return (
        <main className="h-full w-full flex">
            <section className={`h-full sm:w-[42%] w-full text-light-100 max-sm:flex max-sm:flex-col max-sm:justify-between 
                ${viewPortWidth <= 688 ? "auth-gradient" : ""}`}
            >
                <div className="sm:h-full sm:w-full sm:pl-[16%] max-sm:px-5 pt-5">
                    <img src="/davasign-logo.svg" alt="DevAsign" className="h-auto w-auto" />
                    {children}
                </div>
                <div className="sm:hidden pb-[80px]">
                    <div className="flex items-center gap-2.5 justify-center">
                        <img
                            src="/davasign-logo.svg"
                            alt="DevAsign"
                            className="h-auto lg:w-auto w-[100px]"
                        />
                        <img
                            src="/x.svg"
                            alt="X"
                            className="h-auto lg:w-auto w-[10px]"
                        />
                        <img
                            src="/scf-logo.svg"
                            alt="Stellar Community Fund"
                            className="h-auto lg:w-auto sm:w-[130px] w-[115px]"
                        />
                    </div>
                    <p className="sm:text-body-medium text-body-tiny text-light-100 text-center mt-[30px]">
                        Backed by Stellar Community Fund (SCF). <br />
                        We’re the infrastructure powering fair compensation <br />
                        for open-source contribution.
                    </p>
                </div>
            </section>
            <section className="max-sm:hidden h-full w-[58%] auth-gradient grid place-content-center">
                <div>
                    <div className="flex items-center gap-2.5 justify-center">
                        <img 
                            src="/davasign-logo.svg" 
                            alt="DevAsign" 
                            className="h-auto lg:w-auto w-[100px]"
                        />
                        <img
                            src="/x.svg"
                            alt="X"
                            className="h-auto lg:w-auto w-[10px]"
                        />
                        <img
                            src="/scf-logo.svg"
                            alt="Stellar Community Fund"
                            className="h-auto lg:w-auto w-[130px]"
                        />
                    </div>
                    <p className="text-body-medium text-light-100 text-center mt-[30px]">
                        Backed by Stellar Community Fund (SCF). <br />
                        We’re the infrastructure powering fair compensation <br className="md:hidden" />
                        for open-source contribution.
                    </p>
                </div>
            </section>
        </main>
    );
}

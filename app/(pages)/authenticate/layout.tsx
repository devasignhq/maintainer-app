/* eslint-disable @next/next/no-img-element */

export const dynamic = "force-dynamic";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="h-full w-full flex">
            <section className="h-full w-[42%] text-light-100">
                <div className="h-full w-full pl-[16%] pt-5">
                    <img src="/davasign-logo.svg" alt="DevAsign" className="h-auto w-auto" />
                    {children}
                </div>
            </section>
            <section className="h-full w-[58%] auth-gradient grid place-content-center">
                <div>
                    <div className="flex items-center gap-2.5 justify-center">
                        <img src="/davasign-logo.svg" alt="DevAsign" className="h-auto w-auto" />
                        <img src="/x.svg" alt="X" className="h-auto w-auto" />
                        <img src="/scf-logo.svg" alt="Stellar Community Fund" className="h-auto w-auto" />
                    </div>
                    <p className="text-body-medium text-light-100 text-center mt-[30px]">
                        Backed by Stellar Community Fund (SCF). <br />
                        We’re the infrastructure powering fair compensation for open-source contribution.
                    </p>
                </div>
            </section>
        </main>
    );
}
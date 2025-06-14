"use client";
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa6';
import ButtonPrimary from "@/app/components/ButtonPrimary";
import { FiArrowUpRight } from 'react-icons/fi';
import { HiPlus } from 'react-icons/hi';
import ImportTaskModal from '@/app/(pages)/(main)/tasks/modals/ImportTaskModal';
import { useToggle } from 'ahooks';
import FundWalletModal from '@/app/(pages)/(main)/wallet/modals/FundWalletModal';
import useUserStore from '@/app/state-management/useUserStore';
import { useStreamAccountBalance } from '@/app/services/horizon.service';
import useInstallationStore from '@/app/state-management/useInstallationStore';
import useTaskStore from '@/app/state-management/useTaskStore';
import { useState } from 'react';
import { InstallationAPI } from '@/app/services/installation.service';
import { toast } from "react-toastify";
import { useGitHubContext } from '@/app/layout';
import { moneyFormat } from '@/app/utils/helper';
import { useRouter } from "next/navigation";
import { ROUTES } from '@/app/utils/data';

const Onboarding = () => {
    const router = useRouter();
    const { githubToken, reAuthenticate } = useGitHubContext();
    const { currentUser } = useUserStore();
    const { activeInstallation, setActiveInstallation } = useInstallationStore();
    const { draftTasks } = useTaskStore();
    const { xlmBalance, usdcBalance } = useStreamAccountBalance(activeInstallation?.walletAddress, true);
    const [importingRepo, setImportingRepo] = useState(false);
    const [openImportTaskModal, { toggle: toggleImportTaskModal }] = useToggle(false);
    const [openFundWalletModal, { toggle: toggleFundWalletModal }] = useToggle(false);

    return (
        <>
        <div className="w-[850px] mt-[65px] mx-auto">
            <h1 className="text-display-large text-light-100">
                Welcome to DevAsign,
                <span className="text-display-medium text-light-200 font-extralight">
                    {` ${currentUser?.username} `}
                </span>👋
            </h1>
            <div className="flex gap-[30px] mt-10 mb-[30px]">
                {!activeInstallation && (
                    <div className="w-full p-5 border border-primary-200">
                        <h6 className="text-headline-small font-black text-light-200 pb-2.5">Connect Project Repository</h6>
                        <p className="text-body-medium text-dark-100 mb-[30px]">
                            Enter your project GitHub public repository URL to import your project tasks (issues).
                        </p>
                        <div className="w-full flex gap-2.5">
                            <div className="w-full relative">
                                <FaGithub className="text-xl text-light-100 absolute top-1/2 -translate-y-1/2 left-2.5" />
                                {/* <input
                                    type="text"
                                    placeholder="Project GitHub repository URL"
                                    className="w-full h-full p-2.5 pl-[42px] bg-dark-400 border border-dark-100 text-body-tiny text-light-100"
                                    value={repoUrl}
                                    onChange={(e) => setRepoUrl(e.target.value)}
                                /> */}
                            </div>
                            <ButtonPrimary
                                format="SOLID"
                                text={importingRepo ? "Connecting..." : "Connect"}
                                sideItem={<FiArrowUpRight />}
                                attributes={{ 
                                    onClick: () => {},
                                    disabled: importingRepo
                                }}
                                extendedClassName="bg-light-200 hover:bg-light-100"
                            />
                        </div>
                    </div>
                )}
                <div className="w-full p-5 border border-primary-200">
                    <h6 className="text-headline-small font-black text-light-100 pb-2.5">Fund Wallet</h6>
                    <p className="text-body-medium text-dark-100 mb-[30px]">
                        Top-up wallet to can add bounties and manage contributor payouts seamlessly.
                    </p>
                    <div className="flex items-center justify-between gap-2.5">
                        <div className="flex items-center gap-[15px]">
                            <p className="text-light-200">
                                <span className="text-headline-large">{moneyFormat(usdcBalance).split(".")[0]}</span>
                                <span className="text-headline-small font-normal">.{usdcBalance.split(".")[1] || "00"} USDC</span>
                            </p>
                            <div className="h-10 w-0.5 bg-primary-200" />
                            <p className="text-primary-400">
                                <span className="text-headline-large">{moneyFormat(xlmBalance).split(".")[0]}</span>
                                <span className="text-headline-small font-normal">.{xlmBalance.split(".")[1] || "00"} XLM</span>
                            </p>
                        </div>
                        <ButtonPrimary
                            format="SOLID"
                            text="Top Up"
                            sideItem={<HiPlus />}
                            attributes={{ onClick: toggleFundWalletModal }}
                        />
                    </div>
                </div>
            </div>
            {activeInstallation && (
                <div className="w-full draft-box relative py-[15px] px-5 my-[30px] bg-dark-400 flex items-center justify-between">
                    <p className="flex items-center gap-[5px] text-title-large text-light-100">
                        <span>Draft: Issues Selected</span>
                        <span className="px-[5px] text-body-medium font-bold text-dark-500 bg-primary-100">
                            {draftTasks.length}
                        </span>
                    </p>
                    <button 
                        className="flex items-center gap-[5px] text-primary-100 text-button-large font-extrabold hover:text-light-100"
                        onClick={toggleImportTaskModal}
                    >
                        <span>Continue</span>
                        <FiArrowUpRight className="text-2xl" />
                    </button>
                </div>
            )}
            <div className="w-full p-10 border border-primary-200 flex items-center justify-between gap-10 
                bg-[linear-gradient(130.86deg,_rgba(0,_26,_37,_0.5)_15.53%,_rgba(163,_82,_7,_0.5)_79.38%)]"
            >
                <div className="flex items-center gap-[5px]">
                    <Image 
                        src="/davasign-logo.svg" 
                        alt="DevAsign" 
                        width={50}
                        height={12.5}
                        className="h-[12.5px] w-auto" 
                    />
                    <Image 
                        src="/x.svg" 
                        alt="X" 
                        width={10}
                        height={10}
                        className="h-2.5 w-auto" 
                    />
                    <Image 
                        src="/scf-logo.svg" 
                        alt="Stellar Community Fund" 
                        width={128}
                        height={32}
                        className="h-[32px] w-auto" 
                    />
                </div>
                <p className="text-body-tiny text-light-100">
                    Backed by Stellar Community Fund (SCF). We’re the infrastructure 
                    owering fair <br /> compensation for open-source contribution.
                </p>
            </div>
        </div>
        
        {openImportTaskModal && (
            <ImportTaskModal 
                toggleModal={toggleImportTaskModal} 
                onSuccess={() => router.push(ROUTES.TASKS)} 
            />
        )}
        {openFundWalletModal && <FundWalletModal toggleModal={toggleFundWalletModal}/>}
        </>
    );
}
 
export default Onboarding;
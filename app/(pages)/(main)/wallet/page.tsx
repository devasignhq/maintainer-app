"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import { useState } from "react";
import { FiArrowDownRight } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import { LiaExchangeAltSolid } from "react-icons/lia";
import AllTable from "./tables/AllTable";
import BountyTable from "./tables/BountyTable";
import TopUpTable from "./tables/TopUpTable";
import WithdrawalTable from "./tables/WithdrawalTable";
import SwapTable from "./tables/SwapTable";
import { useInfiniteScroll, useToggle } from "ahooks";
import SwapAssetModal from "./modals/SwapAssetModal";
import WithdrawAssetModal from "./modals/WithdrawAssetModal";
import FundWalletModal from "./modals/FundWalletModal";
import { useStreamAccountBalance } from "@/app/services/horizon.service";
import useProjectStore from "@/app/state-management/useProjectStore";
import { moneyFormat } from "@/app/utils/helper";
import { WalletAPI } from "@/app/services/wallet.service";
import { Data } from "ahooks/lib/useInfiniteScroll/types";

const Wallet = () => {
    const { activeProject } = useProjectStore();
    const { xlmBalance, usdcBalance } = useStreamAccountBalance(activeProject?.walletAddress, true);
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [openWithdrawAssetModal, { toggle: toggleWithdrawAssetModal }] = useToggle(false);
    const [openFundWalletModal, { toggle: toggleFundWalletModal }] = useToggle(false);
    const [openSwapAssetModal, { toggle: toggleSwapAssetModal }] = useToggle(false);
    const [swapAssetFrom, setSwapAssetFrom] = useState<"XLM" | "USDC">("XLM");

    const handleOpenSwapAssetModal = (from: "XLM" | "USDC") => {
        setSwapAssetFrom(from);
        toggleSwapAssetModal();
    };
        
    const {
        data: projectTasks,
        loading: loadingTasks,
        loadingMore: loadingMoreTasks,
        noMore: noMoreTasks,
        loadMore: loadMoreTasks,
    } = useInfiniteScroll<Data>(
        async (currentData) => {
            const pageToLoad = currentData ? currentData.pagination.page + 1 : 1;

            const category = activeTab.enum === "ALL" 
                ? "" 
                : activeTab.enum === "SWAP"
                    ? "SWAP_XLM,SWAP_USDC" 
                    : activeTab.enum;
            
            const response = await WalletAPI.getTransactions(
                activeProject!.id,
                { 
                    page: pageToLoad, 
                    limit: 20, 
                    sort: "desc",
                    ...(category && { categories: category })
                }
            );

            return { 
                list: response.transactions,
                hasMore: response.hasMore,
            };
        }, {
            isNoMore: (data) => !data?.hasMore,
            reloadDeps: [activeTab]
        }
    );

    return (
        <>
        <div className="w-[80%] max-h-[calc(100dvh-123px)] mx-auto flex flex-col pb-5">
            <section className="w-full space-y-5 mt-[30px] mb-[50px]">
                <div className="flex items-start justify-between">
                    <h1 className="text-display-small text-light-100">Project Wallet</h1>
                    <div className="flex gap-2.5">
                        <ButtonPrimary
                            format="SOLID"
                            text="Withdraw"
                            sideItem={<FiArrowDownRight />}
                            attributes={{ onClick: toggleWithdrawAssetModal }}
                            extendedClassName="bg-primary-400"
                        />
                        <ButtonPrimary
                            format="SOLID"
                            text="Top Up"
                            sideItem={<HiPlus />}
                            attributes={{ onClick: toggleFundWalletModal }}
                        />
                    </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-5">
                    <div className="w-full p-5 border border-primary-200 flex items-start justify-between">
                        <div className="space-y-2.5">
                            <p className="text-body-small text-dark-100">XLM Balance</p>
                            <p className="text-primary-400">
                                <span className="text-display-large">{moneyFormat(xlmBalance).split(".")[0]}</span>
                                <span className="text-body-medium">.{xlmBalance.split(".")[1] || "00"} XLM</span>
                            </p>
                        </div>
                        <button 
                            className="flex items-center gap-[5px] text-primary-100 text-button-large font-extrabold hover:text-light-100"
                            onClick={() => handleOpenSwapAssetModal("XLM")}
                        >
                            <span>Swap to USDC</span>
                            <LiaExchangeAltSolid className="text-[22px]" />
                        </button>
                    </div>
                    <div className="w-full p-5 border border-dark-200 flex items-start justify-between">
                        <div className="space-y-2.5">
                            <p className="text-body-small text-dark-100">USDC Balance</p>
                            <p className="text-light-100">
                                <span className="text-display-large">{moneyFormat(usdcBalance).split(".")[0]}</span>
                                <span className="text-body-medium">.{usdcBalance.split(".")[1] || "00"} USDC</span>
                            </p>
                        </div>
                        <button 
                            className="flex items-center gap-[5px] text-primary-100 text-button-large font-extrabold hover:text-light-100"
                            onClick={() => handleOpenSwapAssetModal("USDC")}
                        >
                            <span>Swap to XLM</span>
                            <LiaExchangeAltSolid className="text-[22px]" />
                        </button>
                    </div>
                </div>
            </section>
            <section>
                <div className="flex gap-2.5 mb-[30px]">
                    {tabs.map((tab) => (
                        <button
                            key={tab.enum}
                            className={`p-2 px-2.5 text-body-small border 
                                ${activeTab.enum === tab.enum 
                                    ? "border-transparent bg-light-100 text-dark-500 font-bold" 
                                    : "border-dark-100 text-dark-100 hover:text-light-100"}`
                            }
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.title}
                        </button>
                    ))}
                </div>
            </section>
            {activeTab.enum === "ALL" && (
                <AllTable 
                    data={projectTasks?.list || []}
                    loading={loadingTasks}
                    loadingMore={loadingMoreTasks}
                    noMore={noMoreTasks}
                    loadMore={loadMoreTasks}
                />
            )}
            {activeTab.enum === "BOUNTY" && (
                <BountyTable 
                    data={projectTasks?.list || []}
                    loading={loadingTasks}
                    loadingMore={loadingMoreTasks}
                    noMore={noMoreTasks}
                    loadMore={loadMoreTasks}
                />
            )}
            {activeTab.enum === "TOP_UP" && (
                <TopUpTable 
                    data={projectTasks?.list || []}
                    loading={loadingTasks}
                    loadingMore={loadingMoreTasks}
                    noMore={noMoreTasks}
                    loadMore={loadMoreTasks}
                />
            )}
            {activeTab.enum === "SWAP" && (
                <SwapTable 
                    data={projectTasks?.list || []}
                    loading={loadingTasks}
                    loadingMore={loadingMoreTasks}
                    noMore={noMoreTasks}
                    loadMore={loadMoreTasks}
                />
            )}
            {activeTab.enum === "WITHDRAWAL" && (
                <WithdrawalTable 
                    data={projectTasks?.list || []}
                    loading={loadingTasks}
                    loadingMore={loadingMoreTasks}
                    noMore={noMoreTasks}
                    loadMore={loadMoreTasks}
                />
            )}
        </div>
        
        {openWithdrawAssetModal && <WithdrawAssetModal toggleModal={toggleWithdrawAssetModal} />}
        {openFundWalletModal && <FundWalletModal toggleModal={toggleFundWalletModal} />}
        {openSwapAssetModal && (
            <SwapAssetModal 
                toggleModal={toggleSwapAssetModal} 
                from={swapAssetFrom}
            />
        )}
        </>
    )
}
 
export default Wallet;

const tabs = [
    { title: "All", enum: "ALL" },
    { title: "Bounty", enum: "BOUNTY" },
    { title: "Top Up", enum: "TOP_UP" },
    { title: "Swap", enum: "SWAP" },
    { title: "Withdrawal", enum: "WITHDRAWAL" },
]
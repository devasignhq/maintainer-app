"use client";
import PopupModalLayout from "../../../../components/PopupModalLayout";
import { QRCodeCanvas } from "qrcode.react";
import CopyButton from "../../../../components/CopyButton";
import useTaskStore from "@/app/state-management/useTaskStore";
import useProjectStore from "@/app/state-management/useProjectStore";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/app/utils/data";
import { useEffect, useState } from "react";
import { moneyFormat } from "@/app/utils/helper";
import { useXLMUSDCFromStellarDEX } from "@/app/services/horizon.service";

type FundWalletModalProps = {
    toggleModal: () => void;
    userBalanceSum?: number;
};

const FundWalletModal = ({ toggleModal, userBalanceSum }: FundWalletModalProps) => {
    const currentPath = usePathname();
    const { activeProject } = useProjectStore();
    const { draftTasks } = useTaskStore();
    const [totalBounties, setTotalBounties] = useState("");
    const [amountToSend, setAmountToSend] = useState("");
    const { 
        xlmPrice, 
        isLoading: priceLoading, 
        error: priceError 
    } = useXLMUSDCFromStellarDEX(5000);

    useEffect(() => {
        if (currentPath !== ROUTES.ONBOARDING || draftTasks.length < 1) return;

        const totalBountiesValue = draftTasks.reduce((acc, task) => acc + (task.bounty || 0), 0);
        setTotalBounties(moneyFormat(totalBountiesValue));

        // Calculate XLM to send using the latest DEX price
        if (xlmPrice && Number(xlmPrice) > 0) {
            const xlmToSend = (totalBountiesValue / Number(xlmPrice)).toFixed(2);
            setAmountToSend(xlmToSend);
        } else {
            setAmountToSend("");
        }
    }, [draftTasks, currentPath, xlmPrice]);
    
    return (
        <PopupModalLayout title="Fund Wallet" toggleModal={toggleModal}>
            <p className="text-body-medium text-dark-100 mt-2.5">
                Kindly deposit only XLM to the wallet below as any other token sent will be lost FOREVER.
            </p>
            {(draftTasks.length > 0 && currentPath === ROUTES.ONBOARDING && userBalanceSum && userBalanceSum < 1) ? (
                <section className="w-full flex gap-5 mt-5">
                    <div className="w-full py-2.5 px-[15px] border border-dark-200">
                        <p className="text-body-tiny text-light-100 mb-2.5">Total Bounties</p>
                        <p className="text-light-200">
                            <span className="text-display-small font-normal">{totalBounties.split(".")[0]}</span>
                            <span className="text-body-medium">.{totalBounties.split(".")[1] || "00"}</span>
                            <span className="text-display-small font-normal">{" "}USDC</span>
                        </p>
                    </div>
                    <div className="w-full py-2.5 px-[15px] border border-dark-200">
                        <p className="text-body-tiny text-light-100 mb-2.5">Amount to Send</p>
                        {(priceLoading && !xlmPrice) ? (
                            <p className="flex items-end gap-0.5">
                                <span className="h-6 w-12 rounded bg-dark-300 animate-pulse" />
                                <span className="text-display-small font-normal">{" "}XLM</span>
                            </p>
                        ) : priceError ? (
                            <p className="text-primary-400">-- XLM</p>
                        ) : (
                            <p className="text-primary-400">
                                <span className="text-display-small font-normal">{amountToSend.split(".")[0]}</span>
                                <span className="text-body-medium">.{amountToSend.split(".")[1] || "00"}</span>
                                <span className="text-display-small font-normal">{" "}XLM</span>
                            </p>
                        )}
                    </div>
                </section>
            ): null}
            <section className="w-full flex items-center gap-5 mt-5">
                <div className="py-2.5">
                    <QRCodeCanvas 
                        value={activeProject!.walletAddress} 
                        width={116}
                        height={112}
                        bgColor="#FEF3C7"
                    />
                </div>
                <div className="w-full space-y-2.5">
                    <div className="w-full p-2.5 wallet-info relative bg-dark-400 flex items-center justify-between">
                        <p className="text-body-small">
                            <span className="font-bold text-light-200">Network:</span>
                            <span className="text-light-100">{" "}Stellar Blockchain</span>
                        </p>
                    </div>
                    <div className="w-full p-2.5 wallet-info relative bg-dark-400 flex items-center justify-between">
                        <p className="text-body-small">
                            <span className="font-bold text-light-200">Address:</span>
                            <span className="text-light-100 truncate">{" "}{activeProject!.walletAddress}</span>
                        </p>
                        <CopyButton text={activeProject!.walletAddress} />
                    </div>
                </div>
            </section>
            <section className="w-full my-5 space-y-[5px]">
                <div className="flex items-center justify-between">
                    <p className="text-body-tiny font-bold text-primary-400">Minimum Deposit:</p>
                    <p className="text-body-tiny text-light-200">1 XLM</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-body-tiny font-bold text-primary-400">Arrival Time:</p>
                    <p className="text-body-tiny text-light-200">10 seconds</p>
                </div>
                {/* <div className="flex items-center justify-between">
                    <p className="text-body-tiny font-bold text-primary-400">Contract Address:</p>
                    <div className="flex items-center gap-[5px]">
                        <p className="max-w-[145px] text-body-tiny text-light-200 truncate">CBJE2GX5BTM4VWE7R2Q7AOCLMMYFPK722QTHWCRFUPSFPC5XGNMHOR6N</p>
                        <CopyButton 
                            text="GDMLXK2WH3G456UUXVZPV5Y2KIHN2ZXXIJVKT7ZWPKGVFDQKFFRQL7HK" 
                            extendedClassName="text-base"
                        />
                    </div>
                </div> */}
            </section>
        </PopupModalLayout>
    );
}
 
export default FundWalletModal;
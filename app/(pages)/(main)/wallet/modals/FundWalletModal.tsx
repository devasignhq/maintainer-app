"use client";
import { FiArrowUpRight } from "react-icons/fi";
import ButtonPrimary from "../../../../components/ButtonPrimary";
import PopupModalLayout from "../../../../components/PopupModalLayout";
import { QRCodeCanvas } from "qrcode.react";
import CopyButton from "../../../../components/CopyButton";

type FundWalletModalProps = {
    toggleModal: () => void;
};

const FundWalletModal = ({ toggleModal }: FundWalletModalProps) => {
    return (
        <PopupModalLayout title="Fund Wallet" toggleModal={toggleModal}>
            <p className="text-body-medium text-dark-100 mt-2.5">
                Kindly deposit only XLM to the wallet below as any other token sent will be lost FOREVER.
            </p>
            <section className="w-full flex gap-5 my-5">
                <div className="w-full py-2.5 px-[15px] border border-dark-200">
                    <p className="text-body-tiny text-light-100 mb-2.5">Total Bounties</p>
                    <p className="text-light-200">
                        <span className="text-display-small font-normal">$4,510</span>
                        <span className="text-body-medium">.00</span>
                    </p>
                </div>
                <div className="w-full py-2.5 px-[15px] border border-dark-200">
                    <p className="text-body-tiny text-light-100 mb-2.5">Amount to Send</p>
                    <p className="text-primary-400">
                        <span className="text-display-small font-normal">18,620</span>
                        <span className="text-body-medium">.97</span>
                        <span className="text-display-small font-normal">{" "}XLM</span>
                    </p>
                </div>
            </section>
            <section className="w-full flex items-center gap-5">
                <div className="py-2.5">
                    <QRCodeCanvas 
                        value="GDMLXK2WH3G456UUXVZPV5Y2KIHN2ZXXIJVKT7ZWPKGVFDQKFFRQL7HK" 
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
                            <span className="text-light-100 truncate">{" "}GDMLXK2WH3G456UUXVZPV5Y2KIHN2ZXXIJVKT7ZWPKGVFDQKFFRQL7HK</span>
                        </p>
                        <CopyButton text="GDMLXK2WH3G456UUXVZPV5Y2KIHN2ZXXIJVKT7ZWPKGVFDQKFFRQL7HK" />
                    </div>
                </div>
            </section>
            <section className="w-full my-5 space-y-[5px]">
                <div className="flex items-center justify-between">
                    <p className="text-body-tiny font-bold text-primary-400">Deposit Confirmation:</p>
                    <p className="text-body-tiny text-light-200">100 Block(s)</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-body-tiny font-bold text-primary-400">Contract Address:</p>
                    <div className="flex items-center gap-[5px]">
                        <p className="max-w-[145px] text-body-tiny text-light-200 truncate">CBJE2GX5BTM4VWE7R2Q7AOCLMMYFPK722QTHWCRFUPSFPC5XGNMHOR6N</p>
                        <CopyButton text="GDMLXK2WH3G456UUXVZPV5Y2KIHN2ZXXIJVKT7ZWPKGVFDQKFFRQL7HK" />
                    </div>
                </div>
            </section>
            <section className="flex gap-2.5">
                <ButtonPrimary
                    format="OUTLINE"
                    text="Go Back"
                    attributes={{
                        onClick: () => {},
                    }}
                />
                <ButtonPrimary
                    format="SOLID"
                    text="I've made the transfer"
                    sideItem={<FiArrowUpRight />}
                    attributes={{
                        onClick: () => {},
                    }}
                />
            </section>
        </PopupModalLayout>
    );
}
 
export default FundWalletModal;
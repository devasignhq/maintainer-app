"use client";
import ButtonPrimary from "../../../../components/ButtonPrimary";
import PopupModalLayout from "../../../../components/PopupModalLayout";
import { SiStellar } from "react-icons/si";
import { LiaExchangeAltSolid } from "react-icons/lia";
import Image from 'next/image';

type SwapAssetModalProps = {
    from: "XLM" | "USDC";
    toggleModal: () => void;
};

const SwapAssetModal = ({ from, toggleModal }: SwapAssetModalProps) => {
    return (
        <PopupModalLayout title="Swap Asset" toggleModal={toggleModal}>
            <p className="mt-2.5 text-body-medium text-dark-100">
                Swap tokens across the same project wallet. USDC is used to fund 
                task bounties, while XLM is for top-up and withdrawal.
            </p>
            <div className={`w-full flex items-center gap-5 my-[30px] ${from === "USDC" ? "flex-row-reverse" : ""}`}>
                <div className="grow">
                    <label htmlFor="" className="text-body-tiny font-bold text-light-100">
                        Swap {from === "USDC" ? "To" : "From"}:
                    </label>
                    <div className="w-full p-2.5 mt-[5px] bg-dark-400 border border-dark-200 text-body-medium text-light-100 font-bold flex items-center">
                        <SiStellar className="text-2xl text-dark-100 mr-3" />
                        <span>XLM</span>
                        <input 
                            type="text" 
                            placeholder="0.00"
                            name=""
                            className="h-5 w-full ml-2.5"
                        />
                    </div>
                </div>
                <LiaExchangeAltSolid className="text-2xl text-primary-400 mt-[25px]" />
                <div className="grow">
                    <label htmlFor="" className="text-body-tiny font-bold text-light-100">
                        Swap {from === "USDC" ? "From" : "To"}:
                    </label>
                    <div className="w-full p-2.5 mt-[5px] bg-dark-400 border border-dark-200 text-body-medium text-light-100 font-bold flex items-center">
                        <Image 
                            src="/usdc.svg" 
                            alt="$" 
                            width={31.9992}
                            height={31.9992}
                            className="mr-3" 
                        />
                        <span>USDC</span>
                        <input 
                            type="text" 
                            placeholder="0.00"
                            name=""
                            className="h-5 w-full ml-2.5"
                        />
                    </div>
                </div>
            </div>
            <ButtonPrimary
                format="SOLID"
                text="Swap Asset"
                sideItem={<LiaExchangeAltSolid />}
                attributes={{
                    onClick: () => {},
                }}
                extendedClassName="w-fit"
            />
        </PopupModalLayout>
    );
}
 
export default SwapAssetModal;
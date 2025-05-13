"use client";
import { FiArrowDownRight } from "react-icons/fi";
import ButtonPrimary from "../../../../components/ButtonPrimary";
import PopupModalLayout from "../../../../components/PopupModalLayout";
import { SiStellar } from "react-icons/si";
import { LiaExchangeAltSolid } from "react-icons/lia";

type WithdrawAssetModalProps = {
    toggleModal: () => void;
};

const WithdrawAssetModal = ({ toggleModal }: WithdrawAssetModalProps) => {
    return (
        <PopupModalLayout title="Withdraw Asset" toggleModal={toggleModal}>
            <section className="my-[30px] space-y-[5px]">
                <p className="text-body-tiny font-bold text-light-100">XLM Balance</p>
                <p className="text-primary-400">
                    <span className="text-display-large">5,538</span>
                    <span className="text-body-medium">.99 XLM</span>
                </p>
            </section>
            <section className="w-full space-y-5">
                <div className="w-full space-y-[5px]">
                    <label htmlFor="" className="text-body-tiny font-bold text-light-100">Amount to Withdraw</label>
                    <div className="w-full p-2.5 mt-[5px] bg-dark-400 border border-dark-200 text-body-medium text-light-100 font-bold flex items-center">
                        <SiStellar className="text-2xl text-dark-100 mr-3" />
                        <span>XLM</span>
                        <input 
                            type="text" 
                            placeholder="0.00"
                            name=""
                            className="h-5 w-full ml-2.5"
                        />
                        <LiaExchangeAltSolid className="text-2xl text-dark-100 mx-3" />
                        <span className="text-primary-400">$0.00</span>
                    </div>
                </div>
                <div className="w-full space-y-[5px]">
                    <label htmlFor="" className="text-body-tiny font-bold text-light-100">Stellar Wallet Address</label>
                    <input 
                        type="text" 
                        placeholder="Enter wallet address"
                        name=""
                        className="w-full p-2.5 pl-[15px] mt-[5px] bg-dark-400 border border-dark-200 text-body-medium text-light-100"
                    />
                    <p className="text-body-tiny font-bold text-primary-100">
                        Only withdraw to a valid stellar address. Failure to do so may result in loss of funds FOREVER.
                    </p>
                </div>
            </section>
            <section className="w-full my-[30px] space-y-[5px]">
                <div className="flex items-center justify-between text-body-tiny leading-5">
                    <p className="font-medium text-primary-400">Blockchain Network:</p>
                    <p className="text-light-200">Stellar</p>
                </div>
                <div className="flex items-center justify-between text-body-tiny leading-5">
                    <p className="font-medium text-primary-400">Asset:</p>
                    <p className="text-light-200">XLM</p>
                </div>
                <div className="flex items-center justify-between text-body-tiny leading-5">
                    <p className="font-medium text-primary-400">Minimum Withdrawal:</p>
                    <p className="text-light-200">10 XLM</p>
                </div>
                <div className="flex items-center justify-between text-body-tiny leading-5">
                    <p className="font-medium text-primary-400">Deposit Confirmation:</p>
                    <p className="text-light-200">100 Block(s)</p>
                </div>
            </section>
            <ButtonPrimary
                format="SOLID"
                text="Withdraw"
                sideItem={<FiArrowDownRight />}
                attributes={{
                    onClick: () => {},
                }}
                extendedClassName="w-fit"
            />
        </PopupModalLayout>
    );
}
 
export default WithdrawAssetModal;
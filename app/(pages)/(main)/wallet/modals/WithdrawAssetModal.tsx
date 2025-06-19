"use client";
import { FiArrowDownRight } from "react-icons/fi";
import ButtonPrimary from "../../../../components/ButtonPrimary";
import PopupModalLayout from "../../../../components/PopupModalLayout";
import { SiStellar } from "react-icons/si";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { useXLMUSDCFromStellarDEX } from "@/app/services/horizon.service";
import { moneyFormat } from "@/app/utils/helper";
import { object, string } from 'yup';
import useInstallationStore from "@/app/state-management/useInstallationStore";
import { useFormik } from "formik";
import MoneyInput from "@/app/components/Input/MoneyInput";
import { useEffect, useState } from "react";
import { WalletAPI } from "@/app/services/wallet.service";
import { toast } from "react-toastify";
import { ErrorResponse } from "@/app/models/_global";

const withdrawAssetSchema = object({
    amount: string().required("Required"),
    walletAddress: string().required("Required"),
});

type WithdrawAssetModalProps = {
    xlmBalance: string;
    toggleModal: () => void;
    reloadTransactions: () => void;
};

const WithdrawAssetModal = ({ xlmBalance, toggleModal, reloadTransactions }: WithdrawAssetModalProps) => {
    const { activeInstallation } = useInstallationStore();
    const [amountInUsdc, setAmountInUsdc] = useState("");
    const { xlmPriceInUsdc, isLoading: priceLoading } = useXLMUSDCFromStellarDEX(5000);
            
    const formik = useFormik({
        initialValues: {
            amount: "",
            walletAddress: "",
        },
        validationSchema: withdrawAssetSchema,
        onSubmit: async (values) => {
            const withdrawAmount = parseFloat(values.amount.replace(/,/g, ""));
            const balance = parseFloat(xlmBalance);

            if (withdrawAmount > balance) {
                toast.error("Insufficient XLM balance for this withdrawal.");
                return;
            }

            try {
                await WalletAPI.withdrawAsset({
                    ...values,
                    installationId: activeInstallation!.id,
                    assetType: "XLM"
                });

                toast.success("Asset withdrawn successfully.");
                reloadTransactions();
                toggleModal();
            } catch (err) {
                const error = err as unknown as ErrorResponse;
                if (error.error.message) {
                    toast.error(error.error.message);
                    return
                }
                toast.error("An error occured while withdrawing asset. Please try again.");
            }
        },
    });

    useEffect(() => {
        if (!xlmPriceInUsdc || !formik.values.amount) return;

        const formattedAmount = formik.values.amount.replace(/,/g, '');
        setAmountInUsdc(moneyFormat(parseFloat(formattedAmount) * parseFloat(xlmPriceInUsdc)));
    }, [formik.values.amount, xlmPriceInUsdc]);
    
    return (
        <PopupModalLayout title="Withdraw Asset" toggleModal={toggleModal}>
            <section className="my-[30px] space-y-[5px]">
                <p className="text-body-tiny font-bold text-light-100">XLM Balance</p>
                <p className="text-primary-400">
                    <span className="text-display-large">{moneyFormat(xlmBalance).split(".")[0]}</span>
                    <span className="text-body-medium">.{xlmBalance.split(".")[1] || "00"} XLM</span>
                </p>
            </section>
            <form className="w-full" onSubmit={formik.handleSubmit}>
                <section className="w-full space-y-5">
                    <div className="w-full space-y-[5px]">
                        <label htmlFor="" className="text-body-tiny font-bold text-light-100">Amount to Withdraw</label>
                        <div className={`w-full p-2.5 mt-[5px] bg-dark-400 border border-dark-200 text-body-medium text-light-100 font-bold 
                            flex items-center ${formik.submitCount > 0 && formik.errors.amount && "border-indicator-500"}`
                        }>
                            <SiStellar className="text-2xl text-dark-100 mr-3" />
                            <span>XLM</span>
                            <MoneyInput 
                                attributes={{
                                    id: "amount",
                                    name: "amount",
                                    placeholder: "0.00",
                                    className: "h-5 w-full ml-2.5",
                                    value: formik.values.amount,
                                    onBlur: formik.handleBlur,
                                    disabled: formik.isSubmitting,
                                }}
                                setValue={(value) => formik.setFieldValue("amount", value)}
                            />
                            <LiaExchangeAltSolid className="text-2xl text-dark-100 mx-3" />
                            <span className="text-primary-400 whitespace-nowrap">
                                ${(priceLoading || !formik.values.amount) ? "--" : amountInUsdc}
                            </span>
                        </div>
                    </div>
                    <div className="w-full space-y-[5px]">
                        <label htmlFor="" className="text-body-tiny font-bold text-light-100">Stellar Wallet Address</label>
                        <input 
                            type="text" 
                            id="walletAddress"
                            name="walletAddress"
                            placeholder="Enter wallet address"
                            className={`w-full p-2.5 pl-[15px] mt-[5px] bg-dark-400 border border-dark-200 text-body-medium text-light-100 
                                ${formik.submitCount > 0 && formik.errors.walletAddress && "border-indicator-500"}`
                            }
                            value={formik.values.walletAddress}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled={formik.isSubmitting}
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
                        <p className="font-medium text-primary-400">Arrival Time:</p>
                        <p className="text-light-200">10 seconds</p>
                    </div>
                </section>
                <ButtonPrimary
                    format="SOLID"
                    text="Withdraw"
                    sideItem={<FiArrowDownRight />}
                    attributes={{ 
                        type: "submit",
                        disabled: formik.isSubmitting,
                    }}
                    extendedClassName="w-fit"
                />
            </form>
        </PopupModalLayout>
    );
}
 
export default WithdrawAssetModal;
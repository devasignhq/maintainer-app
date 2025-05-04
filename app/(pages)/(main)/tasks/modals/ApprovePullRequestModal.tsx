"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import PopupModalLayout from "@/app/components/PopupModalLayout";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

type ApprovePullRequestModalProps = {
    toggleModal: () => void;
};

const ApprovePullRequestModal = ({ toggleModal }: ApprovePullRequestModalProps) => {
    
    return (
        <PopupModalLayout title="Approve Pull Request" toggleModal={toggleModal}>
            <div className="space-y-[5px] text-body-tiny mt-5">
                <div className="w-full flex items-center justify-between gap-5">
                    <p className="text-primary-400">Pull Request:</p>
                    <div className="flex items-center gap-1">
                        <span className="text-light-100 underline truncate">
                            https://github.com/browser-use/browser-use/pull/1053
                        </span>
                        <Link href={""}>
                            <FiArrowUpRight className="text-2xl text-primary-100 hover:text-light-100" />
                        </Link>
                    </div>
                </div>
                <div className="w-full flex items-center justify-between gap-5">
                    <p className="text-primary-400">Contributor:</p>
                    <div className="flex items-center gap-1">
                        <span className="text-light-100 underline truncate">@lenny_malcolm</span>
                        <Link href={""}>
                            <FiArrowUpRight className="text-2xl text-primary-100 hover:text-light-100" />
                        </Link>
                    </div>
                </div>
                <div className="w-full flex items-center justify-between gap-5">
                    <p className="text-primary-400">Time:</p>
                    <p className="text-light-100">30 mins ago</p>
                </div>
            </div>
            <p className="my-5 text-body-medium text-dark-100">
                Once you click “<span className="font-bold">Pay Contributor</span>” or merge the code 
                successfully in GitHub, the bounty will be paid out to the contributor automatically.
            </p>
            <div className="flex gap-2.5">
                <ButtonPrimary
                    format="OUTLINE"
                    text="Go Back"
                    attributes={{
                        onClick: () => {},
                    }}
                />
                <ButtonPrimary
                    format="SOLID"
                    text="Pay Contributor"
                    sideItem={<FiArrowUpRight />}
                    attributes={{
                        onClick: () => {},
                    }}
                />
            </div>
        </PopupModalLayout>
    );
}
 
export default ApprovePullRequestModal;
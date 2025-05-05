"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import PopupModalLayout from "@/app/components/PopupModalLayout";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { toast } from 'react-toastify';

type ApproveTaskDelegationProps = {
    toggleModal: () => void;
};

const ApproveTaskDelegation = ({ toggleModal }: ApproveTaskDelegationProps) => {
    
    return (
        <PopupModalLayout title="Approve Task Delegation" toggleModal={toggleModal}>
            <div className="space-y-[5px] text-body-tiny mt-5">
                <div className="w-full flex items-center justify-between gap-10">
                    <p className="text-primary-400">Developer:</p>
                    <div className="flex items-center gap-1">
                        <span className="text-light-100 underline truncate">
                            https://github.com/browser-use/browser-use/issue/1053
                        </span>
                        <Link href={""}>
                            <FiArrowUpRight className="text-2xl text-primary-100 hover:text-light-100" />
                        </Link>
                    </div>
                </div>
                <div className="w-full flex items-center justify-between gap-10">
                    <p className="text-primary-400">GitHub Issue:</p>
                    <div className="flex items-center gap-1">
                        <span className="text-light-100 underline truncate">@lenny_malcolm</span>
                        <Link href={""}>
                            <FiArrowUpRight className="text-2xl text-primary-100 hover:text-light-100" />
                        </Link>
                    </div>
                </div>
                <div className="w-full flex items-center justify-between gap-10">
                    <p className="text-primary-400">Time:</p>
                    <p className="text-light-100">30 mins ago</p>
                </div>
            </div>
            <p className="my-5 text-body-medium text-dark-100">
                Once you click “<span className="font-bold">Yes, Delegate Task,</span>” the task/issue will be 
                delegated to this developer and you can’t assign it to another developer till the timeline elapses.
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
                    text="Yes, Delegate Task"
                    sideItem={<FiArrowUpRight />}
                    attributes={{
                        onClick: () => {
                            toast("Wow so easy!");
                            toast.success("Success!");
                            toast.error("Error!");
                        },
                    }}
                />
            </div>
        </PopupModalLayout>
    );
}
 
export default ApproveTaskDelegation;
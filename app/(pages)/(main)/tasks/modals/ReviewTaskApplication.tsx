"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import PopupModalLayout from "@/app/components/PopupModalLayout";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

type ReviewTaskApplicationProps = {
    toggleModal: () => void;
};

const ReviewTaskApplication = ({ toggleModal }: ReviewTaskApplicationProps) => {
    
    return (
        <PopupModalLayout 
            title="Review Task Application" 
            // extendedModalClassName="w-[900px]"
            toggleModal={toggleModal}
        >
            <p className="mt-2.5 text-body-medium text-dark-100">
                Kindly review this task application. By accepting this developer, you’re delegating this 
                GitHub issue to them and can’t assign it to another developer till the timeline elapses.
            </p>
            <div className="w-full flex gap-2.5 text-light-100 mt-5 whitespace-nowrap">
                <div className="w-[34%] p-[15px] border border-dark-200 space-y-2.5">
                    <p className="text-body-micro">Developer</p>
                    <p className="text-headline-medium font-normal flex items-center gap-1 text-light-200">
                        <span className="truncate">@lenny_malcolm</span>
                        <Link href={""}>
                            <FiArrowUpRight className="text-2xl text-primary-100 hover:text-light-100" />
                        </Link>
                    </p>
                </div>
                <div className="w-[26%] p-[15px] border border-dark-200 space-y-2.5">
                    <p className="text-body-micro">Platform Earnings</p>
                    <p className="text-headline-medium font-normal truncate">4,786 USDC</p>
                </div>
                <div className="w-[18%] p-[15px] border border-dark-200 space-y-2.5">
                    <p className="text-body-micro">Tasks Done</p>
                    <p className="text-headline-medium font-normal">24</p>
                </div>
                <div className="w-[18%] p-[15px] border border-dark-200 space-y-2.5">
                    <p className="text-body-micro">Active Tasks</p>
                    <p className="text-headline-medium font-normal">1</p>
                </div>
            </div>
            <div className="w-full p-[15px] border border-dark-200 flex items-start gap-2.5 my-5">
                <p className="text-body-tiny tracking-[-3%] text-primary-100" style={{ lineHeight: "20px" }}>#0032</p>
                <div className="py-0.5 px-[7px] bg-primary-300 text-body-tiny font-bold text-light-200">bug</div>
                <p className="grow text-body-medium font-bold text-light-100 line-clamp-2">
                    Remove hardcoded model name check and replace with configurable param
                </p>
                <p className="text-body-tiny font-bold tracking-[-3%] text-primary-100" style={{ lineHeight: "20px" }}>300 USDC</p>
            </div>
            <div className="space-y-[5px] text-body-tiny mb-5">
                <div className="w-full flex items-center justify-between gap-10">
                <p className="text-primary-400">GitHub Issue:</p>
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
                    <p className="text-primary-400">Time:</p>
                    <p className="text-light-100">30 mins ago</p>
                </div>
            </div>
            <div className="flex gap-2.5">
                <ButtonPrimary
                    format="OUTLINE"
                    text="Reject"
                    attributes={{
                        onClick: () => {},
                    }}
                />
                <ButtonPrimary
                    format="SOLID"
                    text="Delegate Task"
                    sideItem={<FiArrowUpRight />}
                    attributes={{
                        onClick: () => {},
                    }}
                    extendedSideItemClassName="text-xl"
                />
            </div>
        </PopupModalLayout>
    );
}
 
export default ReviewTaskApplication;
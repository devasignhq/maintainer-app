"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import PopupModalLayout from "@/app/components/PopupModalLayout";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

type ReviewPullRequestModalProps = {
    toggleModal: () => void;
};

const ReviewPullRequestModal = ({ toggleModal }: ReviewPullRequestModalProps) => {
    
    return (
        <PopupModalLayout title="Review Contributor Pull Request" toggleModal={toggleModal}>
            <p className="mt-2.5 text-body-medium text-dark-100">
                Kindly review this pull request if it solves the problem as described in your GitHub issue. 
                Once you merge the code successfully in GitHub, the bounty will be paid out to the contributor automatically.
            </p>
            <div className="w-full p-[15px] border border-dark-200 flex items-start gap-2.5 my-5">
                <p className="text-body-tiny tracking-[-3%] text-primary-100" style={{ lineHeight: "20px" }}>#0032</p>
                <div className="py-0.5 px-[7px] bg-primary-300 text-body-tiny font-bold text-light-200">bug</div>
                <p className="grow text-body-medium font-bold text-light-100 line-clamp-2">
                    Remove hardcoded model name check and replace with configurable param
                </p>
                <p className="text-body-tiny font-bold tracking-[-3%] text-primary-100" style={{ lineHeight: "20px" }}>$300</p>
            </div>
            <div className="space-y-[5px] text-body-tiny">
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
                    <p className="text-light-100 underline truncate">30 mins ago</p>
                </div>
            </div>
            <div className="flex gap-2.5 mt-5">
                <ButtonPrimary
                    format="OUTLINE"
                    text="Reject PR"
                    attributes={{
                        onClick: () => {},
                    }}
                />
                <ButtonPrimary
                    format="SOLID"
                    text="Approve PR"
                    sideItem={<FiArrowUpRight />}
                    attributes={{
                        onClick: () => {},
                    }}
                />
            </div>
        </PopupModalLayout>
    );
}
 
export default ReviewPullRequestModal;
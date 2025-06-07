"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import PopupModalLayout from "@/app/components/PopupModalLayout";
import { TaskActivity } from "@/app/models/task.model";
import Link from "next/link";
import { useContext } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { ActiveTaskContext } from "../page";
import { moneyFormat, formatDateTime } from "@/app/utils/helper";
import { useToggle } from "ahooks";
import ApproveTaskDelegationModal from "./ApproveTaskDelegationModal";

type ReviewTaskApplicationModalProps = {
    taskActivity: TaskActivity;
    toggleModal: () => void;
};

const ReviewTaskApplicationModal = ({ taskActivity, toggleModal }: ReviewTaskApplicationModalProps) => {
    const { activeTask } = useContext(ActiveTaskContext);
    const [openApproveTaskDelegationModal, { toggle: toggleApproveTaskDelegationModal }] = useToggle(false);
    
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
                <div className="w-[40%] p-[15px] border border-dark-200 space-y-2.5">
                    <p className="text-body-micro">Developer</p>
                    <p className="text-headline-medium font-normal flex items-center gap-1 text-light-200">
                        <span className="truncate">@{taskActivity.user?.username}</span>
                        <Link href={`https://github.com/${taskActivity.user?.username}`} target="_blank">
                            <FiArrowUpRight className="text-2xl text-primary-100 hover:text-light-100" />
                        </Link>
                    </p>
                </div>
                {/* <div className="w-[26%] p-[15px] border border-dark-200 space-y-2.5">
                    <p className="text-body-micro">Platform Earnings</p>
                    <p className="text-headline-medium font-normal truncate">4,786 USDC</p>
                </div> */}
                <div className="w-[28%] p-[15px] border border-dark-200 space-y-2.5">
                    <p className="text-body-micro">Tasks Done</p>
                    <p className="text-headline-medium font-normal">
                        {taskActivity.user?.contributionSummary?.tasksCompleted}
                    </p>
                </div>
                <div className="w-[28%] p-[15px] border border-dark-200 space-y-2.5">
                    <p className="text-body-micro">Active Tasks</p>
                    <p className="text-headline-medium font-normal">
                        {taskActivity.user?.contributionSummary?.activeTasks}
                    </p>
                </div>
            </div>
            <div className="w-full p-[15px] border border-dark-200 flex items-start gap-2.5 my-5">
                <p className="text-body-tiny tracking-[-3%] text-primary-100" style={{ lineHeight: "20px" }}>
                    #{activeTask?.issue.number}
                </p>
                <p className="grow text-body-medium font-bold text-light-100 truncate">
                    {activeTask?.issue.title}
                </p>
                <p 
                    className="text-body-tiny font-bold tracking-[-3%] text-primary-100 whitespace-nowrap" 
                    style={{ lineHeight: "20px" }}
                >
                    {moneyFormat(activeTask?.bounty || "")} USDC
                </p>
            </div>
            <div className="space-y-[5px] text-body-tiny mb-5">
                <div className="w-full flex items-center justify-between gap-10">
                <p className="text-primary-400">GitHub Issue:</p>
                    <div className="flex items-center gap-1">
                        <span className="text-light-100 underline truncate">
                            {activeTask?.issue.url}
                        </span>
                        <Link href={activeTask?.issue.url || ""} target="_blank">
                            <FiArrowUpRight className="text-2xl text-primary-100 hover:text-light-100" />
                        </Link>
                    </div>
                </div>
                <div className="w-full flex items-center justify-between gap-10">
                    <p className="text-primary-400">Time:</p>
                    <p className="text-light-100">{formatDateTime(taskActivity.createdAt)}</p>
                </div>
            </div>
            <div className="flex gap-2.5">
                <ButtonPrimary
                    format="OUTLINE"
                    text="Ignore"
                    attributes={{
                        onClick: toggleModal,
                    }}
                />
                <ButtonPrimary
                    format="SOLID"
                    text="Delegate Task"
                    sideItem={<FiArrowUpRight />}
                    attributes={{
                        onClick: toggleApproveTaskDelegationModal,
                    }}
                    extendedSideItemClassName="text-xl"
                />
            </div>
            
            {openApproveTaskDelegationModal && (
                <ApproveTaskDelegationModal 
                    taskActivity={taskActivity}
                    toggleModal={toggleApproveTaskDelegationModal} 
                    onSuccess={toggleModal} 
                />
            )}
        </PopupModalLayout>
    );
}
 
export default ReviewTaskApplicationModal;
"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import { FiArrowUpRight, FiEdit3 } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import TaskActivityCard from "../components/TaskActivityCard";
import Link from "next/link";
import { useToggle } from "ahooks";
import SetTaskBountyModal from "../modals/SetTaskBountyModal";
import SetTaskTimelineModal from "../modals/SetTaskTimelineModal";
import DeleteTaskModal from "../modals/DeleteTaskModal";
import { useContext } from "react";
import { ActiveTaskContext } from "../page";
import { moneyFormat } from "@/app/utils/helper";
import { TaskDto, TIMELINE_TYPE } from "@/app/models/task.model";

const TaskOverviewSection = () => {
    const { activeTask } = useContext(ActiveTaskContext);
    const [openSetTaskBountyModal, { toggle: toggleSetTaskBountyModal }] = useToggle(false);
    const [openSetTaskTimelineModal, { toggle: toggleSetTaskTimelineModal }] = useToggle(false);
    const [openDeleteTaskModal, { toggle: toggleDeleteTaskModal }] = useToggle(false);

    return (
        <>
        <section className="min-w-[360px] w-[12%] h-full pt-[30px] flex flex-col">
            <div className="pl-5 pb-[30px] space-y-[30px] border-b border-dark-200">
                <h6 className="text-headline-small text-light-100">Task Overview</h6>
                {activeTask?.status !== "OPEN" && (
                    <div className="space-y-2.5">
                        <p className="text-body-tiny text-light-100">Developer</p>
                        <div className="flex items-center gap-1">
                            <p className="text-body-large text-light-200">@{activeTask?.contributor?.username}</p>
                            <Link href={`https://github.com/${activeTask?.contributor?.username}`} target="_blank">
                                <FiArrowUpRight className="text-2xl text-primary-100 hover:text-light-100" />
                            </Link>
                        </div>
                    </div>
                )}
                <div className="space-y-2.5">
                    <p className="text-body-tiny text-light-100">Bounty</p>
                    <div className="flex items-center gap-1">
                        <p className="text-body-large text-light-200">{moneyFormat(activeTask?.bounty || "")} USDC</p>
                        {activeTask?.status === "OPEN" && (
                            <button onClick={toggleSetTaskBountyModal}>
                                <FiEdit3 className="text-2xl text-primary-100 hover:text-light-100" />
                            </button>
                        )}
                    </div>
                </div>
                {activeTask?.status === "OPEN" ? (
                    <div className="space-y-2.5">
                        <p className="text-body-tiny text-light-100">Timeline</p>
                        <div className="flex items-center gap-1">
                            <p className="text-body-large text-light-200">
                                {activeTask.timeline} {activeTask.timelineType?.toLowerCase()}(s)
                            </p>
                            <button onClick={toggleSetTaskTimelineModal}>
                                <FiEdit3 className="text-2xl text-primary-100 hover:text-light-100" />
                            </button>
                        </div>
                    </div>
                ): (
                    <div className="space-y-2.5">
                        <p className="text-body-tiny text-light-100">Time Left</p>
                        <p className="text-body-large text-light-200">{getTimeLeft(activeTask!)}</p>
                    </div>
                )}
                <ButtonPrimary
                    format="OUTLINE"
                    text="Delete Task"
                    sideItem={<MdOutlineCancel />}
                    attributes={{ onClick: toggleDeleteTaskModal }}
                    extendedClassName="border-indicator-500 text-indicator-500"
                />
            </div>
            <h6 className="pt-[30px] pl-5 text-headline-small text-light-100">Task Activities</h6>
            <div className="pl-5 pb-5 mt-[30px] overflow-y-auto space-y-[15px]">
                {activeTask?.taskActivities?.map((activity) => (
                    <TaskActivityCard
                        key={activity.id}
                        issueNumber={activeTask.issue.number}
                        activity={activity}
                        issueUrl={activeTask.issue.url}
                    />
                ))}
                {activeTask?.taskActivities && activeTask?.taskActivities?.length === 0 && (
                    <p className="text-body-medium text-light-100">No activity to show</p>
                )}
            </div>
        </section>
        
        {openSetTaskBountyModal && <SetTaskBountyModal toggleModal={toggleSetTaskBountyModal} />}
        {openSetTaskTimelineModal && <SetTaskTimelineModal toggleModal={toggleSetTaskTimelineModal} />}
        {openDeleteTaskModal && <DeleteTaskModal toggleModal={toggleDeleteTaskModal} />}
        </>
    );
}
 
export default TaskOverviewSection;

/**
 * Calculates the time left for a task based on its timeline, timelineType, and acceptedAt date
 * @param task - The task object containing timeline information
 * @returns Formatted string showing time left (e.g., "1 week(s) 5 day(s)", "1 week(s)", "5 day(s)")
 */
export const getTimeLeft = (task: TaskDto): string => {
    // If no timeline is set, return empty string or a default message
    if (!task.timeline || !task.timelineType) {
        return "No deadline set";
    }

    // Parse the acceptedAt date
    const acceptedAt = new Date(task.acceptedAt!);
    const now = new Date();

    // Calculate total days for the timeline
    let totalTimelineDays: number;
    
    if (task.timelineType === TIMELINE_TYPE.WEEK) {
        // Handle float values for weeks (e.g., 2.5 = 2 weeks + 5 days)
        const weeks = Math.floor(task.timeline);
        const extraDays = Math.round((task.timeline - weeks) * 10); // 0.5 * 10 = 5 days
        totalTimelineDays = (weeks * 7) + extraDays;
    } else if (task.timelineType === TIMELINE_TYPE.DAY) {
        totalTimelineDays = task.timeline;
    } else {
        return "Invalid timeline type";
    }

    // Calculate the deadline
    const deadline = new Date(acceptedAt);
    deadline.setDate(deadline.getDate() + totalTimelineDays);

    // Calculate the difference in milliseconds
    const timeDiff = deadline.getTime() - now.getTime();

    // If the deadline has passed, return overdue message
    if (timeDiff <= 0) {
        return "Overdue";
    }

    // Convert milliseconds to days
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    // Format the output
    return formatTimeLeft(daysLeft);
};

/**
 * Formats the number of days left into a readable string
 * @param totalDays - Total number of days left
 * @returns Formatted string (e.g., "1 week(s) 5 day(s)", "1 week(s)", "5 day(s)")
 */
const formatTimeLeft = (totalDays: number): string => {
    const weeks = Math.floor(totalDays / 7);
    const days = totalDays % 7;

    const parts: string[] = [];

    if (weeks > 0) {
        parts.push(`${weeks} week${weeks !== 1 ? '(s)' : ''}`);
    }

    if (days > 0) {
        parts.push(`${days} day${days !== 1 ? '(s)' : ''}`);
    }

    // If no time left (shouldn't happen due to overdue check, but safety)
    if (parts.length === 0) {
        return "Less than 1 day";
    }

    return parts.join(' ');
};

/**
 * Alternative version that returns an object with more detailed information
 */
export const getDetailedTimeLeft = (task: TaskDto) => {
    if (!task.timeline || !task.timelineType) {
        return {
            isValid: false,
            isOverdue: false,
            totalDays: 0,
            weeks: 0,
            days: 0,
            formatted: "No deadline set",
            deadline: null
        };
    }

    const acceptedAt = new Date(task.acceptedAt!);
    const now = new Date();

    let totalTimelineDays: number;
    
    if (task.timelineType === TIMELINE_TYPE.WEEK) {
        const weeks = Math.floor(task.timeline);
        const extraDays = Math.round((task.timeline - weeks) * 10);
        totalTimelineDays = (weeks * 7) + extraDays;
    } else if (task.timelineType === TIMELINE_TYPE.DAY) {
        totalTimelineDays = task.timeline;
    } else {
        return {
            isValid: false,
            isOverdue: false,
            totalDays: 0,
            weeks: 0,
            days: 0,
            formatted: "Invalid timeline type",
            deadline: null
        };
    }

    const deadline = new Date(acceptedAt);
    deadline.setDate(deadline.getDate() + totalTimelineDays);

    const timeDiff = deadline.getTime() - now.getTime();
    const isOverdue = timeDiff <= 0;

    if (isOverdue) {
        const overdueDays = Math.ceil(Math.abs(timeDiff) / (1000 * 60 * 60 * 24));
        return {
            isValid: true,
            isOverdue: true,
            totalDays: -overdueDays,
            weeks: 0,
            days: 0,
            formatted: `Overdue by ${overdueDays} day${overdueDays !== 1 ? '(s)' : ''}`,
            deadline
        };
    }

    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(daysLeft / 7);
    const days = daysLeft % 7;

    return {
        isValid: true,
        isOverdue: false,
        totalDays: daysLeft,
        weeks,
        days,
        formatted: formatTimeLeft(daysLeft),
        deadline
    };
};

/**
 * Helper function to get the deadline date for a task
 */
export const getTaskDeadline = (task: TaskDto): Date | null => {
    if (!task.timeline || !task.timelineType) {
        return null;
    }

    const acceptedAt = new Date(task.acceptedAt!);
    let totalTimelineDays: number;
    
    if (task.timelineType === TIMELINE_TYPE.WEEK) {
        const weeks = Math.floor(task.timeline);
        const extraDays = Math.round((task.timeline - weeks) * 10);
        totalTimelineDays = (weeks * 7) + extraDays;
    } else if (task.timelineType === TIMELINE_TYPE.DAY) {
        totalTimelineDays = task.timeline;
    } else {
        return null;
    }

    const deadline = new Date(acceptedAt);
    deadline.setDate(deadline.getDate() + totalTimelineDays);
    
    return deadline;
};
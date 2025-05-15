"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import { FiArrowUpRight, FiEdit3 } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import TaskActivityCard from "../components/TaskActivityCard";

const TaskOverviewSection = () => {
    return (
        <section className="min-w-[360px] w-[12%] h-full pt-[30px] flex flex-col">
            <div className="pl-5 pb-[30px] space-y-[30px] border-b border-dark-200">
                <h6 className="text-headline-small text-light-100">Task Overview</h6>
                <div className="space-y-2.5">
                    <p className="text-body-tiny text-light-100">Developer</p>
                    <div className="flex items-center gap-1">
                        <p className="text-body-large text-light-200">@lenny_malcolm</p>
                        <button onClick={() => {}}>
                            <FiArrowUpRight className="text-2xl text-primary-100 hover:text-light-100" />
                        </button>
                    </div>
                </div>
                <div className="space-y-2.5">
                    <p className="text-body-tiny text-light-100">Bounty</p>
                    <div className="flex items-center gap-1">
                        <p className="text-body-large text-light-200">125 USDC</p>
                        <button onClick={() => {}}>
                            <FiEdit3 className="text-2xl text-primary-100 hover:text-light-100" />
                        </button>
                    </div>
                </div>
                <div className="space-y-2.5">
                    <p className="text-body-tiny text-light-100">Time Left</p>
                    <div className="flex items-center gap-1">
                        <p className="text-body-large text-light-200">1 week 5 days</p>
                        <button onClick={() => {}}>
                            <FiEdit3 className="text-2xl text-primary-100 hover:text-light-100" />
                        </button>
                    </div>
                </div>
                <ButtonPrimary
                    format="OUTLINE"
                    text="Delete Task"
                    sideItem={<MdOutlineCancel />}
                    attributes={{
                        onClick: () => {},
                    }}
                    extendedClassName="border-indicator-500 text-indicator-500"
                />
            </div>
            <h6 className="pt-[30px] pl-5 text-headline-small text-light-100">Task Activities</h6>
            <div className="pl-5 pb-5 mt-[30px] overflow-y-auto space-y-[15px]">
                {sampleTaskActivities.map((activity) => (
                    <TaskActivityCard
                        key={activity.id}
                        issueNumber={activity.issueNumber}
                        activityTitle={activity.activityTitle}
                        issueUrl={activity.issueUrl}
                        onClick={() => window.open(`https://${activity.issueUrl}`, '_blank')}
                    />
                ))}
            </div>
        </section>
    );
}
 
export default TaskOverviewSection;

type TaskActivity = {
    id: string;
    issueNumber: number;
    activityTitle: string;
    issueUrl: string;
    timestamp: string;
};

const sampleTaskActivities: TaskActivity[] = [
    {
        id: "1",
        issueNumber: 42,
        activityTitle: "Bounty increased to $200",
        issueUrl: "github.com/DevAsign/app-pm/issues/42",
        timestamp: "2024-05-02T10:30:00Z"
    },
    {
        id: "2",
        issueNumber: 42,
        activityTitle: "New comment added by @sarah_dev",
        issueUrl: "github.com/DevAsign/app-pm/issues/42#comment-1",
        timestamp: "2024-05-02T09:15:00Z"
    },
    {
        id: "3",
        issueNumber: 42,
        activityTitle: "Pull request submitted for review",
        issueUrl: "github.com/DevAsign/app-pm/pull/45",
        timestamp: "2024-05-02T08:45:00Z"
    },
    {
        id: "4",
        issueNumber: 42,
        activityTitle: "Task assigned to @lenny_malcolm",
        issueUrl: "github.com/DevAsign/app-pm/issues/42",
        timestamp: "2024-05-01T16:20:00Z"
    },
    {
        id: "5",
        issueNumber: 42,
        activityTitle: "Task created with $150 bounty",
        issueUrl: "github.com/DevAsign/app-pm/issues/42",
        timestamp: "2024-05-01T15:00:00Z"
    },
    {
        id: "6",
        issueNumber: 42,
        activityTitle: "Task closed by @lenny_malcolm",
        issueUrl: "github.com/DevAsign/app-pm/issues/42",
        timestamp: "2024-05-01T14:00:00Z"
    },
    {
        id: "7",
        issueNumber: 42,
        activityTitle: "Task reopened by @sarah_dev",
        issueUrl: "github.com/DevAsign/app-pm/issues/42",
        timestamp: "2024-05-01T13:00:00Z"
    }
];
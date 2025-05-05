"use client";
import FilterDropdown from "@/app/components/Dropdown/Filter";
import { FiArrowUpRight, FiEdit3, FiSearch } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import TaskCard from "./components/TaskCard";
import { useState } from "react";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import { MdOutlineCancel } from "react-icons/md";
import TaskActivityCard from "./components/TaskActivityCard";
import Link from "next/link";
import InputField from "@/app/components/InputField";
import ReviewTaskApplication from "./modals/ReviewTaskApplication";

const Tasks = () => {
    const [activeTaskId, setActiveTaskId] = useState("1");
    const [activeView, setActiveView] = useState(viewOptions[0]);

    return (
        <div className="h-[calc(100dvh-123px)] flex">
            <section className="min-w-[360px] w-[12%] h-full pt-[30px] flex flex-col">
                <div className="pr-5 flex items-center gap-2.5">
                    <InputField 
                        Icon={FiSearch}
                        attributes={{
                            placeholder: "Search Tasks or Issues",
                            name: "search",
                        }}
                        extendedContainerClassName="h-full w-full"
                        extendedInputClassName="h-full text-body-tiny text-light-100"
                    />
                    <FilterDropdown 
                        title="Labels"
                        options={["bug", "feature", "enhancement", "question"]}
                    />
                    {/* <FilterDropdown 
                        title="Milestones"
                        options={["Q1", "Launch", "Dragon V2"]}
                    /> */}
                </div>
                <div className="pr-5 flex items-center justify-between my-[30px]">
                    <h6 className="text-headline-small text-light-100">Project Tasks</h6>
                    <button 
                        className="flex items-center gap-[5px] text-primary-100 text-button-large font-extrabold hover:text-light-100"
                        onClick={() => {}}
                    >
                        <span>Import Tasks</span>
                        <HiPlus className="text-2xl" />
                    </button>
                </div>
                <div className="grow pr-5 pb-5 overflow-y-auto space-y-[15px]">
                    {sampleTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            issueNumber={task.issueNumber}
                            label={task.label}
                            bounty={task.bounty}
                            title={task.title}
                            active={activeTaskId === task.id}
                            onClick={() => setActiveTaskId(task.id)}
                        />
                    ))}
                </div>
            </section>

            <section className="grow pt-5 border-x border-dark-200">
                <div className="px-5 flex gap-[15px] text-title-large text-dark-200">
                    {viewOptions.map((option) => (
                        <button 
                            key={option.name} 
                            className={`group h-[50px] px-[5px] flex items-center gap-[7px] border-b 
                                ${activeView.name === option.name 
                                    ? "border-light-100 text-light-100" 
                                    : "border-transparent hover:text-primary-400"}
                            `}
                            onClick={() => setActiveView(option)}
                        >
                            <span>{option.name}</span>
                            {option.tag && (
                                <span className={`px-[5px] bg-light-200 text-body-medium font-bold text-dark-500 
                                    ${activeView.name !== option.name && "group-hover:bg-primary-400"}`}
                                >
                                    {option.tag}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
                <h6 className="px-5 my-10 text-headline-small text-light-100">
                    Remove hardcoded model name check and replace with configurable param
                </h6>
                <div className="px-5 text-body-medium space-y-2.5 mb-[30px]">
                    <p className="font-bold text-dark-100">Issue URL</p>
                    <Link href={""} className="text-light-100">
                        https://github.com/browser-use/browser-use/pull/1053
                    </Link>
                </div>
                <div className="text-body-medium space-y-2.5">
                    <p className="px-5 font-bold text-dark-100">Task Description</p>
                    <div className="px-5 overflow-y-auto"></div>
                </div>
            </section>

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
                            <p className="text-body-large text-light-200">$125</p>
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

            {/* <ConnectRepositoryModal toggleModal={() => {}} /> */}
            {/* <SetTaskBountyModal toggleModal={() => {}} /> */}
            {/* <SetTaskTimelineModal toggleModal={() => {}} /> */}
            {/* <DeleteTaskModal toggleModal={() => {}} /> */}
            {/* <ReviewPullRequestModal toggleModal={() => {}} /> */}
            {/* <ApprovePullRequestModal toggleModal={() => {}} /> */}
            {/* <ApproveTaskDelegation toggleModal={() => {}} /> */}
            <ReviewTaskApplication toggleModal={() => {}} />
        </div>
    );
}
 
export default Tasks;

const viewOptions = [
    { name: "Description" },
    { name: "Conversation", tag: 2 }
]

type Task = {
    id: string;
    issueNumber: number;
    label: string;
    bounty: string;
    title: string;
};

const sampleTasks: Task[] = [
    {
        id: "1",
        issueNumber: 42,
        label: "bug",
        bounty: "150",
        title: "Fix authentication token refresh mechanism"
    },
    {
        id: "2",
        issueNumber: 43,
        label: "feature",
        bounty: "300",
        title: "Implement dark mode toggle with system preference detection"
    },
    {
        id: "3",
        issueNumber: 44,
        label: "enhancement",
        bounty: "200",
        title: "Optimize image loading performance on dashboard"
    },
    {
        id: "4",
        issueNumber: 45,
        label: "bug",
        bounty: "175",
        title: "Fix mobile responsive layout issues in project cards"
    },
    {
        id: "5",
        issueNumber: 46,
        label: "feature",
        bounty: "500",
        title: "Add real-time collaboration features to project workspace"
    },
    {
        id: "6",
        issueNumber: 47,
        label: "enhancement",
        bounty: "250",
        title: "Improve code quality and maintainability in the codebase"
    },
    {
        id: "7",
        issueNumber: 48,
        label: "bug",
        bounty: "175",
        title: "Fix mobile responsive layout issues in project cards"
    },
    {
        id: "8",
        issueNumber: 49,
        label: "feature",
        bounty: "500",
        title: "Add real-time collaboration features to project workspace"
    },
    {
        id: "9",
        issueNumber: 50,
        label: "enhancement",
        bounty: "250",
        title: "Improve code quality and maintainability in the codebase"
    },
];

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
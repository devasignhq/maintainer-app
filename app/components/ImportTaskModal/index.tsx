"use client";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import ButtonPrimary from "../ButtonPrimary";
import PopupModalLayout from "../PopupModalLayout";
import FilterDropdown from "../Dropdown/Filter";
import CreateTaskCard from "./CreateTaskCard";
import { HiPlus } from "react-icons/hi";
import RepoMenuCard from "./RepoMenuCard";
import { useState } from "react";

type ImportTaskModalProps = {
    toggleModal: () => void;
};

type Repository = {
    id: string;
    repoName: string;
    repoUrl: string;
    issuesCount: number;
};

const sampleRepositories: Repository[] = [
    {
        id: "1",
        repoName: "DevAsign/app-pm",
        repoUrl: "https://github.com/DevAsign/app-pm",
        issuesCount: 14
    },
    {
        id: "2",
        repoName: "DevAsign/core",
        repoUrl: "https://github.com/DevAsign/core",
        issuesCount: 8
    },
    {
        id: "3",
        repoName: "DevAsign/docs",
        repoUrl: "https://github.com/DevAsign/docs",
        issuesCount: 5
    }
];

const ImportTaskModal = ({ toggleModal }: ImportTaskModalProps) => {
    const [activeRepoId, setActiveRepoId] = useState(sampleRepositories[0].id);
    
    return (
        <PopupModalLayout title="Import from GitHub Issues" toggleModal={toggleModal}>
            <section className="mt-[15px] space-y-2.5">
                <p className="text-body-medium text-light-200">Repository URL(s)</p>
                <div className="flex items-end justify-between gap-2.5">
                    <div className="w-full border-b border-dark-200 flex gap-[15px] overflow-x-auto">
                        {sampleRepositories.map((repo) => (
                            <RepoMenuCard
                                key={repo.id}
                                repoName={repo.repoName}
                                repoUrl={repo.repoUrl}
                                active={activeRepoId === repo.id}
                                onClick={() => setActiveRepoId(repo.id)}
                            />
                        ))}
                    </div>
                    <ButtonPrimary
                        format="SOLID"
                        text="Add Repo"
                        sideItem={<HiPlus />}
                        attributes={{
                            onClick: () => {},
                        }}
                        extendedClassName="h-full bg-light-200 hover:bg-light-100"
                    />
                </div>
            </section>
            <section className="my-[30px] flex items-center gap-2.5">
                <div className="h-full w-full relative">
                    <FiSearch className="text-xl text-light-100 absolute top-1/2 -translate-y-1/2 left-2.5" />
                    <input
                        type="text"
                        placeholder="Search Issues"
                        className="w-full h-full p-2.5 pl-[42px] bg-dark-400 border border-dark-100 text-body-small text-light-100"
                    />
                </div>
                <FilterDropdown 
                    title="Labels"
                    options={["bug", "feature", "enhancement", "question"]}
                />
                <FilterDropdown 
                    title="Milestones"
                    options={["Q1", "Launch", "Dragon V2"]}
                />
            </section>
            <section className="flex items-end justify-between">
                <div>
                    <p className="flex items-center gap-[5px] text-title-large text-light-100">
                        <span>Issues Found</span>
                        <span className="px-[5px] text-body-medium font-bold text-dark-500 bg-primary-100">14</span>
                    </p>
                    <p className="text-body-medium text-dark-200 mt-[5px]">
                        Select issues you’d like to import and add bounties to.
                    </p>
                </div>
                <button 
                    className="text-body-medium text-light-200 font-bold hover:text-light-100"
                    onClick={() => {}}
                >
                    Clear Selection
                </button>
            </section>
            <section className="grow my-[30px] flex flex-col gap-2.5 overflow-y-auto">
                <CreateTaskCard active />
                <CreateTaskCard />
                <CreateTaskCard active />
                <CreateTaskCard active />
                <CreateTaskCard />
                <CreateTaskCard />
                <CreateTaskCard />
            </section>
            <section className="flex gap-2.5">
                <ButtonPrimary
                    format="SOLID"
                    text="Proceed"
                    sideItem={<FiArrowRight />}
                    attributes={{
                        onClick: () => {},
                    }}
                />
                <ButtonPrimary
                    format="OUTLINE"
                    text="Save Draft"
                    attributes={{
                        onClick: () => {},
                    }}
                />
            </section>
        </PopupModalLayout>
    );
}
 
export default ImportTaskModal;
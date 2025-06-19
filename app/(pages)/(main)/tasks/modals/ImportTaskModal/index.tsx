/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { FiArrowRight } from "react-icons/fi";
import ButtonPrimary from "../../../../../components/ButtonPrimary";
import PopupModalLayout from "../../../../../components/PopupModalLayout";
import FilterDropdown from "../../../../../components/Dropdown/Filter";
import CreateTaskCard from "./components/CreateTaskCard";
import { HiPlus } from "react-icons/hi";
import RepoMenuCard from "./components/RepoMenuCard";
import { useContext, useEffect, useMemo, useState } from "react";
import { useAsyncEffect, useInfiniteScroll, useRequest } from "ahooks";
import useTaskStore from "@/app/state-management/useTaskStore";
import { PiEyeBold, PiEyeSlashBold } from "react-icons/pi";
import {
    createBountyLabel,
    getBountyLabel,
    getRepoIssues,
    getRepoLabels,
    getRepoMilestones,
    updateRepoIssue
} from "@/app/services/github.service";
import { 
    IssueDto, 
    IssueFilters,
    IssueLabel,
    IssueMilestone,
    RepositoryDto 
} from "@/app/models/github.model";
import { Data } from "ahooks/lib/useInfiniteScroll/types";
import { CreateTaskDto } from "@/app/models/task.model";
import { toast } from "react-toastify";
import { TaskAPI } from "@/app/services/task.service";
import { openInNewTab } from "@/app/utils/helper";
import { customBountyMessage } from "@/app/utils/data";
import { OctokitContext } from "../../../layout";
import useInstallationStore from "@/app/state-management/useInstallationStore";

type TaskPayload = {
    payload: CreateTaskDto;
    valid: boolean;
}

type UploadStatus = "PENDING" | "CREATED" | "FAILED";

type ImportTaskModalProps = {
    installationRepos: RepositoryDto[];
    loadingInstallationRepos: boolean;
    toggleModal: () => void;
    onSuccess: () => void;
};

// TODO: Transfer logic to custom hook
// TODO: Disable all buttons and links when tasks are being uploaded
const ImportTaskModal = ({ 
    installationRepos,
    loadingInstallationRepos,
    toggleModal,
    onSuccess
}: ImportTaskModalProps) => {
    const octokit = useContext(OctokitContext);
    const { activeInstallation } = useInstallationStore();
    const { draftTasks, setDraftTasks } = useTaskStore();
    const [activeRepo, setActiveRepo] = useState<RepositoryDto | undefined>(installationRepos[0]);
    const [issueFilters, setIssueFilters] = useState<IssueFilters>(defaultIssueFilters);
    const [currentPage, setCurrentPage] = useState(1);
    const [showSelectedTasks, setShowSelectedTasks] = useState(false);
    const [uploadingTasks, setUploadingTasks] = useState(false);
    const [validBountyLabel, setValidBountyLabel] = useState<Map<string, boolean>>(new Map());
    // const [totalBounties, setTotalBounties] = useState(false);
    const [uploadedTasks, setUploadedTasks] = useState<Map<number, UploadStatus>>(new Map());
    const [selectedTasks, setSelectedTasks] = useState<Map<number, TaskPayload>>(() => {
        const initialMap = new Map();
        draftTasks.forEach(draft => {
            initialMap.set(draft.issue.id, {
                payload: draft,
                valid: true
            });
        });
        return initialMap;
    });
    const selectedIssues = useMemo(() => 
        Array.from(selectedTasks.values()).map(task => task.payload.issue), 
        [selectedTasks]
    );
    const validPayload = useMemo(() => {
        if (selectedTasks.size === 0) return false;
        
        return Array.from(selectedTasks.values()).every(task => task.valid);
    }, [selectedTasks]);

    // Set active repo upon initialization
    useEffect(() => {
        if (installationRepos.length === 0 || activeRepo) return;
        setActiveRepo(installationRepos[0]);
    }, [installationRepos.length]);

    // Check if repo has bounty label
    useAsyncEffect(async () => {
        if (!activeRepo || !octokit) return;
        if (validBountyLabel.get(activeRepo.url)) return;
        
        let bountyLabel;
        try {
            bountyLabel = await getBountyLabel(activeRepo.url, octokit);
            setValidBountyLabel(validBountyLabel.set(activeRepo.url, true));
        } catch {}

        if (!bountyLabel) {
            try {
                await createBountyLabel(activeRepo.url, octokit);
                setValidBountyLabel(validBountyLabel.set(activeRepo.url, true));
            } catch {}
        }
    }, [activeRepo, octokit])
    
    const {
        data: repoIssues,
        loading: loadingIssues,
        loadingMore: loadingMoreIssues,
        noMore: noMoreIssues,
        loadMore: loadMoreIssues,
        reload: reloadIssues,
    } = useInfiniteScroll<Data>(
        async (currentData) => {
            const pageToLoad = currentData ? currentPage + 1 : 1;

            if (!activeRepo || !octokit) {
                return { list: [], hasMore: false };
            }

            const issues = await getRepoIssues(
                activeRepo.url,
                octokit,
                issueFilters || {},
                pageToLoad
            );
            
            setCurrentPage(pageToLoad);

            return { 
                list: issues as unknown as IssueDto[],
                hasMore: issues.length === 30,
            };
        }, {
            // target: taskSectionRef,
            isNoMore: (data) => !data?.hasMore,
            reloadDeps: [activeRepo, ...(issueFilters ? Object.values(issueFilters) : [])],
        }
    );

    const { loading: loadingLabels, data: repoLabels } = useRequest<IssueLabel[], any>(
        () => {
            if (!activeRepo || !octokit) {
                return delayedArray();
            } 
            return getRepoLabels(activeRepo.url, octokit) as Promise<IssueLabel[]>;
        }, 
        {
            retryCount: 1,
            cacheKey: `${activeRepo?.id}-labels`,
            refreshDeps: [activeRepo]
        }
    );

    const { loading: loadingMilestones, data: repoMilestones } = useRequest<IssueMilestone[], any>(
        () => {
            if (!activeRepo || !octokit) {
                return delayedArray();
            } 
            return getRepoMilestones(activeRepo.url, octokit) as Promise<IssueMilestone[]>;
        }, 
        {
            retryCount: 1,
            cacheKey: `${activeRepo?.id}-milestones`,
            refreshDeps: [activeRepo]
        }
    );

    const disableFilters = loadingInstallationRepos  || loadingIssues || loadingMoreIssues;

    const handleToggleCheck = (issueId: number, taskPayload: TaskPayload | null) => {
        setSelectedTasks(prev => {
            const newMap = new Map(prev);
            if (taskPayload) {
                newMap.set(issueId, taskPayload);
            } else {
                newMap.delete(issueId);
            }
            if (newMap.size === 0) {
                setShowSelectedTasks(false);
            }
            return newMap;
        });
    };

    // TODO: Update toast content to 'Task for <prometheues issue #3>...'. Repo-issue-number
    // TODO: Alert users when bounty label was not added to issue. They should do it manually 
    const createTasks = async () => {
        if (selectedTasks.size === 0) {
            toast.error("Please select at least one issue to import.");
            return;
        }
        if (!showSelectedTasks) {
            setShowSelectedTasks(true);
            return;
        }

        // TODO: Check if user USDC balance is enough (open fund wallet modal if it ain't enough)
        // const totalBounties = Array.from(selectedTasks.values())
        //     .reduce((total, task) => total + Number(task.payload.bounty), 0);

        setUploadingTasks(true);

        const draftTasks: CreateTaskDto[] = [];
        let hasErrors = false;

        for (const task of Array.from(selectedTasks.values())) {
            toast.info(`Creating task for issue #${task.payload.issue.number}...`, { autoClose: 2000 }); // ? Use toast.promise here
            setUploadedTasks(prev => {
                prev.set(task.payload.issue.id, "PENDING");
                return prev;
            });

            try {
                const createdTask = await TaskAPI.createTask({ payload: task.payload });
                
                try {
                    let issueLabels = task.payload.issue.labels.reduce<string[]>((acc, label) => [...acc, label.name], []);
                    issueLabels = [...issueLabels, "💵 Bounty"];

                    await updateRepoIssue(
                        task.payload.issue.repository_url, 
                        octokit!, 
                        task.payload.issue.number,
                        // task.payload.issue.title + ` (${moneyFormat(task.payload.bounty)} USDC)`,
                        task.payload.issue.body + customBountyMessage(task.payload.bounty, createdTask.id),
                        issueLabels as unknown as string[]
                    )

                    toast.success(`Task for issue #${task.payload.issue.number} created successfully!`);
                    setUploadedTasks(prev => {
                        prev.set(task.payload.issue.id, "CREATED");
                        return prev;
                    });
                } catch (error) {
                    toast.info(`Task for issue #${task.payload.issue.number} created successfully but failed to update issue.`);
                    setUploadedTasks(prev => {
                        prev.set(task.payload.issue.id, "CREATED");
                        return prev;
                    });
                    console.error(`Error updating issue #${task.payload.issue.number}:`, error);
                }
            } catch (error) {
                toast.error(`Task for issue #${task.payload.issue.number} failed to create.`);
                setUploadedTasks(prev => {
                    prev.set(task.payload.issue.id, "FAILED");
                    return prev;
                });
                hasErrors = true;
                draftTasks.push(task.payload);
                console.error(`Error creating task #${task.payload.issue.number}:`, error);
            }
        }

        if (!hasErrors) {
            toast.success("All tasks created successfully!");
            setUploadingTasks(false);
            toggleModal();
            onSuccess();
            return;
        }

        reloadIssues();
        setDraftTasks(draftTasks);
        setUploadingTasks(false);
    };

    const saveDraft = () => {
        const drafts = Array.from(selectedTasks.values()).map(task => task.payload);
        setDraftTasks(drafts);
        toggleModal();
    };

    const clearSelection = () => {
        setSelectedTasks(new Map());
        setDraftTasks([]);
        setShowSelectedTasks(false);
    };

    return (
        <PopupModalLayout title="Import from GitHub Issues" toggleModal={toggleModal}>
            <section className="mt-[15px] space-y-2.5">
                <p className="text-body-medium text-light-200">Repository URL(s)</p>
                <div className="flex items-end justify-between gap-2.5">
                    {loadingInstallationRepos ? (
                        <p className="text-body-medium text-light-100">Fetching repositories...</p>
                    ):(
                        <div className="w-full border-b border-dark-200 flex gap-[15px] overflow-x-auto">
                            {installationRepos?.map((repo) => (
                                <RepoMenuCard
                                    key={repo.id}
                                    repoName={repo.name || repo.url.split("/")[4]}
                                    repoUrl={repo.url}
                                    active={activeRepo?.id === repo.id}
                                    onClick={() => setActiveRepo(repo)}
                                />
                            ))}
                        </div>
                    )}
                    <ButtonPrimary
                        format="SOLID"
                        text="Add Repo"
                        sideItem={<HiPlus />}
                        attributes={{
                            onClick: () => openInNewTab(activeInstallation!.htmlUrl),
                            disabled: loadingInstallationRepos
                        }}
                        extendedClassName="h-full bg-light-200 hover:bg-light-100"
                    />
                </div>
            </section>
            <section className="my-[30px] flex items-center gap-2.5">
                {/* <div className="relative">
                    <InputField 
                        Icon={FiSearch}
                        attributes={{
                            placeholder: "Search Issues",
                            name: "search",
                        }}
                        extendedContainerClassName="h- full"
                        extendedInputClassName="h-full"
                    />
                    <button>

                    </button>
                </div> */}
                <FilterDropdown 
                    title="Labels"
                    options={repoLabels || []}
                    fieldName="name"
                    fieldValue="name"
                    setField={(value) => setIssueFilters((prev) => ({
                        ...prev,
                        labels: value as string[]
                    }))}
                    buttonAttributes={{ disabled: loadingLabels || disableFilters }}
                />
                <FilterDropdown 
                    title="Milestones"
                    options={repoMilestones || []}
                    fieldName="name"
                    fieldValue="name"
                    setField={(value) => setIssueFilters((prev) => ({
                        ...prev,
                        milestone: value as string
                    }))}
                    buttonAttributes={{ disabled: loadingMilestones || disableFilters }}
                    noMultiSelect
                />
                <FilterDropdown 
                    title="Sort By"
                    options={[
                        { label: "Date Created", value: "created" },
                        { label: "Last Updated", value: "updated" },
                        { label: "Most Comments", value: "comments" }
                    ]}
                    fieldName="label"
                    fieldValue="value"
                    setField={(value) => setIssueFilters((prev) => ({
                        ...prev,
                        sort: value as "created" | "updated" | "comments"
                    }))}
                    buttonAttributes={{ disabled: disableFilters }}
                    noMultiSelect
                />
                <FilterDropdown 
                    title="Order"
                    options={[
                        { label: "Ascending", value: "asc" },
                        { label: "Descending", value: "desc" }
                    ]}
                    fieldName="label"
                    fieldValue="value"
                    setField={(value) => setIssueFilters((prev) => ({
                        ...prev,
                        direction: value as "asc" | "desc"
                    }))}
                    buttonAttributes={{ disabled: disableFilters || !issueFilters.sort }}
                    noMultiSelect
                />
            </section>
            <section className="flex items-end justify-between">
                <div>
                    <p className="flex items-center gap-[5px] text-title-large text-light-100">
                        <span>Issues Selected</span>
                        <button 
                            onClick={() => {
                                if (selectedIssues.length > 0) {
                                    setShowSelectedTasks(prev => !prev);
                                }
                            }}
                            className={`px-[5px] text-body-medium font-bold text-dark-500 flex items-center gap-1 
                                ${showSelectedTasks ? "bg-light-200" : "bg-primary-100"}`
                            }
                            style={{ cursor: selectedIssues.length > 0 ? "pointer" : "default" }}
                        >
                            <span>{selectedIssues.length}</span>
                            {(selectedIssues.length > 0) ? (
                                showSelectedTasks ? (
                                    <PiEyeSlashBold className="text-base" />
                                ):(
                                    <PiEyeBold className="text-base" />
                                )
                            ): null}
                        </button>
                    </p>
                    <p className="text-body-medium text-dark-200 mt-[5px]">
                        Select issues you’d like to import and add bounties to.
                    </p>
                </div>
                <button 
                    className="text-body-medium text-light-200 font-bold hover:text-light-100"
                    onClick={clearSelection}
                >
                    Clear Selection
                </button>
            </section>
            <section className="grow my-[30px] flex flex-col gap-2.5 overflow-y-auto">
                {(showSelectedTasks && selectedIssues.length > 0) ? (
                    selectedIssues.map((issue) => (
                        <CreateTaskCard 
                            key={issue.id}
                            issue={issue as IssueDto}
                            defaultSelected={selectedTasks.get(issue.id)}
                            showFields
                            onToggleCheck={(taskPayload) => handleToggleCheck(issue.id, taskPayload)}
                            uploadStatus={uploadedTasks.get(issue.id)}
                            disableFields={uploadingTasks || Boolean(uploadedTasks.get(issue.id))}
                        />
                    ))
                ):(
                    <>
                        {repoIssues?.list?.map((issue) => (
                            <CreateTaskCard 
                                key={issue.id}
                                issue={issue}
                                defaultSelected={selectedTasks.get(issue.id)}
                                showFields={false}
                                onToggleCheck={(taskPayload) => handleToggleCheck(issue.id, taskPayload)}
                                uploadStatus={uploadedTasks.get(issue.id)}
                                disableFields={uploadingTasks || Boolean(uploadedTasks.get(issue.id))}
                            />
                        ))}
                        {(repoIssues?.list && repoIssues.list.length < 1 && !loadingIssues) && (
                            <div className="flex justify-center py-4">
                                <span className="text-body-medium text-light-100">No issues found</span>
                            </div>
                        )}
                        {(loadingIssues && repoIssues?.list && repoIssues.list.length < 1) && (
                            <div className="flex justify-center py-4">
                                <span className="text-body-medium text-light-100">Fetching issues...</span>
                            </div>
                        )}
                        {loadingMoreIssues && (
                            <div className="flex justify-center pt-2.5">
                                <span className="text-body-medium text-light-100">Fetching more issues...</span>
                            </div>
                        )}
                        {(!loadingMoreIssues && !noMoreIssues) && (
                            <button 
                                className="text-body-medium text-light-200 font-bold hover:text-light-100 pt-2.5"
                                onClick={loadMoreIssues}
                            >
                                Get More
                            </button>
                        )}
                    </>
                )}
            </section>
            <section className="flex gap-2.5">
                <ButtonPrimary
                    format="SOLID"
                    text={
                        showSelectedTasks 
                            ? uploadingTasks
                                ? "Uploading..."
                                : "Upload" 
                            : "Proceed"
                    }
                    sideItem={<FiArrowRight />}
                    attributes={{
                        onClick: createTasks,
                        disabled: uploadingTasks || (!validPayload && showSelectedTasks)
                    }}
                />
                <ButtonPrimary
                    format="OUTLINE"
                    text="Save Draft"
                    attributes={{
                        onClick: saveDraft,
                        disabled: uploadingTasks || !validPayload
                    }}
                />
            </section>
        </PopupModalLayout>
    );
}
 
export default ImportTaskModal;

const delayedArray = (): Promise<any[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([]);
        }, 1000);
    });
};

const defaultIssueFilters: IssueFilters = {
    labels: undefined,
    milestone: undefined,
    sort: undefined,
    direction: undefined,
}
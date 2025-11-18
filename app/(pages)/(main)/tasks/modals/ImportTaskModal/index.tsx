/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { FiArrowRight } from "react-icons/fi";
import ButtonPrimary from "../../../../../components/ButtonPrimary";
import PopupModalLayout from "../../../../../components/PopupModalLayout";
import FilterDropdown from "../../../../../components/Dropdown/Filter";
import CreateTaskCard from "./components/CreateTaskCard";
import { HiPlus } from "react-icons/hi";
import RepoMenuCard from "./components/RepoMenuCard";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAsyncEffect, useInfiniteScroll, useRequest } from "ahooks";
import useTaskStore from "@/app/state-management/useTaskStore";
import { PiEyeBold, PiEyeSlashBold } from "react-icons/pi";
import {
    QueryRepositoryIssues,
    RepositoryDto,
    GetRepositoryResourcesResponse
} from "@/app/models/github.model";
import { Data } from "ahooks/lib/useInfiniteScroll/types";
import { CreateTaskDto } from "@/app/models/task.model";
import { toast } from "react-toastify";
import { TaskAPI } from "@/app/services/task.service";
import { openInNewTab } from "@/app/utils/helper";
import useInstallationStore from "@/app/state-management/useInstallationStore";
import SearchBox from "../../components/SearchBox";
import { InstallationAPI } from "@/app/services/installation.service";

type TaskPayload = {
    payload: CreateTaskDto;
    valid: boolean;
}

type IssueFilters = Pick<QueryRepositoryIssues, "title" | "labels" | "milestone" | "sort" | "direction" | "perPage">;

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
    const { activeInstallation } = useInstallationStore();
    const { draftTasks, setDraftTasks } = useTaskStore();
    const taskBoxRef = useRef<HTMLDivElement>(null);
    const [activeRepo, setActiveRepo] = useState<RepositoryDto | undefined>(installationRepos[0]);
    const [issueFilters, setIssueFilters] = useState<IssueFilters>(defaultIssueFilters);
    const [searchValue, setSearchValue] = useState("");
    const [displaySearchIcon, setDisplaySearchIcon] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [showSelectedTasks, setShowSelectedTasks] = useState(false);
    const [uploadingTasks, setUploadingTasks] = useState(false);
    const [validBountyLabel, setValidBountyLabel] = useState<Map<string, string>>(new Map());
    // const [totalBounties, setTotalBounties] = useState(false);
    const [uploadedTasks, setUploadedTasks] = useState<Map<string, UploadStatus>>(new Map());
    const [selectedTasks, setSelectedTasks] = useState<Map<string, TaskPayload>>(() => {
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
        Array.from(selectedTasks.values()).map(task => ({
            ...task.payload.issue,
            labels: { nodes: task.payload.issue.labels }
        })),
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

    // Preload bounty labels for all repositories
    useAsyncEffect(async () => {
        if (!activeInstallation || installationRepos.length === 0) return;

        const promises = installationRepos.map(async (repo) => {
            if (validBountyLabel.get(repo.id)) return;

            try {
                const response = await InstallationAPI.getOrCreateBountyLabel(
                    activeInstallation.id,
                    repo.id
                );
                return { repoId: repo.id, labelId: response.bountyLabel.id };
            } catch {
                return null;
            }
        });

        const results = await Promise.all(promises);
        const newLabels = new Map(validBountyLabel);

        results.forEach(result => {
            if (result) {
                newLabels.set(result.repoId, result.labelId);
            }
        });

        setValidBountyLabel(newLabels);
    }, [installationRepos, activeInstallation]);

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

            if (!activeRepo || !activeInstallation) {
                return { list: [], hasMore: false };
            }

            const { issues, hasMore } = await InstallationAPI.getRepositoryIssues(
                activeInstallation.id,
                {
                    repoUrl: activeRepo.url,
                    page: pageToLoad,
                    ...issueFilters,
                }
            );

            setCurrentPage(pageToLoad);

            return { list: issues, hasMore };
        }, 
        {
            isNoMore: (data) => !data?.hasMore,
            reloadDeps: [activeRepo, ...Object.values(issueFilters)],
        }
    );

    const { loading: loadingResources, data: repoResources } = useRequest<GetRepositoryResourcesResponse, any>(
        () => {
            if (!activeRepo || !activeInstallation) {
                return delayedEmptyResources();
            }
            return InstallationAPI.getRepositoryResources(
                activeInstallation.id,
                activeRepo.url
            ) as Promise<GetRepositoryResourcesResponse>;
        },
        {
            retryCount: 1,
            cacheKey: `${activeRepo?.url}-resources`,
            refreshDeps: [activeRepo]
        }
    );

    const disableFilters = loadingInstallationRepos || loadingIssues || loadingMoreIssues;

    const handleToggleCheck = (issueId: string, taskPayload: TaskPayload | null, repoId: string) => {
        setSelectedTasks(prev => {
            const newMap = new Map(prev);
            if (taskPayload) {
                // Store the repo ID with the task payload for later bounty label lookup
                const enhancedPayload = {
                    ...taskPayload,
                    payload: {
                        ...taskPayload.payload,
                        bountyLabelId: validBountyLabel.get(repoId) || "",
                        repoId // Store the repo ID for later lookup
                    }
                };
                newMap.set(issueId, enhancedPayload);
            } else {
                newMap.delete(issueId);
            }
            if (newMap.size === 0) {
                setShowSelectedTasks(false);
            }
            return newMap;
        });
    };

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
        taskBoxRef!.current!.scrollTop = 0;

        await new Promise((resolve) => {
            toast.warn(
                "Please do not leave this page or close this modal while your tasks are still processing.", 
                { autoClose: 3000 }
            );
            setTimeout(() => resolve(null), 500);
        });

        const draftTasks: CreateTaskDto[] = [];
        let hasErrors = false;

        for (const task of Array.from(selectedTasks.values())) {
            // ? Use toast.promise here
            toast.info(`Creating task for issue #${task.payload.issue.number}...`, { autoClose: 2000 });
            setUploadedTasks(prev => new Map(prev).set(task.payload.issue.id, "PENDING"));

            try {
                delete task.payload.repoId;
                const response = await TaskAPI.createTask({ payload: task.payload });

                toast.success(`Task for issue #${task.payload.issue.number} created successfully!`);
                setUploadedTasks(prev => new Map(prev).set(task.payload.issue.id, "CREATED"));

                if (response && "message" in response) {
                    toast.warn(response.message);
                }
            } catch (error) {
                toast.error(`Task for issue #${task.payload.issue.number} failed to create.`);
                setUploadedTasks(prev => new Map(prev).set(task.payload.issue.id, "FAILED"));
                hasErrors = true;
                draftTasks.push(task.payload);
                console.error(`Error creating task #${task.payload.issue.number}:`, error);
            }
        }

        if (!hasErrors) {
            toast.success("All tasks created successfully!");
            setUploadingTasks(false);
            setDraftTasks([]);
            toggleModal();
            onSuccess();
            return;
        }

        reloadIssues();
        setDraftTasks(draftTasks.length > 0 ? draftTasks : []);
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
        <PopupModalLayout 
            title="Import from GitHub Issues" 
            toggleModal={toggleModal}
            disableCloseButton={uploadingTasks}
        >
            <section className="mt-[15px] space-y-2.5">
                <p className="text-body-medium text-light-200">Repository URL(s)</p>
                <div className="flex items-end justify-between gap-2.5">
                    {loadingInstallationRepos ? (
                        <p className="text-body-medium text-light-100">Fetching repositories...</p>
                    ) : (
                        <div className="w-full border-b border-dark-200 flex gap-[15px] overflow-x-auto">
                            {installationRepos?.map((repo) => (
                                <RepoMenuCard
                                    key={repo.id}
                                    repoName={repo.name || repo.url.split("/")[4]}
                                    repoUrl={repo.url}
                                    active={activeRepo?.id === repo.id}
                                    onClick={() => {
                                        setIssueFilters(defaultIssueFilters);
                                        setActiveRepo(repo);
                                    }}
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
            <section className="my-[30px] space-y-2.5">
                <SearchBox
                    attributes={{
                        placeholder: "Search issues by title",
                        name: "search",
                        value: searchValue,
                        onChange: (e) => {
                            setSearchValue(e.target.value);
                            if (!displaySearchIcon) setDisplaySearchIcon(true);
                        },
                        disabled: disableFilters,
                    }}
                    extendedContainerClassName="w-full"
                    extendedInputClassName="h-full"
                    enableSearchOption={Boolean(searchValue.trim().length > 2)}
                    displaySearchIcon={!Boolean(issueFilters.title) || displaySearchIcon}
                    onSearchIconClick={() => {
                        setIssueFilters((prev) => ({
                            ...prev,
                            title: searchValue.trim()
                        }));
                        setDisplaySearchIcon(false);
                    }}
                    onClearIconClick={() => {
                        setIssueFilters((prev) => ({
                            ...prev,
                            title: undefined
                        }));
                        setSearchValue("");
                    }}
                />
                <div className="flex items-center gap-2.5">
                    <FilterDropdown
                        title="Labels"
                        options={repoResources?.labels || []}
                        fieldName="name"
                        fieldValue="name"
                        setField={(value) => setIssueFilters((prev) => ({
                            ...prev,
                            labels: value as string[]
                        }))}
                        extendedButtonClassName="py-[5px]"
                        buttonAttributes={{ 
                            style: { fontSize: "12px", lineHeight: "16px", fontWeight: "700" }, 
                            disabled: loadingResources || disableFilters 
                        }}
                    />
                    <FilterDropdown
                        title="Milestones"
                        options={repoResources?.milestones || []}
                        fieldName="title"
                        fieldValue="title"
                        setField={(value) => setIssueFilters((prev) => ({
                            ...prev,
                            milestone: value as string
                        }))}
                        extendedButtonClassName="py-[5px]"
                        buttonAttributes={{ 
                            style: { fontSize: "12px", lineHeight: "16px", fontWeight: "700" }, 
                            disabled: loadingResources || disableFilters 
                        }}
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
                        defaultValue="created"
                        setField={(value) => setIssueFilters((prev) => ({
                            ...prev,
                            sort: value as "created" | "updated" | "comments"
                        }))}
                        extendedButtonClassName="py-[5px]"
                        buttonAttributes={{ 
                            style: { fontSize: "12px", lineHeight: "16px", fontWeight: "700" }, 
                            disabled: disableFilters 
                        }}
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
                        defaultValue="desc"
                        setField={(value) => setIssueFilters((prev) => ({
                            ...prev,
                            direction: value as "asc" | "desc"
                        }))}
                        extendedButtonClassName="py-[5px]"
                        buttonAttributes={{ 
                            style: { fontSize: "12px", lineHeight: "16px", fontWeight: "700" }, 
                            disabled: disableFilters || !issueFilters.sort 
                        }}
                        noMultiSelect
                    />
                </div>
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
                                ) : (
                                    <PiEyeBold className="text-base" />
                                )
                            ) : null}
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
            <section
                ref={taskBoxRef}
                className="grow my-[30px] flex flex-col gap-2.5 overflow-y-auto"
            >
                {(showSelectedTasks && selectedIssues.length > 0) ? (
                    selectedIssues.map((issue) => {
                        // Find the repo ID for this issue from the selected tasks
                        const selectedTask = selectedTasks.get(issue.id);
                        const repoId = selectedTask?.payload.repoId ||
                            installationRepos.find(repo => repo.url === issue.repository.url)?.id || "";

                        return (
                            <CreateTaskCard
                                key={issue.id}
                                issue={issue}
                                bountyLabelId={validBountyLabel.get(repoId) || ""}
                                defaultSelected={selectedTasks.get(issue.id)}
                                showFields
                                onToggleCheck={(taskPayload) => handleToggleCheck(issue.id, taskPayload, repoId)}
                                uploadStatus={uploadedTasks.get(issue.id)}
                                disableFields={uploadingTasks || Boolean(uploadedTasks.get(issue.id))}
                            />
                        );
                    })
                ) : (
                    <>
                        {loadingIssues ? (
                            <div className="flex justify-center py-4">
                                <span className="text-body-medium text-light-100">Fetching issues...</span>
                            </div>
                        ) : (
                            repoIssues?.list?.map((issue) => (
                                <CreateTaskCard
                                    key={issue.id}
                                    issue={issue}
                                    bountyLabelId={validBountyLabel.get(activeRepo?.id || "") || ""}
                                    defaultSelected={selectedTasks.get(issue.id)}
                                    showFields={false}
                                    onToggleCheck={(taskPayload) => handleToggleCheck(issue.id, taskPayload, activeRepo?.id || "")}
                                    uploadStatus={uploadedTasks.get(issue.id)}
                                    disableFields={uploadingTasks || Boolean(uploadedTasks.get(issue.id))}
                                />
                            ))
                        )}
                        {(repoIssues?.list && repoIssues.list.length < 1 && !loadingIssues) && (
                            <div className="flex justify-center py-4">
                                <span className="text-body-medium text-light-100">No issues found</span>
                            </div>
                        )}
                        {loadingMoreIssues && (
                            <div className="flex justify-center pt-2.5">
                                <span className="text-body-medium text-light-100">Fetching more issues...</span>
                            </div>
                        )}
                        {(!loadingIssues && !loadingMoreIssues && !noMoreIssues) && (
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

const delayedEmptyResources = (): Promise<GetRepositoryResourcesResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ labels: [], milestones: [] });
        }, 1000);
    });
};

const defaultIssueFilters: IssueFilters = {
    title: undefined,
    labels: undefined,
    milestone: undefined,
    sort: "created",
    direction: "desc",
    perPage: 30,
}
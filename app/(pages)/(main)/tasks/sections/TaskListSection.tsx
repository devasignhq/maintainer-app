"use client";
import FilterDropdown from "@/app/components/Dropdown/Filter";
import InputField from "@/app/components/InputField";
import { useContext, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import TaskCard from "../components/TaskCard";
import ImportTaskModal from "../modals/ImportTaskModal";
import { useInfiniteScroll, useToggle } from "ahooks";
import useProjectStore from "@/app/state-management/useProjectStore";
import { FilterTasks } from "@/app/models/task.model";
import { Data } from "ahooks/lib/useInfiniteScroll/types";
import { TaskAPI } from "@/app/services/task.service";
import { ActiveTaskContext } from "../page";
import { useCustomSearchParams } from "@/app/utils/hooks";

const TaskListSection = () => {
    const { activeProject } = useProjectStore();
    const { activeTask } = useContext(ActiveTaskContext);
    const { searchParams, updateSearchParams } = useCustomSearchParams();
    const [openImportTaskModal, { toggle: toggleImportTaskModal }] = useToggle(false);
    const [taskFilters, setTaskFilters] = useState<FilterTasks>();
    
    const {
        data: projectTasks,
        loading: loadingTasks,
        loadingMore: loadingMoreTasks,
        noMore: noMoreTasks,
        loadMore: loadMoreTasks,
        reload: reloadTasks,
    } = useInfiniteScroll<Data>(
        async (currentData) => {
            const pageToLoad = currentData ? currentData.pagination.page + 1 : 1;
            
            const response = await TaskAPI.getTasks(
                { 
                    projectId: activeProject?.id, 
                    page: pageToLoad,
                    limit: 30,
                },
                taskFilters
            );

            if (!searchParams.get("taskId") && !activeTask && response.data.length > 0) {
                updateSearchParams({ taskId: response.data[0].id });
            }

            return { 
                list: response.data,
                pagination: response.pagination,
            };
        }, {
            isNoMore: (data) => !data?.pagination.hasMore,
            reloadDeps: [activeProject?.id, ...(taskFilters ? Object.values(taskFilters) : [])]
        }
    );

    // const { loading: loadingLabels, data: repoLabels } = useRequest(
    //     () => getRepoLabels(
    //         activeRepo || activeProject?.repoUrls[0] || "",
    //         githubToken || "",
    //     ), 
    //     {
    //         retryCount: 1,
    //         cacheKey: `${activeRepo}-labels`,
    //         refreshDeps: [activeRepo],,
            // onError: () => {
            //     if (!githubToken) reAuthenticate();
            // }
    //     }
    // );

    // const { loading: loadingMilestones, data: repoMilestones } = useRequest(
    //     () => getRepoMilestones(
    //         activeRepo || activeProject?.repoUrls[0] || "",
    //         githubToken || "",
    //     ), 
    //     {
    //         retryCount: 1,
    //         cacheKey: `${activeRepo}-milestones`,
    //         refreshDeps: [activeRepo],
    //         onSuccess: () => {},
    //         onError: () => {}
    //     }
    // );

    return (
        <>
        <section className="min-w-[366px] w-[12%] h-full pt-[30px] flex flex-col">
            <div className="pr-5 flex items-center justify-between">
                <h6 className="text-headline-small text-light-100">Project Tasks</h6>
                <button 
                    className="flex items-center gap-[5px] text-primary-100 text-button-large font-extrabold hover:text-light-100"
                    onClick={toggleImportTaskModal}
                >
                    <span>Import Tasks</span>
                    <HiPlus className="text-2xl" />
                </button>
            </div>
            <div className="space-y-2.5 pr-5 my-[30px]">
                <InputField 
                    Icon={FiSearch}
                    attributes={{
                        placeholder: "Search Tasks or Tasks",
                        name: "search",
                        style: { fontSize: "12px", height: "40px" },
                    }}
                    extendedContainerClassName="w-full"
                    extendedInputClassName="text-body-tiny text-light-100"
                />
                <div className="flex items-center gap-2.5">
                    <FilterDropdown
                        title="Code Repo"
                        options={activeProject?.repoUrls || []}
                        extendedContainerClassName="w-full"
                        extendedButtonClassName="w-full py-[5px]"
                        buttonAttributes={{ 
                            style: { fontSize: "12px", lineHeight: "16px", fontWeight: "700" }
                        }}
                        setField={(value) => setTaskFilters((prev) => ({
                            ...prev,
                            repoUrl: value as string
                        }))}
                        noMultiSelect
                    />
                    <FilterDropdown
                        title="Labels"
                        options={["bug", "feature", "enhancement", "question"]}
                        extendedContainerClassName="w-full"
                        extendedButtonClassName="w-full py-[5px] border-dark-100 text-dark-100"
                        buttonAttributes={{ 
                            style: { fontSize: "12px", lineHeight: "16px", fontWeight: "700" },
                            disabled: true
                        }}
                        setField={(value) => setTaskFilters((prev) => ({
                            ...prev,
                            issueLabels: value as string[]
                        }))}
                    />
                    <FilterDropdown
                        title="Milestone"
                        options={["Stage One", "Planning", "Documentation", "Testing"]}
                        extendedContainerClassName="w-full"
                        extendedButtonClassName="w-full py-[5px] border-dark-100 text-dark-100"
                        buttonAttributes={{ 
                            style: { fontSize: "12px", lineHeight: "16px", fontWeight: "700" },
                            disabled: true
                        }}
                        setField={(value) => setTaskFilters((prev) => ({
                            ...prev,
                            issueMilestone: value as string
                        }))}
                        noMultiSelect
                    />
                </div>
            </div>
            <div className="grow pr-5 pb-5 overflow-y-auto space-y-[15px]">
                {projectTasks?.list?.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        active={(activeTask?.id || searchParams.get("taskId")) === task.id}
                        onClick={() => updateSearchParams({ taskId: task.id })}
                    />
                ))}
                {(projectTasks?.list && projectTasks.list.length < 1 && !loadingTasks) && (
                    <div className="flex justify-center py-4">
                        <span className="text-body-medium text-light-100">No tasks found</span>
                    </div>
                )}
                {(loadingTasks && projectTasks?.list && projectTasks.list.length < 1) && (
                    <div className="flex justify-center py-4">
                        <span className="text-body-medium text-light-100">Loading tasks...</span>
                    </div>
                )}
                {loadingMoreTasks && (
                    <div className="flex justify-center pt-2.5">
                        <span className="text-body-medium text-light-100">Loading more tasks...</span>
                    </div>
                )}
                {(!loadingMoreTasks && !noMoreTasks) && (
                    <button 
                        className="text-body-medium text-light-200 font-bold hover:text-light-100 pt-2.5"
                        onClick={loadMoreTasks}
                    >
                        Load More
                    </button>
                )}
            </div>
        </section>
        
        {openImportTaskModal && (
            <ImportTaskModal 
                toggleModal={toggleImportTaskModal} 
                onSuccess={reloadTasks} 
            />
        )}
        </>
    );
}
 
export default TaskListSection;
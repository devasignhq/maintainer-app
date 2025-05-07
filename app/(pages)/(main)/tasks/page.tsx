"use client";
import TaskListSection from "./sections/TaskListSection";
import TaskDetailSection from "./sections/TaskDetailSection";
import TaskOverviewSection from "./sections/TaskOverviewSection";
// import ReviewTaskApplication from "./modals/ReviewTaskApplication";

const Tasks = () => {
    return (
        <div className="h-[calc(100dvh-123px)] flex">
            <TaskListSection />
            <TaskDetailSection />
            <TaskOverviewSection />

            {/* <ConnectRepositoryModal toggleModal={() => {}} /> */}
            {/* <SetTaskBountyModal toggleModal={() => {}} /> */}
            {/* <SetTaskTimelineModal toggleModal={() => {}} /> */}
            {/* <DeleteTaskModal toggleModal={() => {}} /> */}
            {/* <ReviewPullRequestModal toggleModal={() => {}} /> */}
            {/* <ApprovePullRequestModal toggleModal={() => {}} /> */}
            {/* <ApproveTaskDelegation toggleModal={() => {}} /> */}
            {/* <ReviewTaskApplication toggleModal={() => {}} /> */}
        </div>
    );
}
 
export default Tasks;
"use client";
import DetailsView from "./views/DetailsView";
import ConversationView from "./views/ConversationView";
import { useContext } from "react";
import { ActiveTaskContext } from "../../page";

const TaskDetailSection = () => {
    const { activeTask, loadingTask } = useContext(ActiveTaskContext);
    
    return (
        <section className="grow pt-5 border-x border-dark-200 flex flex-col">
            {!activeTask && !loadingTask && (
                <div className="h-full w-full grid place-content-center">
                    <p className="text-body-medium text-light-100">No task selected</p>
                </div>
            )}
            {loadingTask && (
                <div className="h-full w-full grid place-content-center">
                    <p className="text-body-medium text-light-100">Loading Task...</p>
                </div>
            )}
            {!loadingTask && activeTask && (
                activeTask?.status === "OPEN" ? <DetailsView /> : <ConversationView />
            )}
        </section>
    );
}
 
export default TaskDetailSection;
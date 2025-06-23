"use client";
import DetailsView from "./views/DetailsView";
import ConversationView from "./views/ConversationView";
import { useContext } from "react";
import { ActiveTaskContext } from "../../page";

const TaskDetailSection = () => {
    const { activeTask } = useContext(ActiveTaskContext);
    
    return (
        <section className="grow pt-5 border-x border-dark-200 flex flex-col">
            {(activeTask && activeTask.status === "OPEN") ? <ConversationView /> : <DetailsView />}
        </section>
    );
}
 
export default TaskDetailSection;
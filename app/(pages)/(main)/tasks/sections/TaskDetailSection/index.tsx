"use client";
import DetailsView from "./views/DetailsView";
import ConversationView from "./views/ConversationView";
import { useContext, useEffect, useState } from "react";
import { ActiveTaskContext } from "../../contexts/ActiveTaskContext";
import { useCustomSearchParams } from "@/app/utils/hooks";
import { MessageAPI } from "@/app/services/message.service";
import useUserStore from "@/app/state-management/useUserStore";

const TaskDetailSection = () => {
    const { currentUser } = useUserStore();
    const { activeTask } = useContext(ActiveTaskContext);
    const { searchParams, removeSearchParams } = useCustomSearchParams();
    const unread = searchParams.get("unread");
    const [activeView, setActiveView] = useState(viewOptions[0]);
    const [unreadMessagesCount, setUnreadMessagesCount] = useState(Number(unread));
    
    // Listen to unread messages count
    useEffect(() => {
        if (!currentUser?.userId || !activeTask || !activeTask.contributor?.userId) return;

        const unsubscribe = MessageAPI.listenToUnreadMessagesCount(
            activeTask.id,
            currentUser.userId,
            (count) => {
                setUnreadMessagesCount(count);
                if (unread) {
                    removeSearchParams("unread");
                }
            }
        );

        return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTask, currentUser?.userId]);
    
    return (
        <section className="grow pt-5 border-x border-dark-200 flex flex-col">
            {(activeTask && activeTask.status === "OPEN") ? (
                <DetailsView />
            ) : (
                <>
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
                                {(option.tag && unreadMessagesCount > 0) && (
                                    <span className={`px-[5px] text-body-medium font-bold text-dark-500 
                                        ${activeView.name !== option.name ? "bg-light-200 group-hover:bg-primary-400" : "bg-primary-100"}`}
                                    >
                                        {unreadMessagesCount}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                    {activeView.name === "Description" ? (
                        <DetailsView />
                    ) : (
                        <ConversationView />
                    )}
                </>
            )}
        </section>
    );
}
 
export default TaskDetailSection;

const viewOptions = [
    { name: "Description" },
    { name: "Conversation", tag: true }
]
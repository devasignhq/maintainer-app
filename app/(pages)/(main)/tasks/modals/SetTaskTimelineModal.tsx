"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import RegularDropdown from "@/app/components/Dropdown/Regular";
import PopupModalLayout from "@/app/components/PopupModalLayout";
import { TimelineType } from "@/app/models/task.model";
import { useContext, useMemo, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { ActiveTaskContext } from "../contexts/ActiveTaskContext";
import { TaskAPI } from "@/app/services/task.service";
import { handleApiError } from "@/app/utils/helper";
import { toast } from "react-toastify";

type SetTaskTimelineModalProps = {
    toggleModal: () => void;
};

const SetTaskTimelineModal = ({ toggleModal }: SetTaskTimelineModalProps) => {
    const { activeTask, setActiveTask } = useContext(ActiveTaskContext);
    const [loading, setLoading] = useState(false);
    const [newTimeline, setNewTimeline] = useState(
        getTimeline(activeTask!.timeline!)
    );
    const [timelineType, setTimelineType] = useState(
        getTimelineType(activeTask!.timelineType!, activeTask!.timeline!)
    );
    const inValidForm = useMemo(() => {
        if (newTimeline === getTimeline(activeTask!.timeline!) && 
            timelineType === getTimelineType(activeTask!.timelineType!, activeTask!.timeline!)
        ) {
            return true;
        }    
        return false;
    }, [newTimeline, timelineType, activeTask]);
        
    const updateTimeline = async () => {
        setLoading(true);

        try {
            const updatedTask = await TaskAPI.updateTaskTimeline(
                activeTask!.id,
                {
                    newTimeline: newTimeline!,
                    newTimelineType: timelineType
                }
            );

            setActiveTask({ ...activeTask!, ...updatedTask });
            toast.success("Task timeline updated successfully.");
            toggleModal();
        } catch (error) {
            handleApiError(error, "Failed to update task timeline.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <PopupModalLayout title="Set Task Timeline" toggleModal={toggleModal}>
            <p className="mt-2.5 text-body-medium text-dark-100">
                Set completion timeline for this task (issue). You cannot update the 
                timeline once the task has been delegated to a contributor.
            </p>
            <div className="w-full p-[15px] border border-primary-200 bg-dark-400 flex items-start gap-2.5 my-5">
                <p className="text-body-tiny tracking-[-3%] text-primary-100" style={{ lineHeight: "20px" }}>
                    #{activeTask?.issue.number}
                </p>
                <p className="text-body-medium font-bold text-light-100 line-clamp-2">
                    {activeTask?.issue.title}
                </p>
            </div>
            <div className="w-full flex gap-2.5">
                <input
                    type="number"
                    placeholder="0"
                    step="1"
                    className="grow py-2.5 px-[15px] bg-dark-400 border border-dark-200 text-body-medium text-light-100"
                    value={newTimeline}
                    onChange={(e) => setNewTimeline(Number(e.target.value) || undefined)}
                    disabled={loading}
                />
                <RegularDropdown
                    defaultName={
                        (getTimelineType(activeTask!.timelineType!, activeTask!.timeline!) === "DAY") 
                            ? "Day(s)" 
                            : "Week(s)"
                    }
                    options={[
                        { label: "Week(s)", value: "WEEK" },
                        { label: "Day(s)", value: "DAY" }
                    ]}
                    fieldName="label"
                    fieldValue="value"
                    extendedContainerClassName="h-full"
                    extendedButtonClassName="h-full text-body-medium text-light-100"
                    onChange={(value) => setTimelineType(value as TimelineType)}
                    buttonAttributes={{ disabled: loading }}
                />
            </div>
            <ButtonPrimary
                format="SOLID"
                text={loading ? "Updating..." : "Update Timeline"}
                sideItem={<FiArrowRight />}
                attributes={{
                    onClick: updateTimeline,
                    disabled: inValidForm || loading
                }}
                extendedClassName="w-fit mt-5"
            />
        </PopupModalLayout>
    );
};
 
export default SetTaskTimelineModal;

function getTimeline(timeline: number) {
    if (!timeline) {
        return undefined;
    }

    if (!Number.isInteger(timeline)) {
        const [weeks, days] = timeline.toString().split(".");
        return (Number(weeks) * 7) + Number(days);
    }

    return timeline;
}

function getTimelineType(timelineType: TimelineType, timeline: number) {
    if (!Number.isInteger(timeline)) {
        return "DAY";
    }

    return timelineType || "WEEK";
}

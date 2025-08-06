import { TaskActivity } from "@/app/models/task.model";
import { useToggle } from "ahooks";
import { FaChevronRight } from "react-icons/fa6";
import ReviewSubmissionModal from "../modals/ReviewSubmissionModal";
import ReviewTaskApplicationModal from "../modals/ReviewTaskApplicationModal";
import { useState } from "react";
import { useCustomSearchParams } from "@/app/utils/hooks";

type TaskActivityCardProps = {
    activity: TaskActivity;
    issueNumber: number;
};

const TaskActivityCard = ({ 
    activity,
    issueNumber,
}: TaskActivityCardProps) => {
    const [viewed, setViewed] = useState(activity.viewed);
    const { updateSearchParams } = useCustomSearchParams();
    const [openReviewSubmissionModal, { toggle: toggleReviewSubmissionModal }] = useToggle(false);
    const [openReviewTaskApplicationModal, { toggle: toggleReviewTaskApplicationModal }] = useToggle(false);
    
    return (<>
        <div 
            onClick={() => {
                if (activity.taskSubmissionId) {
                    toggleReviewSubmissionModal();
                } else {
                    toggleReviewTaskApplicationModal();
                }

                if (!viewed) {
                    updateSearchParams({ viewedTaskActivity: true });
                    setViewed(true);
                }
            }}
            role="button"
            className={`w-full p-2.5 border border-primary-200 bg-dark-400 cursor-pointer flex 
                items-center gap-[15px] hover:border-light-100 ${viewed && "opacity-70"}`
            }
        >
            <div className="py-2.5 px-[7px] text-body-tiny text-light-100 
                bg-[linear-gradient(130.86deg,_rgba(254,_137,_31,_0.175)_15.53%,_rgba(254,_137,_31,_0.075)_79.38%)]"
            >
                #{issueNumber}
            </div>
            <div className="grow space-y-[5px] overflow-hidden">
                <p className="text-body-medium text-light-100 truncate">
                    {activity.taskSubmissionId ? "Review Submission" : "New task application"}
                </p>
                <p className="text-body-tiny text-dark-100 truncate">
                    {activity.taskSubmissionId ? activity.taskSubmission?.pullRequest : activity.user?.username}
                </p>
            </div>
            <FaChevronRight className="text-2xl text-light-100" />
        </div>
        
        {openReviewSubmissionModal && (
            <ReviewSubmissionModal 
                taskActivity={activity}
                toggleModal={toggleReviewSubmissionModal} 
            />
        )}
        {openReviewTaskApplicationModal && (
            <ReviewTaskApplicationModal 
                taskActivity={activity}
                toggleModal={toggleReviewTaskApplicationModal} 
            />
        )}
    </>);
}
 
export default TaskActivityCard;
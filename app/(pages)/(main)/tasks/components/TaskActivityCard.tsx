import { TaskActivity } from "@/app/models/task.model";
import { useToggle } from "ahooks";
import { FaChevronRight } from "react-icons/fa6";
import ReviewSubmissionModal from "../modals/ReviewSubmissionModal";
import ReviewTaskApplicationModal from "../modals/ReviewTaskApplicationModal";

type TaskActivityCardProps = {
    activity: TaskActivity;
    issueNumber: number;
    issueUrl: string;
};

const TaskActivityCard = ({ 
    activity,
    issueNumber,
    issueUrl,
}: TaskActivityCardProps) => {
    const [openReviewSubmissionModal, { toggle: toggleReviewSubmissionModal }] = useToggle(false);
    const [openReviewTaskApplicationModal, { toggle: toggleReviewTaskApplicationModal }] = useToggle(false);
    
    return (
        <>
        <div 
            onClick={() => {
                if (activity.taskSubmissionId) {
                    toggleReviewTaskApplicationModal();
                } else {
                    toggleReviewSubmissionModal();
                }
            }}
            role="button"
            className="w-full p-2.5 border border-primary-200 bg-dark-400 cursor-pointer 
                flex items-center gap-[15px] hover:border-light-100"
        >
            <div className="py-2.5 px-[7px] text-body-tiny text-light-100 
                bg-[linear-gradient(130.86deg,_rgba(254,_137,_31,_0.175)_15.53%,_rgba(254,_137,_31,_0.075)_79.38%)]"
            >
                #{issueNumber}
            </div>
            <div className="grow space-y-[5px] overflow-hidden">
                <p className="text-body-medium text-light-100 truncate">
                    {activity.taskSubmissionId ? "New task application" : "Review Submission"}
                </p>
                {/* // TODO: Use username for applications and pr link otherwise */}
                <p className="text-body-tiny text-dark-100 truncate">{issueUrl}</p>
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
        </>
    );
}
 
export default TaskActivityCard;
"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import PopupModalLayout from "@/app/components/PopupModalLayout";
import { MessageDto, MessageType } from "@/app/models/message.model";
import { TaskAPI } from "@/app/services/task.service";
import useUserStore from "@/app/state-management/useUserStore";
import { formatTime, handleApiError } from "@/app/utils/helper";
import { useToggle } from "ahooks";
import { useContext, useState } from "react";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { ActiveTaskContext } from "../../../page";

type MessageBlockProps = {
    message: MessageDto;
    largeMargin: boolean;
}

const MessageBlock = ({ message, largeMargin }: MessageBlockProps) => {
    const { currentUser } = useUserStore();
    const { activeTask, setActiveTask } = useContext(ActiveTaskContext);
    const [openReplyModal, { toggle: toggleReplyModal }] = useToggle(false);
    const [replyMode, setReplyMode] = useState<"approve" | "reject">("approve");
    const [replying, setReplying] = useState(false);

    const replyExtensionRequest = async () => {
        setReplying(true);

        try {
            const response = await TaskAPI.replyTimelineModificationRequest(
                activeTask!.id,
                {
                    accept: replyMode === "approve",
                    requestedTimeline: message.metadata!.requestedTimeline!,
                    timelineType: message.metadata!.timelineType!,
                }
            );
            
            toast.success("Request sent successfully.");
            setActiveTask({ ...activeTask!, ...response.task! });
            toggleReplyModal();
        } catch (error) {
            handleApiError(error, "Failed to submit task. Please try again.");
        } finally {
            setReplying(false);
        }
    }

    return message.type === MessageType.GENERAL ? (
        <div className={`max-w-[78%] w-fit p-[15px] space-y-2.5 ${largeMargin ? "mb-[30px]" : "mb-2.5"} 
            ${message.userId === currentUser?.userId 
                ? "bg-dark-300 ml-auto" 
                : "bg-primary-300 mr-auto"}`
        }>
            <p className="text-body-medium text-light-100">{message.body}</p>
            <small className="text-body-tiny font-bold text-dark-200">
                {formatTime(message.createdAt.toDate().toISOString())}
            </small>
        </div>
    ):(
        <>
            {message.userId !== currentUser?.userId && (
                <div className={`max-w-[78%] w-fit mr-auto space-y-2.5 ${largeMargin ? "mb-[30px]" : "mb-2.5"}`}>
                    <div className="max-w-full w-fit p-[15px] mr-auto bg-dark-400 border border-dark-300 space-y-5">
                        <p className="text-body-medium text-light-100">{message.body}</p>
                        <div className="flex gap-2.5">
                            <ButtonPrimary
                                format="SOLID"
                                text="Approve"
                                attributes={{
                                    onClick: () => {
                                        setReplyMode("approve");
                                        toggleReplyModal();
                                    },
                                }}
                            />
                            <ButtonPrimary
                                format="OUTLINE"
                                text="Reject"
                                attributes={{
                                    onClick: () => {
                                        setReplyMode("reject");
                                        toggleReplyModal();
                                    },
                                }}
                            />
                        </div>
                        {!message.metadata?.reason && (
                            <small className="text-body-tiny font-bold text-dark-200">
                                {formatTime(message.createdAt.toDate().toISOString())}
                            </small>
                        )}
                    </div>
                    {message.metadata?.reason && (
                        <div className="max-w-full w-fit p-[15px] mr-auto bg-dark-400 border border-dark-300 space-y-2.5">
                            <p className="text-body-medium text-light-100">{message.metadata?.reason}</p>
                            <small className="text-body-tiny font-bold text-dark-200">
                                {formatTime(message.createdAt.toDate().toISOString())}
                            </small>
                        </div>
                    )}
                </div>
            )}
            {message.userId === currentUser?.userId && (
                <div className={`max-w-[78%] w-fit p-2.5 ml-auto bg-dark-400 border flex items-center gap-2.5 ${largeMargin ? "mb-[30px]" : "mb-2.5"} 
                    ${message.metadata?.reason === "ACCEPTED" ? "border-indicator-100" : "border-indicator-500"}`
                }>
                    {message.metadata?.reason === "ACCEPTED" ? (
                        <FiCheckCircle className="text-2xl text-indicator-100" />
                    ):(
                        <MdOutlineCancel className="text-2xl text-indicator-500" />
                    )}
                    <p className="text-body-medium text-dark-100">{message.body}</p>
                </div>
            )}
            
            {openReplyModal && (
                <PopupModalLayout 
                    title={(replyMode === "approve" ? "Approve" : "Reject") + " Extension Request"}
                    toggleModal={toggleReplyModal}
                >
                    <p className="mt-2.5 mb-5 text-body-medium text-dark-100">
                        {replyMode === "approve"
                            ? "Are you sure you want to approve this extension request?"
                            : "Are you sure you want to reject this extension request?"
                        }
                    </p>
                    <ButtonPrimary
                        format="SOLID"
                        text={
                            replyMode === "approve"
                                ? replying ? "Approving..." : "Yes, Approve"
                                : replying ? "Rejecting..." : "Yes, Reject"
                        }
                        sideItem={<FiArrowRight />}
                        attributes={{
                            onClick: replyExtensionRequest,
                            disabled: replying
                        }}
                        extendedSideItemClassName="text-xl"
                        extendedClassName="w-fit"
                    />
                </PopupModalLayout> 
            )}
        </>
    );
}
 
export default MessageBlock;
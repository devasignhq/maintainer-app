/* eslint-disable react/no-unescaped-entities */
"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import PopupModalLayout from "@/app/components/PopupModalLayout";
import { MessageDto } from "@/app/models/message.model";
import { TaskAPI } from "@/app/services/task.service";
import useUserStore from "@/app/state-management/useUserStore";
import { formatTime, handleApiError } from "@/app/utils/helper";
import { useToggle } from "ahooks";
import { useContext, useState, useEffect, useRef } from "react";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { ActiveTaskContext } from "../../../contexts/ActiveTaskContext";
import { MessageAPI } from "@/app/services/message.service";

type MessageBlockProps = {
    message: MessageDto;
    margin: string;
    setMessages: React.Dispatch<React.SetStateAction<MessageDto[]>>;
}

const MessageBlock = ({ message, margin, setMessages }: MessageBlockProps) => {
    const { currentUser } = useUserStore();
    const { activeTask, setActiveTask } = useContext(ActiveTaskContext);
    const [openReplyModal, { toggle: toggleReplyModal }] = useToggle(false);
    const [replyMode, setReplyMode] = useState<"approve" | "reject">("approve");
    const [replying, setReplying] = useState(false);
    const messageRef = useRef<HTMLDivElement>(null);

    // Mark message as read when it comes into view
    useEffect(() => {
        // Only mark messages as read if they're not from the current user and haven't been read yet
        if (!messageRef.current || message.userId === currentUser?.userId || message.read) {
            return;
        }

        const observer = new IntersectionObserver(
            async (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    try {
                        await MessageAPI.markMessageAsRead(message.id);
                        // Update local state to reflect the read status
                        setMessages(prev => prev.map(msg =>
                            msg.id === message.id ? { ...msg, read: true } : msg
                        ));
                    } catch (error) {
                        console.error('Failed to mark message as read:', error);
                    }
                    // Stop observing once marked as read
                    observer.disconnect();
                }
            },
            {
                threshold: 0.5, // Mark as read when 50% of the message is visible
                rootMargin: '0px 0px -50px 0px' // Add some margin to ensure message is well within view
            }
        );

        observer.observe(messageRef.current);

        return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser?.userId]);

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

            setMessages(prev => prev.map((msg) => {
                if (msg.id === message.id) {
                    return {
                        ...msg,
                        metadata: { ...msg.metadata!, responded: true }
                    } as MessageDto
                } else {
                    return msg
                }
            }));

            try {
                await MessageAPI.updateMessage(message.id, {
                    metadata: { ...message.metadata!, responded: true }
                });

                toast.success("Request sent successfully.");
            } catch {
                toast.success("Request sent successfully.");
                toast.warn("Failed to mark extension request message as 'responded'.")
            }

            setActiveTask({ ...activeTask!, ...response.task! });
            toggleReplyModal();
        } catch (error) {
            handleApiError(error, "Failed to submit task. Please try again.");
        } finally {
            setReplying(false);
        }
    };

    return message.type === "GENERAL" ? (
        <div
            ref={messageRef}
            className={`max-w-[78%] w-fit p-[15px] space-y-2.5 ${margin} 
                ${message.userId === currentUser?.userId
                    ? "bg-dark-300 ml-auto"
                    : "bg-primary-300 mr-auto"}`
            }
        >
            <p className="text-body-medium text-light-100">{message.body}</p>
            <small className="text-body-tiny font-bold text-dark-200">
                {formatTime(message.createdAt.toDate().toISOString())}
            </small>
        </div>
    ) : (
        <>
            {message.userId !== currentUser?.userId && (
                <div
                    ref={messageRef}
                    className={`max-w-[78%] w-fit mr-auto space-y-2.5 ${margin}`}
                >
                    <div className="max-w-full w-fit p-[15px] mr-auto bg-dark-400 border border-dark-300 space-y-5">
                        <p className="text-body-medium text-light-100">{message.body}</p>
                        {activeTask?.status === "COMPLETED" ? (
                            message.metadata?.responded ? (
                                <p className="text-body-medium text-light-100">You've responded!</p>
                            ) : (
                                <p className="text-body-medium text-light-100">
                                    Can't respond. Task already completed.
                                </p>
                            )
                        ) : message.metadata?.responded ? (
                            <p className="text-body-medium text-light-100">You've responded!</p>
                        ) : (
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
                        )}
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
                <div
                    ref={messageRef}
                    className={`max-w-[78%] w-fit p-2.5 ml-auto bg-dark-400 border flex items-center gap-2.5 ${margin} 
                        ${message.metadata?.reason === "ACCEPTED" ? "border-indicator-100" : "border-indicator-500"}`
                    }
                >
                    {message.metadata?.reason === "ACCEPTED" ? (
                        <FiCheckCircle className="text-2xl text-indicator-100" />
                    ) : (
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
"use client";
import { CommentDto, CommentType } from "@/app/models/comment.model";
import { useRef, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import Image from "next/image";

const ConversationView = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [comments] = useState<CommentDto[]>(sampleComments);

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        textarea.style.height = 'auto';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    };

    return (
        <>
            <div className={`grow px-5 my-[30px] overflow-y-auto ${comments.length < 1 ? "grid place-content-center" : ""}`}>
                {comments.length < 1 ? (
                    <div className="space-y-2.5 text-center">
                        <Image 
                            src="/mdi_greeting.png" 
                            alt="" 
                            width={24}
                            height={24}
                            className="mx-auto"
                        />
                        <h6 className="text-body-large text-light-100">Say “Hi” to the contributor</h6>
                        <p className="text-body-tiny text-dark-100">
                            Send your first message and the developer will get 
                            <br /> it via email even while offline.
                        </p>
                    </div>
                ) : (
                    <>
                    <div className="w-fit px-[15px] py-[3px] my-5 mx-auto border border-primary-200 text-body-medium text-light-200">
                        Monday - 02/05/2025
                    </div>
                    {comments.map((comment) => (
                        <div 
                            key={comment.id} 
                            className={`max-w-[78%] p-[15px] space-y-2.5 mb-[30px]
                                ${comment.type === CommentType.TIMELINE_MODIFICATION 
                                    ? "bg-primary-300 float-left" 
                                    : "bg-dark-300 float-right"}`
                            }
                        >
                            <p className="text-body-medium text-light-100">{comment.message}</p>
                            <small className="text-body-tiny font-bold text-dark-200">3:45 PM</small>
                        </div>
                    ))}
                    </>
                )}
            </div>
            <div className="w-full px-5 mb-[30px]">
                <div className="py-[15px] pl-5 pr-2.5 border border-dark-100 space-y-5">
                    <textarea 
                        ref={textareaRef}
                        onInput={adjustHeight}
                        placeholder="Write message to send to developer..."
                        className="w-full resize-none text-light-100 min-h-[20px]"
                    />
                    <div className="flex items-center justify-between">
                        <button 
                            className="flex items-center gap-[5px] text-primary-100 text-button-large font-extrabold hover:text-light-100"
                            onClick={() => {}}
                        >
                            <span>Upload File</span>
                            <HiPlus className="text-2xl" />
                        </button>
                        <button 
                            className="h-[30px] w-[30px] text-dark-500 bg-primary-400 hover:bg-light-100 grid place-items-center"
                            onClick={() => {}}
                        >
                            <FiArrowUp className="text-2xl" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default ConversationView;

export const sampleComments: CommentDto[] = [
    {
        id: "40",
        userId: "user2",
        taskId: "task1",
        type: CommentType.TIMELINE_MODIFICATION,
        message: "Looking at the scope, we might need to adjust the timeline. What do you think about extending it by 2 weeks?",
        metadata: {
            requestedTimeline: 14,
            newTimeline: 28
        },
        attachments: [],
        createdAt: "2024-05-07T10:15:00Z",
        updatedAt: "2024-05-07T10:15:00Z"
    },
    {
        id: "1",
        userId: "user1",
        taskId: "task1",
        type: CommentType.GENERAL,
        message: "Hi! I'm interested in working on this task. I have experience with similar implementations.",
        attachments: [],
        createdAt: "2024-05-07T09:30:00Z",
        updatedAt: "2024-05-07T09:30:00Z"
    },
    {
        id: "2",
        userId: "user2",
        taskId: "task1",
        type: CommentType.GENERAL,
        message: "Great! Can you share some examples of your previous work?",
        attachments: [],
        createdAt: "2024-05-07T09:45:00Z",
        updatedAt: "2024-05-07T09:45:00Z"
    },
    {
        id: "3",
        userId: "user1",
        taskId: "task1",
        type: CommentType.GENERAL,
        message: "Sure! Here's a link to my portfolio and some relevant projects I've worked on.",
        attachments: ["portfolio.pdf"],
        createdAt: "2024-05-07T10:00:00Z",
        updatedAt: "2024-05-07T10:00:00Z"
    },
    {
        id: "4",
        userId: "user2",
        taskId: "task1",
        type: CommentType.TIMELINE_MODIFICATION,
        message: "Looking at the scope, we might need to adjust the timeline. What do you think about extending it by 2 weeks?",
        metadata: {
            requestedTimeline: 14,
            newTimeline: 28
        },
        attachments: [],
        createdAt: "2024-05-07T10:15:00Z",
        updatedAt: "2024-05-07T10:15:00Z"
    },
    {
        id: "5",
        userId: "user1",
        taskId: "task1",
        type: CommentType.GENERAL,
        message: "That sounds reasonable. I can provide detailed progress updates every 3 days to ensure we stay on track.",
        attachments: [],
        createdAt: "2024-05-07T10:30:00Z",
        updatedAt: "2024-05-07T10:30:00Z"
    }
];
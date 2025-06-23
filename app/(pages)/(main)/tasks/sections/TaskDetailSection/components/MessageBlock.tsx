import ButtonPrimary from "@/app/components/ButtonPrimary";
import { MessageDto, MessageType } from "@/app/models/message.model";
import useUserStore from "@/app/state-management/useUserStore";
import { formatTime } from "@/app/utils/helper";
import { FiCheckCircle } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

type MessageBlockProps = {
    message: MessageDto;
    largeMargin: boolean;
}

const MessageBlock = ({ message, largeMargin }: MessageBlockProps) => {
    const { currentUser } = useUserStore();

    return message.type === MessageType.GENERAL ? (
        <div className={`max-w-[78%] p-[15px] space-y-2.5 ${largeMargin ? "mb-[30px]" : "mb-2.5"} 
            ${message.userId !== currentUser?.userId 
                ? "bg-primary-300 float-left" 
                : "bg-dark-300 float-right"}`
        }>
            <p className="text-body-medium text-light-100">{message.body}</p>
            <small className="text-body-tiny font-bold text-dark-200">
                {formatTime(message.createdAt.toDate().toISOString())}
            </small>
        </div>
    ):(
        <>
            {message.userId !== currentUser?.userId && (
                <div className={`max-w-[78%] float-left space-y-2.5 ${largeMargin ? "mb-[30px]" : "mb-2.5"}`}>
                    {message.metadata?.reason && (
                        <div className="max-w-full p-[15px] space-y-2.5 bg-primary-300">
                            <p className="text-body-medium text-light-100">{message.metadata?.reason}</p>
                            <small className="text-body-tiny font-bold text-dark-200">
                                {formatTime(message.createdAt.toDate().toISOString())}
                            </small>
                        </div>
                    )}
                    <div className="max-w-full p-[15px] bg-dark-400 border border-dark-300 space-y-5">
                        <p className="text-body-medium text-light-100">{message.body}</p>
                        <div className="flex gap-2.5">
                            <ButtonPrimary
                                format="OUTLINE"
                                text="Reject"
                                attributes={{
                                    onClick: () => {},
                                }}
                            />
                            <ButtonPrimary
                                format="SOLID"
                                text="Approve"
                                attributes={{
                                    onClick: () => {},
                                }}
                            />
                        </div>
                        {!message.metadata?.reason && (
                            <small className="text-body-tiny font-bold text-dark-200">
                                {formatTime(message.createdAt.toDate().toISOString())}
                            </small>
                        )}
                    </div>
                </div>
            )}
            {message.userId === currentUser?.userId && (
                <div className={`max-w-[78%] p-2.5 bg-dark-400 border flex items-center gap-2.5 ${largeMargin ? "mb-[30px]" : "mb-2.5"} 
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
        </>
    );
}
 
export default MessageBlock;
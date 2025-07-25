"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import MoneyInput from "@/app/components/Input/MoneyInput";
import PopupModalLayout from "@/app/components/PopupModalLayout";
import { useContext, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { ActiveTaskContext } from "../page";
import Image from "next/image";
import { TaskAPI } from "@/app/services/task.service";
import { handleApiError } from "@/app/utils/helper";
import { toast } from "react-toastify";

type SetTaskBountyModalProps = {
    toggleModal: () => void;
};

const SetTaskBountyModal = ({ toggleModal }: SetTaskBountyModalProps) => {
    const { activeTask, setActiveTask } = useContext(ActiveTaskContext);
    const [newBounty, setNewBounty] = useState("");
    const [loading, setLoading] = useState(false);
    
    const updateBounty = async () => {
        setLoading(true);

        try {
            const response = await TaskAPI.updateTaskBounty(
                activeTask!.id, { newBounty }
            );
            
            toast.success("Bounty updated successfully.");
            if (response && "bounty" in response) {
                setActiveTask({ ...activeTask!, ...response });
            }
            if (response && "message" in response) {
                setActiveTask({ ...activeTask!, ...response.task });
                toast.warn(response.message);
            }
            toggleModal();
        } catch (error) {
            handleApiError(error, "Failed to update task bounty.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <PopupModalLayout title="Set Task Bounty" toggleModal={toggleModal}>
            <p className="mt-2.5 text-body-medium text-dark-100">
                Set bounty for this task (issue) for contributors to take on. 
                Reload the GitHub issue URL to see bounty update.
            </p>
            <div className="w-full p-[15px] border border-primary-200 bg-dark-400 flex items-start gap-2.5 mt-5 mb-2.5">
                <p className="text-body-tiny tracking-[-3%] text-primary-100" style={{ lineHeight: "20px" }}>
                    #{activeTask?.issue.number}
                </p>
                <p className="text-body-medium font-bold text-light-100 line-clamp-2">
                    {activeTask?.issue.title}
                </p>
            </div>
            <div className="relative">
                <Image 
                    src="/usdc.svg" 
                    alt="$" 
                    width={16}
                    height={16}
                    className="absolute top-1/2 -translate-y-1/2 left-2.5" 
                />
                <MoneyInput 
                    attributes={{
                        id: "bounty",
                        name: "bounty",
                        placeholder: "0.00",
                        className: "w-full p-2.5 pl-[42px] bg-dark-400 border border-dark-100 text-body-small text-light-100",
                        value: newBounty,
                        disabled: loading,
                    }}
                    defaultValue={activeTask?.bounty}
                    setValue={(value) => setNewBounty(value)}
                />
            </div>
            <ButtonPrimary
                format="SOLID"
                text={loading ? "Updating..." : "Update Bounty"}
                sideItem={<FiArrowRight />}
                attributes={{
                    onClick: updateBounty,
                    disabled: Boolean(newBounty === activeTask?.bounty.toString() || !newBounty.trim()) || loading,
                }}
                extendedClassName="w-fit mt-5"
            />
        </PopupModalLayout>
    );
}
 
export default SetTaskBountyModal;
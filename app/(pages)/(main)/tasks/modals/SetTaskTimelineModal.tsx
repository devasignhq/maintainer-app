"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import RegularDropdown from "@/app/components/Dropdown/Regular";
import PopupModalLayout from "@/app/components/PopupModalLayout";
import { FiArrowRight } from "react-icons/fi";

type SetTaskTimelineModalProps = {
    toggleModal: () => void;
};

const SetTaskTimelineModal = ({ toggleModal }: SetTaskTimelineModalProps) => {
    
    return (
        <PopupModalLayout title="Set Task Timeline" toggleModal={toggleModal}>
            <p className="mt-2.5 text-body-medium text-dark-100">
                Set completion timeline for this task (issue). You cannot update the 
                timeline once the task has been delegated to a contributor.
            </p>
            <div className="w-full p-[15px] border border-primary-200 bg-dark-400 flex items-start gap-2.5 my-5">
                <p className="text-body-tiny tracking-[-3%] text-primary-100" style={{ lineHeight: "20px" }}>#0032</p>
                <p className="text-body-medium font-bold text-light-100">
                    Remove hardcoded model name check and replace with configurable param
                </p>
            </div>
            <div className="w-full flex gap-2.5">
                <input
                    type="number"
                    placeholder="0"
                    className="grow py-2.5 px-[15px] bg-dark-400 border border-dark-200 text-body-medium text-light-100"
                />
                <RegularDropdown
                    defaultValue="Weeks"
                    options={["Weeks", "Days"]}
                    extendedContainerClassName="h-full"
                    extendedButtonClassName="h-full text-body-medium text-light-100"
                />
            </div>
            <ButtonPrimary
                format="SOLID"
                text="Update Timeline"
                sideItem={<FiArrowRight />}
                attributes={{
                    onClick: () => {},
                }}
                extendedClassName="w-fit mt-5"
            />
        </PopupModalLayout>
    );
}
 
export default SetTaskTimelineModal;
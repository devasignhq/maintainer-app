"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import InputField from "@/app/components/InputField";
import PopupModalLayout from "@/app/components/PopupModalLayout";
import { FiArrowRight } from "react-icons/fi";

type SetTaskBountyModalProps = {
    toggleModal: () => void;
};

// TODO: Integrate money input

const SetTaskBountyModal = ({ toggleModal }: SetTaskBountyModalProps) => {
    
    return (
        <PopupModalLayout title="Set Task Bounty" toggleModal={toggleModal}>
            <p className="mt-2.5 text-body-medium text-dark-100">
                Set bounty for this task (issue) for contributors to take on. 
                Reload the GitHub issue URL to see bounty update.
            </p>
            <div className="w-full p-[15px] border border-primary-200 bg-dark-400 flex items-start gap-2.5 mt-5 mb-2.5">
                <p className="text-body-tiny tracking-[-3%] text-primary-100" style={{ lineHeight: "20px" }}>#0032</p>
                <p className="text-body-medium font-bold text-light-100">
                    Remove hardcoded model name check and replace with configurable param
                </p>
            </div>
            <InputField 
                imageSrc="/usdc.svg"
                imageAlt="$"
                attributes={{
                    placeholder: "Enter value",
                    name: "",
                    defaultValue: "123"
                }}
                extendedContainerClassName=""
            />
            <ButtonPrimary
                format="SOLID"
                text="Update Bounty"
                sideItem={<FiArrowRight />}
                attributes={{
                    onClick: () => {},
                }}
                extendedClassName="w-fit mt-5"
            />
        </PopupModalLayout>
    );
}
 
export default SetTaskBountyModal;
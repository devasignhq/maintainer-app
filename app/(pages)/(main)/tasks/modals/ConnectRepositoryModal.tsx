"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import InputField from "@/app/components/InputField";
import PopupModalLayout from "@/app/components/PopupModalLayout";
import { FaGithub } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";

type ConnectRepositoryModalProps = {
    toggleModal: () => void;
};

const ConnectRepositoryModal = ({ toggleModal }: ConnectRepositoryModalProps) => {
    
    return (
        <PopupModalLayout title="Connect Project Repository" toggleModal={toggleModal}>
            <p className="mt-2.5 text-body-medium text-dark-100">
                Enter your project GitHub public repository URL to import your project tasks (issues). 
                After importing, you can add bounties and manage contributor payouts seamlessly.
            </p>
            <InputField 
                Icon={FaGithub}
                attributes={{
                    placeholder: "Project GitHub repository URL",
                    name: "",
                }}
                extendedContainerClassName="my-[30px]"
            />
            <ButtonPrimary
                format="SOLID"
                text="Let's Go!"
                sideItem={<FiArrowUpRight />}
                attributes={{
                    onClick: () => {},
                }}
                extendedClassName="w-fit"
            />
        </PopupModalLayout>
    );
}
 
export default ConnectRepositoryModal;
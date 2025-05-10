"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import { useToggle } from "ahooks";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import EditProjectModal from "./modals/EditProjectModal";

const General = () => {
    const [openEditProjectModal, { toggle: toggleEditProjectModal }] = useToggle(false);
    
    return (
        <section className="grow">
            <section className="w-full p-[30px] space-y-[30px] border-b border-dark-200">
                <div className="flex items-center justify-between">
                    <h5 className="text-headline-small text-light-100">Manage Project</h5>
                    <button 
                        className="group flex items-center gap-[5px] text-primary-100 text-button-large font-extrabold"
                        onClick={toggleEditProjectModal}
                    >
                        <span className="group-hover:text-light-100">Edit Project</span>
                        <FiEdit3 className="text-2xl" />
                    </button>
                </div>
                <div className="space-y-[5px] text-body-medium">
                    <h6 className="font-bold text-dark-100">Name</h6>
                    <p className="text-light-100">Browser Use</p>
                </div>
                <div className="space-y-[5px] text-body-medium">
                    <h6 className="font-bold text-dark-100">Description</h6>
                    <p className="text-light-100">
                        We make websites accessible for AI agents by extracting all interactive 
                        elements, so agents can focus on what makes their beer taste better.
                    </p>
                </div>
            </section>
            <section className="w-full p-[30px] space-y-[30px]">
                <div className="space-y-2.5">
                    <h5 className="text-headline-small text-light-100">Delete Project</h5>
                    <p className="text-body-medium text-dark-100">
                        By deleting your project, you’ll no longer be able to create or access 
                        any of your bounties. Ensure to withdraw all the money in your wallet 
                        before deleting your project else it’ll be lost forever.
                    </p>
                </div>
                <ButtonPrimary
                    format="OUTLINE"
                    text="Delete Project"
                    sideItem={<MdOutlineCancel />}
                    attributes={{
                        onClick: () => {},
                    }}
                    extendedClassName="border-indicator-500 text-indicator-500"
                />
            </section>
            {openEditProjectModal && <EditProjectModal toggleModal={toggleEditProjectModal} />}
        </section>
    );
}
 
export default General;
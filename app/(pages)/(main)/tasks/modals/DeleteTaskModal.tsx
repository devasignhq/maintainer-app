"use client";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import PopupModalLayout from "@/app/components/PopupModalLayout";
import { FaRegTrashAlt } from "react-icons/fa";

type DeleteTaskModalProps = {
    toggleModal: () => void;
};

const DeleteTaskModal = ({ toggleModal }: DeleteTaskModalProps) => {
    
    return (
        <PopupModalLayout title="Delete Task" toggleModal={toggleModal}>
            <p className="mt-2.5 text-body-medium text-dark-100">
                By deleting this task, the assigned bounty will be removed from the corresponding GitHub Issue.
            </p>
            <div className="w-full p-[15px] border border-dark-200 flex items-start gap-2.5 my-5">
                <p className="text-body-tiny tracking-[-3%] text-primary-100" style={{ lineHeight: "20px" }}>#0032</p>
                <div className="py-0.5 px-[7px] bg-primary-300 text-body-tiny font-bold text-light-200">bug</div>
                <p className="grow text-body-medium font-bold text-light-100 line-clamp-2">
                    Remove hardcoded model name check and replace with configurable param
                </p>
                <p className="text-body-tiny font-bold tracking-[-3%] text-primary-100" style={{ lineHeight: "20px" }}>300 USDC</p>
            </div>
            <div className="flex gap-2.5">
                <ButtonPrimary
                    format="OUTLINE"
                    text="Cancel"
                    attributes={{
                        onClick: () => {},
                    }}
                />
                <ButtonPrimary
                    format="SOLID"
                    text="Delete"
                    sideItem={<FaRegTrashAlt />}
                    attributes={{
                        onClick: () => {},
                    }}
                    extendedSideItemClassName="text-xl"
                />
            </div>
        </PopupModalLayout>
    );
}
 
export default DeleteTaskModal;
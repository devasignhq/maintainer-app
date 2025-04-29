"use client";
import { FiSearch, FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import ButtonPrimary from "../ButtonPrimary";
import PopupModalLayout from "../PopupModalLayout";
import FilterDropdown from "../Dropdown/Filter";
import CreateTaskCard from "./CreateTaskCard";

type ImportTaskModalProps = {
    toggleModal: () => void;
};

const ImportTaskModal = ({ toggleModal }: ImportTaskModalProps) => {
    return (
        <PopupModalLayout title="Import from GitHub Issues" toggleModal={toggleModal}>
            <p className="text-body-medium">
                <span className="text-light-200">Repository URL:{" "}</span>
                <span className="text-dark-100">https://github.com/browser-use/browser-use/</span>
            </p>
            <section className="my-[30px] flex items-center gap-2.5">
                <div className="h-full w-full relative">
                    <FiSearch className="text-xl text-light-100 absolute top-1/2 -translate-y-1/2 left-2.5" />
                    <input
                        type="text"
                        placeholder="Search Issues"
                        className="w-full h-full p-2.5 pl-[42px] bg-dark-400 border border-dark-100 text-body-small text-light-100"
                    />
                </div>
                <FilterDropdown 
                    title="Labels"
                    options={["bug", "feature", "enhancement", "question"]}
                />
                <ButtonPrimary
                    format="SOLID"
                    text="Update Repo"
                    sideItem={<FiArrowUpRight />}
                    attributes={{
                        onClick: () => {},
                    }}
                    extendedClassName="h-full bg-light-200 hover:bg-light-100"
                />
            </section>
            <section className="flex items-end justify-between">
                <div>
                    <p className="flex items-center gap-[5px] text-title-large text-light-100">
                        <span>Issues Found</span>
                        <span className="px-[5px] text-body-medium font-bold text-dark-500 bg-primary-100">14</span>
                    </p>
                    <p className="text-body-medium text-dark-200 mt-[5px]">
                        Select issues you’d like to import and add bounties to.
                    </p>
                </div>
                <button 
                    className="text-body-medium text-light-200 font-bold hover:text-light-100"
                    onClick={() => {}}
                >
                    Clear Selection
                </button>
            </section>
            <section className="grow my-[30px] flex flex-col gap-2.5 overflow-y-auto">
                <CreateTaskCard active />
                <CreateTaskCard />
                <CreateTaskCard active />
                <CreateTaskCard active />
                <CreateTaskCard />
                <CreateTaskCard />
                <CreateTaskCard />
            </section>
            <section className="flex gap-2.5">
                <ButtonPrimary
                    format="SOLID"
                    text="Proceed"
                    sideItem={<FiArrowRight />}
                    attributes={{
                        onClick: () => {},
                    }}
                />
                <ButtonPrimary
                    format="OUTLINE"
                    text="Save Draft"
                    attributes={{
                        onClick: () => {},
                    }}
                />
            </section>
        </PopupModalLayout>
    );
}
 
export default ImportTaskModal;
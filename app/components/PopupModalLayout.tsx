"use client";
import { IoMdClose } from "react-icons/io";

const PopupModalLayout = ({
    children,
    title,
    toggleModal,
}: Readonly<{
    children: React.ReactNode;
    title?: string;
    toggleModal: () => void;
}>) => {
    return (
        <div className="fixed inset-0 z-[99999] bg-[#0000004D] grid place-content-center backdrop-blur-[14px]">
            <div className="w-[820px] max-h-[92dvh] p-10 pt-[30px] popup-modal relative bg-dark-500 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between">
                    <h2 className="text-display-small text-light-100">
                        {title}
                    </h2>
                    <button 
                        className="gradient-border-btn relative p-2.5 bg-dark-400 text-light-100 text-2xl"
                        onClick={toggleModal}
                    >
                        <IoMdClose />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
 
export default PopupModalLayout;
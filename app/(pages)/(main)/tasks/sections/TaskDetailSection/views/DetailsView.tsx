"use client";
import Link from "next/link";

const DetailsView = () => {
    return (
        <>
            <h6 className="px-5 my-10 text-headline-small text-light-100">
                Remove hardcoded model name check and replace with configurable param
            </h6>
            <div className="px-5 text-body-medium space-y-2.5 mb-[30px]">
                <p className="font-bold text-dark-100">Issue URL</p>
                <Link href={""} className="text-light-100">
                    https://github.com/browser-use/browser-use/pull/1053
                </Link>
            </div>
            <div className="text-body-medium space-y-2.5">
                <p className="px-5 font-bold text-dark-100">Task Description</p>
                <div className="px-5 overflow-y-auto"></div>
            </div>
        </>
    );
}
 
export default DetailsView;
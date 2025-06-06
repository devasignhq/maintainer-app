/* eslint-disable @next/next/no-img-element */
"use client";
import { HiOutlineSelector, HiPlus } from "react-icons/hi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/app/utils/data";
import ButtonPrimary from "@/app/components/ButtonPrimary";
import { FaCheck } from "react-icons/fa6";
import { usePopup } from "@/app/utils/hooks";
import useProjectStore from "@/app/state-management/useProjectStore";
import { ProjectAPI } from "@/app/services/project.service";
import { useRequest, useLockFn } from "ahooks";
import { TbLogout } from "react-icons/tb";
import { useLogoutUser } from "@/lib/firebase";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const currentPath = usePathname();
    const checkPath = (path: string) => currentPath.includes(path) || currentPath === path;
    const { menuButtonRef, menuRef, openMenu, toggleMenu } = usePopup();
    const { 
        projectList, 
        activeProject,
        setProjectList,
        setActiveProject
    } = useProjectStore();
    const logoutUser = useLogoutUser();

    const { loading: fetchingProjects } = useRequest(
        useLockFn(() => ProjectAPI.getProjects()), 
        {
            retryCount: 2,
            cacheKey: "project-list",
            onSuccess: (response) => {
                if (response) {
                    setProjectList(response.data);
                    if (!activeProject) setActiveProject(response.data[0]);
                }
            },
            onError: () => {}
        }
    );

    return (
        <main className="h-full w-full px-[6.75%] flex flex-col">
            <section className="pt-5 flex items-center justify-between">
                <img src="/davasign-logo.svg" alt="DevAsign" className="h-auto w-auto" />
                <div className="flex items-center gap-2.5">
                    <div className="relative">
                        <div className="flex items-center gap-2.5 text-light-100">
                            <span className="flex items-center gap-[15px] text-headline-small">
                                {activeProject?.name}
                            </span>
                            <div className="px-2.5 py-[7px] bg-dark-300 text-table-header">
                                {activeProject?.subscriptionPackage?.name}
                            </div>
                            <button 
                                ref={menuButtonRef}
                                onClick={toggleMenu}
                            >
                                <HiOutlineSelector className="text-2xl text-[#BCBCBC]" />
                            </button>
                        </div>
                        {openMenu && (
                            <div 
                                ref={menuRef}
                                className="absolute -left-6 top-[calc(100%+20px)] z-10 w-[250px] p-[15px] 
                                    bg-dark-400 border border-dark-200 shadow-[-20px_4px_40px_0px_#000000]"
                            >
                                <div className="w-full flex flex-col gap-2.5">
                                    {fetchingProjects ? (
                                        <>
                                            {[...Array(3)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="h-8 w-full bg-dark-300 rounded animate-pulse"
                                                />
                                            ))}
                                        </>
                                    ) : (
                                        projectList.map((project) => {
                                            return activeProject?.id === project.id ? (
                                                <button
                                                    key={project.id}
                                                    className="pb-2.5 flex items-center justify-between gap-2.5 border-b border-dark-200"
                                                >
                                                    <div className="flex items-center gap-2.5">
                                                        <p className="text-body-medium text-light-100">{project.name}</p>
                                                        <div className={`px-2.5 py-[7px] text-body-small 
                                                            ${project.subscriptionPackage?.price === 0 
                                                                ? "text-light-100 bg-dark-300" 
                                                                : "text-dark-500 bg-primary-100"}` 
                                                        }>
                                                            {project.subscriptionPackage?.name}
                                                        </div>
                                                    </div>
                                                    <FaCheck className="text-xl text-light-100" />
                                                </button>
                                            ) : (
                                                <button
                                                    key={project.name}
                                                    className="group flex items-center justify-between gap-2.5"
                                                    onClick={() => setActiveProject(project)}
                                                >
                                                    <p className="text-body-medium text-dark-100 group-hover:text-light-100">{project.name}</p>
                                                    <div className={`px-2.5 py-[7px] text-body-small 
                                                        ${project.subscriptionPackage?.price === 0 
                                                        ? "text-light-100 bg-dark-300" 
                                                        : "text-dark-500 bg-primary-100"}` 
                                                    }>
                                                        {project.subscriptionPackage?.name}
                                                    </div>
                                                </button>
                                            )
                                        })
                                    )}
                                </div>
                                <Link href={ROUTES.SETUP_PROJECT}>
                                    <ButtonPrimary
                                        format="OUTLINE"
                                        text="New Project"
                                        sideItem={<HiPlus />}
                                        attributes={{ type: "button" }}
                                        extendedClassName="w-full mt-[30px]"
                                    />
                                </Link>
                            </div>
                        )}
                    </div>
                    <button title="Logout" onClick={logoutUser}>
                        <TbLogout className="text-2xl text-light-100 hover:text-light-200" />
                    </button>
                </div>
            </section>
            {!currentPath.includes(ROUTES.ONBOARDING) && (
                <nav className="w-full flex items-center gap-[15px] border-b border-dark-200 text-title-large text-dark-200 mt-[15px]">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`px-[5px] py-[20px] 
                                ${checkPath(item.alias || item.path) 
                                    ? "text-light-100 border-b border-light-100" 
                                    : "hover:text-[#F0C298]"}`
                            }
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            )}
              
            {children}
        </main>
    );
}

const navItems = [
    // { name: "Overview", path: ROUTES.OVERVIEW },
    { name: "Tasks", path: ROUTES.TASKS },
    { name: "Wallet", path: ROUTES.WALLET },
    // { name: "Contributors", path: ROUTES.CONTRIBUTORS },
    { name: "Settings", alias: "/settings", path: ROUTES.SETTINGS.GENERAL },
];

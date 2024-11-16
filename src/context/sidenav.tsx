"use client"

import { createContext, Dispatch, ReactElement, SetStateAction, useContext, useState } from "react";

export type TypeSidebarOpenContext = {
    sidebarOpen: boolean,
    setSidebarOpen: Dispatch<SetStateAction<boolean>>
}

export const SidebarOpen = createContext<TypeSidebarOpenContext | undefined>(undefined);


export const SidebarOpenContext = ({ children }: { children: ReactElement }) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    return (
        <SidebarOpen.Provider value={{ sidebarOpen, setSidebarOpen }}>
            {children}
        </SidebarOpen.Provider>
    )
}

export const useSidebarOpenContext = () => {
    const context = useContext(SidebarOpen);
    if (!context) {
        throw new Error("useSidebarOpenContext must be used within SidebarOpenContext");
    }

    return context;
}
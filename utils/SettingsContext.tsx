import {createContext, ReactNode, useState} from "react";

interface SettingsContextType {
    isList: boolean;
    changeViewType: () => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export default function SettingsContextProvider({children}: { children: ReactNode }) {
    const [isTeamsViewList, setIsTeamsViewList] = useState(true);

    function changeTeamsViewType() {
        setIsTeamsViewList((list) => !list);
    }

    const value = {
        isList: isTeamsViewList,
        changeViewType: changeTeamsViewType,
    }

    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}
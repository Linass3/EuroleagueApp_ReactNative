import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";

interface SettingsContextType {
    isTeamsViewList: boolean;
    setIsTeamsViewList: Dispatch<SetStateAction<boolean>>
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

function useSettings(): SettingsContextType {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within SettingsContextProvider');
    }

    return context;
}

function SettingsProvider(props: { children: ReactNode }) {
    const [isTeamsViewList, setIsTeamsViewList] = useState<boolean>(false);

    return <SettingsContext.Provider {...props} value={{isTeamsViewList, setIsTeamsViewList}}/>
}

export {SettingsProvider, useSettings};

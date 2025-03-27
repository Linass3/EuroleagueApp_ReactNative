import {createContext, useContext, useState} from "react";

interface UpdateTimes {
    teamUpdateInterval: number;
    gameUpdateInterval: number;
    playerUpdateInterval: number;
    teamLastUpdateTime: Date;
    gameLastUpdateTime: Date;
    playerLastUpdateTime: Date;
    setLastUpdateTime: (object: 'team' | 'games' | 'players', lastUpdateTime: Date) => void;
}

export const UpdateTimesContext = createContext<UpdateTimes | undefined>(undefined);

function UpdateTimesContextProvider({children}: { children: React.ReactNode }) {
    const [teamLastUpdateTime, setTeamLastUpdateTime] = useState<Date>(new Date());
    const [gameLastUpdateTime, setGameLastUpdateTime] = useState<Date>(new Date());
    const [playerLastUpdateTime, setPlayerLastUpdateTime] = useState<Date>(new Date());

    function setLastUpdateTime(object: 'team' | 'games' | 'players', value: Date) {
        if (object === 'team') {
            setTeamLastUpdateTime(value);
        } else if (object === 'games') {
            setGameLastUpdateTime(value);
        } else if (object === 'players') {
            setPlayerLastUpdateTime(value);
        }
    }

    const value: UpdateTimes = {
        teamUpdateInterval: 10,
        gameUpdateInterval: 11,
        playerUpdateInterval: 12,
        teamLastUpdateTime: teamLastUpdateTime,
        gameLastUpdateTime: gameLastUpdateTime,
        playerLastUpdateTime: playerLastUpdateTime,
        setLastUpdateTime: setLastUpdateTime
    }

    return (
        <UpdateTimesContext.Provider value={value}>{children}</UpdateTimesContext.Provider>
    )
}

export function useUpdateTimesContext() {
    const context = useContext(UpdateTimesContext);
    if (context === undefined) {
        throw new Error("useUpdateTimesContext must be within provider");
    }

    return context;
}

export default UpdateTimesContextProvider;
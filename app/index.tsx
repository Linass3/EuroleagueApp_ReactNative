import {ActivityIndicator, FlatList} from "react-native";
import {fetchTeams} from "@/services/api";
import {useCallback, useContext, useState} from "react";
import TeamCard from "@/components/TeamCard";
import {getObject, storeObject} from "@/utils/AsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SettingsContext} from "@/utils/SettingsContext";
import {useFocusEffect} from "expo-router";
import {useUpdateTimesContext} from "@/utils/UpdateTimesContext";
import {getTeams} from "@/utils/FetchUtility";

export default function index() {
    const settingContext = useContext(SettingsContext);
    const [fetchedTeams, setFetchedTeams] = useState<Team[] | undefined>(undefined);
    const updateTimesContext = useUpdateTimesContext();

    // useEffect(() => {
    //     async function getTeams() {
    //
    //         const timeSinceLastUpdate = (new Date().getTime() - updateTimesContext.teamLastUpdateTime.getTime()) / 1000;
    //         console.log(timeSinceLastUpdate);
    //         await AsyncStorage.clear();
    //
    //         const savedTeams = await getObject('teams') as Team[];
    //         if (savedTeams) {
    //             setFetchedTeams(savedTeams);
    //             console.log('Got saved teams');
    //         } else {
    //             const teams = await fetchTeams();
    //             if (teams) {
    //                 await storeObject('teams', teams);
    //                 setFetchedTeams(teams)
    //                 console.log('Got fetched teams');
    //             }
    //         }
    //     }
    //
    //     getTeams()
    // });

    // useFocusEffect(
    //     useCallback(() => {
    //         const timeSinceLastUpdate = (new Date().getTime() - updateTimesContext.teamLastUpdateTime.getTime()) / 1000;
    //         console.log(timeSinceLastUpdate);
    //
    //         if (timeSinceLastUpdate > updateTimesContext.teamUpdateInterval) {
    //
    //         }
    //
    //
    //         return () => {
    //         }
    //     }, [])
    // );

    useFocusEffect(
        useCallback(() => {
            async function fetchAllData() {
                const timeSinceLastUpdate = (new Date().getTime() - updateTimesContext.teamLastUpdateTime.getTime()) / 1000;
                const shouldForceUpdate = (timeSinceLastUpdate > updateTimesContext.teamUpdateInterval);

                if (shouldForceUpdate) {
                    console.log('SHOULD FORCE UPDATE!');
                    updateTimesContext.setLastUpdateTime('team', new Date());
                    const teams = await getTeams(true);
                    setFetchedTeams(teams);
                } else if (!fetchedTeams) {
                    console.log('NO TEAMS, SHOULD UPDATE!');
                    const teams = await getTeams(false);
                    setFetchedTeams(teams);
                } else {
                    console.log(`No update needed! Teams found.`);
                }
            }

            fetchAllData();
        }, [updateTimesContext.teamLastUpdateTime])
    );

    if (!fetchedTeams) {
        return <ActivityIndicator size="large" color="#000000"/>
    }

    return (
        <FlatList
            data={fetchedTeams}
            renderItem={({item}) => (
                <TeamCard{...item} />
            )}
            keyExtractor={(item) => item.code}
        />
    );
}

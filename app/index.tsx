import {ActivityIndicator, FlatList, TouchableOpacity,} from "react-native";
import {fetchTeams} from "@/services/api";
import {useContext, useEffect, useLayoutEffect, useState} from "react";
import TeamCard from "@/components/TeamCard";
import {getObject, storeObject} from "@/utils/AsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SettingsContext} from "@/utils/SettingsContext";

export default function index() {
    const settingContext = useContext(SettingsContext);
    const [fetchedTeams, setFetchedTeams] = useState<Team[]>([]);

    useLayoutEffect(() => {
        
    }, []);

    useEffect(() => {
        async function getTeams() {
            await AsyncStorage.clear();

            const savedTeams = await getObject('teams') as Team[];
            if (savedTeams) {
                setFetchedTeams(savedTeams);
                console.log('Got saved teams');
            } else {
                const teams = await fetchTeams();
                if (teams) {
                    await storeObject('teams', teams);
                    setFetchedTeams(teams)
                    console.log('Got fetched teams');
                }
            }
        }

        getTeams()
    }, []);

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

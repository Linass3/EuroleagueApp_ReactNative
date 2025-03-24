import {ActivityIndicator, FlatList, TouchableOpacity,} from "react-native";
import {fetchTeams} from "@/services/api";
import {useEffect, useState} from "react";
import TeamCard from "@/components/TeamCard";
import {Link} from "expo-router";
import {getObject, storeObject} from "@/utils/AsyncStorage";

export default function index() {
    const [fetchedTeams, setFetchedTeams] = useState<Team[]>([]);

    useEffect(() => {
        async function getTeams() {
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

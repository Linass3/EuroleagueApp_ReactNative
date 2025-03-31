import {ActivityIndicator, FlatList, View} from "react-native";
import React, {useCallback, useState} from "react";
import TeamCard from "@/components/TeamCard";
import {useFocusEffect} from "expo-router";
import {getTeams} from "@/utils/FetchUtility";
import {useSettings} from "@/utils/SettingsContext";
import TeamCardGrid from "@/components/TeamCardGrid";

export default function index() {
    const [fetchedTeams, setFetchedTeams] = useState<Team[] | undefined>(undefined);
    const {isTeamsViewList} = useSettings();

    useFocusEffect(
        useCallback(() => {
            async function fetchAllData() {
                const teams = await getTeams(fetchedTeams === undefined);
                if (teams) {
                    setFetchedTeams(teams);
                }
            }

            fetchAllData();
        }, [])
    );

    if (!fetchedTeams) {
        return <ActivityIndicator size="large" color="#000000"/>
    }

    return (
        <View className="flex-1">
            <FlatList
                className="pb-96"
                data={fetchedTeams}
                renderItem={({item}) => (
                    isTeamsViewList ? (<TeamCard {...item} />) : (<TeamCardGrid {...item} />)
                )}
                keyExtractor={(item) => item.code}
                numColumns={isTeamsViewList ? 1 : 2}
                key={isTeamsViewList ? 'list' : 'grid'}
                columnWrapperStyle={
                    isTeamsViewList ? undefined :
                        {
                            justifyContent: "center",
                            gap: 1
                        }
                }
            />
        </View>
    );
}

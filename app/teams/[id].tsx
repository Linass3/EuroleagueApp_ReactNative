import {ActivityIndicator, View} from 'react-native'
import React, {useCallback, useState} from 'react'
import {useFocusEffect, useLocalSearchParams} from "expo-router";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import GameList from "@/components/GameList";
import PlayerList from "@/components/PlayerList";
import ImageCard from "@/components/ImageCard";
import {getGames, getPlayers, getSingleTeam} from "@/utils/FetchUtility";

const TeamDetailsView = () => {
    const {id} = useLocalSearchParams();
    const teamCode = Array.isArray(id) ? id[0] : id;

    const [selectedTeam, setSelectedTeam] = useState<Team>();
    const [fetchedGames, setFetchedGames] = useState<Game[] | undefined>(undefined);
    const [fetchedPlayers, setFetchedPlayers] = useState<Player[] | undefined>(undefined);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    useFocusEffect(
        useCallback(() => {
            async function fetchAllData() {
                const team = await getSingleTeam(!selectedTeam, teamCode);
                if (team) {
                    setSelectedTeam(team);
                }

                const games = await getGames(!fetchedGames, teamCode);
                if (games) {
                    setFetchedGames(games);
                }

                const players = await getPlayers(!fetchedPlayers, teamCode);
                if (players) {
                    setFetchedPlayers(players);
                }
            }

            fetchAllData();
        }, [])
    );


    return (
        selectedTeam && fetchedGames && fetchedPlayers ? (
            <>
                <ImageCard object={selectedTeam}/>

                <SegmentedControl
                    values={['Games', 'Players']}
                    selectedIndex={selectedTabIndex}
                    style={{
                        paddingHorizontal: 40,
                        marginVertical: 20
                    }}
                    onChange={(event) => {
                        setSelectedTabIndex(event.nativeEvent.selectedSegmentIndex);
                    }}
                />

                {
                    selectedTabIndex === 0
                        ? (<GameList fetchedGames={fetchedGames} selectedTeam={selectedTeam}/>)
                        : (<PlayerList fetchedPlayers={fetchedPlayers}/>)
                }
            </>
        ) : (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#000000"/>
            </View>)
    )
}
export default TeamDetailsView

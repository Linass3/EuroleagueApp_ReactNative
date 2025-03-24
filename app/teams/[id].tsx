import {View, Text, Image, ActivityIndicator, FlatList} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useLocalSearchParams, useRouter} from "expo-router";
import {fetchGames, fetchPlayers, fetchTeams} from "@/services/api";
import {LinearGradient} from "expo-linear-gradient";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import GameListRow from "@/components/GameListRow";
import PlayerListRow from "@/components/PlayerListRow";

const TeamDetailsView = () => {
    const {id} = useLocalSearchParams();
    const teamCode = Array.isArray(id) ? id[0] : id;

    const [fetchedGames, setFetchedGames] = useState<Game[]>([]);
    const [fetchedPlayers, setFetchedPlayers] = useState<Player[]>([]);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    useEffect(() => {
        async function getGamesAndPlayers() {
            const teams = await fetchGames(teamCode);
            setFetchedGames(teams);

            const players = await fetchPlayers(teamCode);
            setFetchedPlayers(players);
        }

        getGamesAndPlayers();
    }, []);

    if (!fetchedGames) {
        return <ActivityIndicator size="large" color="#000000"/>
    }

    return (
        <>
            <View className="w-full h-96 justify-end">
                <Image
                    source={{uri: 'https://media-cdn.incrowdsports.com/0aa09358-3847-4c4e-b228-3582ee4e536d.png'}}
                    className="w-full h-full"
                    resizeMode="contain"
                />
                <LinearGradient
                    colors={['transparent', 'black']}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 'auto',
                        height: 80,
                        alignItems: 'flex-end',
                    }}
                >
                    <Text
                        className="flex-1 text-white font-bold text-4xl mt-7 mr-5"
                        numberOfLines={1}
                    >
                        {id}
                    </Text>
                </LinearGradient>
            </View>

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
                selectedTabIndex === 0 ? (
                    <FlatList
                        data={fetchedGames.filter((game) => !game.played)}
                        renderItem={({item}) => (
                            <GameListRow game={item}/>
                        )}
                        ItemSeparatorComponent={() => (
                            <View className="w-full h-[0.5] bg-gray-400"/>
                        )}
                    />
                ) : (
                    <FlatList
                        data={fetchedPlayers}
                        renderItem={({item}) => (
                            <PlayerListRow player={item}/>
                        )}
                        ItemSeparatorComponent={() => (
                            <View className="w-full h-[0.5] bg-gray-400"/>
                        )}
                        keyExtractor={(item) => item.code}
                    />
                )
            }
        </>
    )
}
export default TeamDetailsView

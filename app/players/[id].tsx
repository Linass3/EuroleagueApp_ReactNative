import {View, Text, FlatList, ActivityIndicator} from 'react-native'
import React, {useCallback, useState} from 'react'
import {useFocusEffect, useLocalSearchParams} from "expo-router";
import PlayerDetailsListRow from "@/components/PlayerDetailsListRow";
import ImageCard from "@/components/ImageCard";
import {getSinglePlayer} from "@/utils/FetchUtility";

const PlayerDetailsView = () => {
    const {id, teamId} = useLocalSearchParams();
    const playerCode = Array.isArray(id) ? id[0] : id;
    const teamCode = Array.isArray(teamId) ? teamId[0] : teamId;
    const [fetchedPlayer, setFetchedPlayer] = useState<Player>();

    useFocusEffect(
        useCallback(() => {
            async function fetchAllData() {
                const player = await getSinglePlayer(fetchedPlayer === undefined, teamCode, playerCode);
                if (player) {
                    setFetchedPlayer(player);
                }
            }

            fetchAllData();
        }, [])
    );

    const playerDetails = [
        {
            attribute: 'Position',
            description: fetchedPlayer?.position,
        },
        {
            attribute: 'Jersey Number',
            description: fetchedPlayer?.dorsal,
        },
        {
            attribute: 'Country',
            description: fetchedPlayer?.country,
        },
        {
            attribute: 'Last Team',
            description: fetchedPlayer?.lastTeam,
        },
    ];

    return (
        fetchedPlayer ? (
            <>
                <ImageCard object={fetchedPlayer}/>

                <View className="flex-row h-20 bg-red-600 justify-between px-10 items-center">
                    <Text className="text-white text-xl font-semibold text-center">Age {"\n"}{fetchedPlayer.age}</Text>
                    <Text
                        className="text-white text-xl font-semibold text-center">Height {"\n"}{fetchedPlayer.height} cm</Text>
                    <Text
                        className="text-white text-xl font-semibold text-center">Weight {"\n"}{fetchedPlayer.weight} kg</Text>
                </View>

                <FlatList
                    data={playerDetails}
                    renderItem={({item}) => (
                        <PlayerDetailsListRow detail={item.attribute} value={item.description}/>
                    )}
                    ItemSeparatorComponent={() => (
                        <View className="w-full h-[1] bg-gray-400"/>
                    )}
                    scrollEnabled={false}
                />
            </>
        ) : (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#000000"/>
            </View>
        )
    )
}
export default PlayerDetailsView

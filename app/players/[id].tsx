import {View, Text, Image, FlatList} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useLocalSearchParams} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import PlayerDetailsListRow from "@/components/PlayerDetailsListRow";
import {getObject, storeObject} from "@/utils/AsyncStorage";
import {fetchPlayers} from "@/services/api";
import ImageCard from "@/components/ImageCard";
import ErrorView from "@/components/ErrorView";

const PlayerDetailsView = () => {
    const {id, teamId} = useLocalSearchParams();
    const playerCode = Array.isArray(id) ? id[0] : id;
    const teamCode = Array.isArray(teamId) ? teamId[0] : teamId;
    const [fetchedPlayer, setFetchedPlayer] = useState<Player>();

    useEffect(() => {
        async function getPlayer() {
            const savedPlayers = await getObject(`players-${teamCode}`) as Player[];
            if (savedPlayers) {
                const savedPlayer = savedPlayers.find((player) => player.code === playerCode)
                setFetchedPlayer(savedPlayer);
                console.log('Got saved player');
            }

            if (fetchedPlayer) {
                const players = await fetchPlayers(teamCode);
                await storeObject(`players-${teamCode}`, players);
                const player = players.find((player) => player.code === playerCode);
                setFetchedPlayer(player);
                console.log('Got fetched player and saved to storage');
            }
        }

        getPlayer();
    }, []);

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
            <ErrorView text={'Error: player could not be fetched!'}/>
        )
    )
}
export default PlayerDetailsView

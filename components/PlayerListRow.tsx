import {View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {Link} from "expo-router";

const PlayerListRow = ({player}: { player: Player }) => {
    return (
        <Link href={`/players/${player.code}?teamId=${player.teamCode}`} asChild>
            <TouchableOpacity className="w-full">
                <View className="flex-row w-full h-14 items-center">
                    <Image
                        source={player.image
                            ? {uri: player.image}
                            : require('../assets/images/stockPlayerImage.png')
                        }
                        className="rounded-full h-10 w-10 mx-5"
                        resizeMode="contain"
                    />

                    <Text className="font-semibold text-lg" numberOfLines={1}>{player.name}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    )
}
export default PlayerListRow

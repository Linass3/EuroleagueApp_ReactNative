import {View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {format} from "date-fns";
import {Link} from "expo-router";

const PlayerListRow = ({player}: { player: Player }) => {
    return (
        <Link href={`/players/${player.code}`} asChild>
            <TouchableOpacity className="w-full">
                <View className="flex-row w-full h-14 items-center">
                    <Image
                        source={{uri: player.image}}
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

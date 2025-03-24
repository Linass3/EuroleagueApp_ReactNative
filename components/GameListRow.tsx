import {View, Text} from 'react-native'
import React from 'react'
import {format} from "date-fns";

const GameListRow = ({ game }: { game: Game }) => {
    return (
        <View className="w-full h-16 ">
            <Text className="text-gray-600 text-sm ml-2">{format(new Date(game.date), 'MMM dd')}</Text>

            <View className="h-10 flex-row items-center">
                <Text className="w-[47%] text-center px-2">{game.team}</Text>
                <Text className="text-gray-600 text-sm text-center">VS</Text>
                <Text className="w-[47%] text-center px-2">{game.opponent}</Text>
            </View>
        </View>
    )
}
export default GameListRow

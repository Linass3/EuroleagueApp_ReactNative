import {View, Text} from 'react-native'
import React from 'react'

const PlayerDetailsListRow = ({detail, value}: { detail: string, value: string }) => {
    return (
        <View className="flex-row w-full h-16 bg-gray-200 items-center justify-between">
            <Text className="text-xl pl-5" numberOfLines={1}>{detail}</Text>
            <Text className=" text-xl text-gray-500 pr-5" numberOfLines={1}>{value}</Text>
        </View>
    )
}
export default PlayerDetailsListRow

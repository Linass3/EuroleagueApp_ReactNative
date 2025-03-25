import {View, Text} from 'react-native'
import React from 'react'

const ErrorView = ({text}: { text: string }) => {
    return (
        <View className="w-full h-full justify-center">
            <Text className="text-xl text-gray-500 font-semibold text-center">{text}</Text>
        </View>
    )
}
export default ErrorView

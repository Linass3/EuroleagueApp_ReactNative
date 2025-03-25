import {View, Text, Image} from 'react-native'
import React from 'react'
import {LinearGradient} from "expo-linear-gradient";

const ImageCard = ({object}: any) => {
    return (
        <View className="w-full h-96 justify-end">
            <Image
                source={object.image
                    ? {uri: object.image}
                    : require('../assets/images/stockPlayerImage.png')
                }
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
                    {object.name}
                </Text>
            </LinearGradient>
        </View>
    )
}
export default ImageCard

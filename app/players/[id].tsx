import {View, Text, Image, SectionList, FlatList} from 'react-native'
import React from 'react'
import {useLocalSearchParams} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import PlayerDetailsListRow from "@/components/PlayerDetailsListRow";

const PlayerDetailsView = () => {
    const {playerCode} = useLocalSearchParams();
    const playerDetails = [
        {
            attribute: 'Position',
            description: 'Guard',
        },
        {
            attribute: 'Jersey Number',
            description: 'Guard',
        },
        {
            attribute: 'Country',
            description: 'Guard',
        },
        {
            attribute: 'Last Team',
            description: 'Guard',
        },
    ];
    return (
        <>
            <View className="w-full h-96 justify-end">
                <Image
                    source={{uri: 'https://media-cdn.incrowdsports.com/29f7e3f7-2a14-4bf2-a5ab-3fb89fdfe607.png'}}
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
                        Zalgiris
                    </Text>
                </LinearGradient>
            </View>

            <View className="flex-row h-20 bg-red-600 justify-between px-10 items-center">
                <Text className="text-white text-xl font-semibold text-center">Age {"\n"}19</Text>
                <Text className="text-white text-xl font-semibold text-center">Height {"\n"}199 cm</Text>
                <Text className="text-white text-xl font-semibold text-center">Weight {"\n"}199 kg</Text>
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
    )
}
export default PlayerDetailsView

import {View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {Link} from "expo-router";

const TeamCard = (team: Team) => {
    return (
        <Link href={`/teams/${team.code as string}?image=${team.image}`} asChild>
            <TouchableOpacity className="w-full">
                <View className="w-[90%] bg-white rounded-2xl shadow px-3 py-3 mt-5 mx-5">
                    <View className="h-10 flex-row items-center">
                        <Image
                            source={{uri: team.image}}
                            className="rounded-full h-10 w-12 mr-3"
                            resizeMode="contain"
                        />

                        <Text className="flex-1 text-xl font-semibold" numberOfLines={1}>{team.name}</Text>
                    </View>

                    <Text className="text-xl mt-3" numberOfLines={3}>{team.address}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    )
}
export default TeamCard

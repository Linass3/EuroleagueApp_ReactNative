import {View, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import {Link} from "expo-router";

const TeamCardGrid = (team: Team) => {
    return (
        <Link href={`/teams/${team.code}`} asChild>
            <TouchableOpacity className="w-44 mx-5">
                <View className="h-44 w-full bg-white rounded-2xl shadow px-3 py-3 mt-10">
                    <Image
                        source={{uri: team.image}}
                        className="h-full w-full p-1"
                        resizeMode="contain"
                    />
                </View>
            </TouchableOpacity>
        </Link>
    )
}
export default TeamCardGrid

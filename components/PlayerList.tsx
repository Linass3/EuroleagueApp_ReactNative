import {View, FlatList} from 'react-native'
import React from 'react'
import PlayerListRow from "@/components/PlayerListRow";

const PlayerList = ({fetchedPlayers}: { fetchedPlayers: Player[] }) => {
    return (
        <FlatList
            data={fetchedPlayers}
            renderItem={({item}) => (
                <PlayerListRow player={item}/>
            )}
            ItemSeparatorComponent={() => (
                <View className="w-full h-[0.5] bg-gray-400"/>
            )}
            keyExtractor={(item) => item.code}
        />
    )
}
export default PlayerList

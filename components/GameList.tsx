import {View, FlatList, RefreshControl} from 'react-native'
import React from 'react'
import GameListRow from "@/components/GameListRow";
import {fetchGames} from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {storeObject} from "@/utils/AsyncStorage";

const GameList = ({fetchedGames, selectedTeam}: { fetchedGames: Game[], selectedTeam: Team }) => {
    const [refreshing, setRefreshing] = React.useState(false);

    async function refreshGames() {
        setRefreshing(true);
        const newGames = await fetchGames(selectedTeam.code)

        await AsyncStorage.removeItem(`games-${selectedTeam.code}`)

        await storeObject(`games-${selectedTeam.code}`, newGames);

        fetchedGames = newGames;
        setRefreshing(false);
    }

    return (
        <FlatList
            data={fetchedGames.filter((game) => !game.played)}
            renderItem={({item}) => (
                <GameListRow game={item}/>
            )}
            ItemSeparatorComponent={() => (
                <View className="w-full h-[0.5] bg-gray-400"/>
            )}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={refreshGames}
                    colors={['grey']}
                    progressBackgroundColor={'black'}
                />
            }
        />
    )
}
export default GameList

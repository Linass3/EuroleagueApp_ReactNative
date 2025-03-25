import {View, FlatList, RefreshControl} from 'react-native'
import React from 'react'
import GameListRow from "@/components/GameListRow";
import {fetchGames} from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {storeObject} from "@/utils/AsyncStorage";

const GameList = ({fetchedGames, selectedTeam}: { fetchedGames: Game[], selectedTeam: Team }) => {
    const [refreshing, setRefreshing] = React.useState(false);

    async function refreshGames() {
        console.log("refreshing games");
        setRefreshing(true);
        console.log("refreshing games 2");
        const newGames = await fetchGames(selectedTeam.code)
        console.log("refreshing games 3");

        await AsyncStorage.removeItem(`games-${selectedTeam.code}`)
        console.log("refreshing games 4");

        await storeObject(`games-${selectedTeam.code}`, newGames);
        console.log("refreshing games 5");

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

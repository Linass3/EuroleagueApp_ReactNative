import {ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useLocalSearchParams} from "expo-router";
import {fetchGames, fetchPlayers, fetchTeams} from "@/services/api";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import {getObject, storeObject} from "@/utils/AsyncStorage";
import GameList from "@/components/GameList";
import PlayerList from "@/components/PlayerList";
import ImageCard from "@/components/ImageCard";
import ErrorView from "@/components/ErrorView";

const TeamDetailsView = () => {
    const {id} = useLocalSearchParams();
    const teamCode = Array.isArray(id) ? id[0] : id;

    const [selectedTeam, setSelectedTeam] = useState<Team>();
    const [fetchedGames, setFetchedGames] = useState<Game[]>([]);
    const [fetchedPlayers, setFetchedPlayers] = useState<Player[]>([]);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    useEffect(() => {
        async function getGamesAndPlayers() {


            const savedPlayers = await getObject(`players-${id}`) as Player[];
            if (savedPlayers) {
                setFetchedPlayers(savedPlayers);
                console.log('Got saved players');
            } else {
                const players = await fetchPlayers(teamCode);
                await storeObject(`players-${id}`, players);
                setFetchedPlayers(players);
                console.log('Got fetched players and saved to storage');
            }
        }

        async function getTeam() {
            const savedTeams = await getObject('teams') as Team[];
            if (savedTeams) {
                const savedTeam = savedTeams.find((team) => team.code === id)
                setSelectedTeam(savedTeam);
                console.log('Got saved team');
            } else {
                const teams = await fetchTeams();
                await storeObject(`teams`, teams);
                const team = teams.find((team) => team.code === id);
                setSelectedTeam(team);
                console.log('Got fetched team and saved to storage');
            }
        }

        getTeam();
        getGamesAndPlayers();
    }, []);

    if (!fetchedGames) {
        return <ActivityIndicator size="large" color="#000000"/>
    }

    return (
        selectedTeam ? (
            <>
                <ImageCard object={selectedTeam}/>

                <SegmentedControl
                    values={['Games', 'Players']}
                    selectedIndex={selectedTabIndex}
                    style={{
                        paddingHorizontal: 40,
                        marginVertical: 20
                    }}
                    onChange={(event) => {
                        setSelectedTabIndex(event.nativeEvent.selectedSegmentIndex);
                    }}
                />

                {
                    selectedTabIndex === 0
                        ? (<GameList fetchedGames={fetchedGames} selectedTeam={selectedTeam}/>)
                        : (<PlayerList fetchedPlayers={fetchedPlayers}/>)
                }
            </>
        ) : (
            <ErrorView text={'Error: team could not be fetched!'}/>
        )
    )
}
export default TeamDetailsView

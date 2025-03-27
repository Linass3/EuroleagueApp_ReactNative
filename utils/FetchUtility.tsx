import {getObject, storeObject} from "@/utils/AsyncStorage";
import {fetchGames, fetchPlayers, fetchTeams} from "@/services/api";

let lastTeamUpdateDate: Date | undefined;
const teamUpdateInterval = 10;

export const getTeams = async (forceUpdate: boolean) => {
    if (!lastTeamUpdateDate || ((new Date().getTime() - lastTeamUpdateDate.getTime()) / 1000) > teamUpdateInterval) {
        if (lastTeamUpdateDate) {
            console.log(lastTeamUpdateDate);
        }
        
        lastTeamUpdateDate = new Date();

        let teams: Team[] | undefined;
        let retry = false;
        if (!forceUpdate) {
            teams = await getObject('teams') as Team[];
            if (teams) {
                console.log('Got saved teams');
            } else {
                retry = true;
            }
        } else if (forceUpdate || retry) {
            teams = await fetchTeams();
            if (teams) {
                await storeObject('teams', teams);
                console.log('Got fetched teams');
            }
        }

        if (!teams) {
            throw new Error('Unable to get teams from storage or from api');
        }
        return teams;
    }
}

export const getSingleTeam = async (forceUpdate: boolean, teamCode: string) => {
    const teams = await getTeams(forceUpdate);
    return teams.filter((team) => team.code === teamCode);
}

export const getGames = async (forceUpdate: boolean, teamCode: string) => {
    let games: Game[] | undefined;
    let retry = false;

    if (!forceUpdate) {
        games = await getObject(`games-${teamCode}`) as Game[];
        if (games) {
            console.log('Got saved games');
        } else {
            retry = true;
        }
    } else if (forceUpdate || retry) {
        games = await fetchGames(teamCode);
        if (games) {
            await storeObject(`games-${teamCode}`, games);
            console.log('Got fetched games');
        }
    }

    if (!games) {
        throw new Error('Unable to get games from storage or from api');
    }
    return games;
}

export const getPlayers = async (forceUpdate: boolean, teamCode: string) => {
    let players: Player[] | undefined;
    let retry = false;

    if (!forceUpdate) {
        players = await getObject(`players-${teamCode}`) as Player[];
        if (players) {
            console.log('Got saved players');
        } else {
            retry = true;
        }
    } else if (forceUpdate || retry) {
        players = await fetchPlayers(teamCode);
        if (players) {
            await storeObject(`players-${teamCode}`, players);
            console.log('Got fetched players');
        }
    }

    if (!players) {
        throw new Error('Unable to get players from storage or from api');
    }
    return players;
}

export const getSinglePlayer = async (forceUpdate: boolean, teamCode: string, playerCode: string) => {
    const players = await getPlayers(forceUpdate, teamCode);
    return players.filter((player) => player.code === playerCode);
}
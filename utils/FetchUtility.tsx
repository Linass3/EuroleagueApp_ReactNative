import {getObject, storeObject} from "@/utils/AsyncStorage";
import {fetchGames, fetchPlayers, fetchTeams} from "@/services/api";

let lastTeamsUpdateTime: number | undefined;
let lastPlayersUpdateTime: number | undefined;
let lastGamesUpdateTime: number | undefined;
const teamsUpdateInterval = 10;
const playersUpdateInterval = 11;
const gamesUpdateInterval = 12;

export const getTeams = async (forceFetch: boolean) => {
    let teams: Team[] | undefined;
    let retry = false;
    let shouldUpdate = ((new Date().getTime() - (lastTeamsUpdateTime ?? 0)) / 1000) > teamsUpdateInterval;

    if (forceFetch || shouldUpdate) {
        if (!shouldUpdate) {
            teams = await getObject('teams') as Team[];
            if (!teams) {
                retry = true;
            }
        }
        if (shouldUpdate || retry) {
            teams = await fetchTeams();
            if (teams) {
                await storeObject('teams', teams);
                lastTeamsUpdateTime = new Date().getTime();
            }
        }

        if (!teams) {
            throw new Error('Unable to get teams from storage or from api');
        }
        return teams;
    } else {
        return undefined;
    }
}


export const getSingleTeam = async (forceUpdate: boolean, teamCode: string): Promise<Team | undefined> => {
    const teams = await getTeams(forceUpdate);
    return teams?.find((team) => team.code === teamCode);
}

export const getGames = async (forceFetch: boolean, teamCode: string) => {
    let games: Game[] | undefined;
    let retry = false;
    let shouldUpdate = ((new Date().getTime() - (lastGamesUpdateTime ?? 0)) / 1000) > gamesUpdateInterval;

    if (forceFetch || shouldUpdate) {
        if (!shouldUpdate) {
            games = await getObject(`games-${teamCode}`) as Game[];
            if (!games) {
                retry = true;
            }
        }
        if (shouldUpdate || retry) {
            games = await fetchGames(teamCode);
            if (games) {
                await storeObject(`games-${teamCode}`, games);
                lastGamesUpdateTime = new Date().getTime();
            }
        }

        if (!games) {
            throw new Error('Unable to get games from storage or from api');
        }
        return games;
    } else {
        return undefined;
    }
}

export const getPlayers = async (forceFetch: boolean, teamCode: string) => {
    let players: Player[] | undefined;
    let retry = false;
    let shouldUpdate = ((new Date().getTime() - (lastPlayersUpdateTime ?? 0)) / 1000) > playersUpdateInterval;

    if (forceFetch || shouldUpdate) {
        if (!shouldUpdate) {
            players = await getObject(`players-${teamCode}`) as Player[];
            if (!players) {
                retry = true;
            }
        }
        if (shouldUpdate || retry) {
            players = await fetchPlayers(teamCode);
            if (players) {
                await storeObject(`players-${teamCode}`, players);
                lastPlayersUpdateTime = new Date().getTime();
            }
        }

        if (!players) {
            throw new Error('Unable to get players from storage or from api');
        }
        return players;
    } else {
        return undefined;
    }
}

export const getSinglePlayer = async (forceUpdate: boolean, teamCode: string, playerCode: string): Promise<Player | undefined> => {
    const players = await getPlayers(forceUpdate, teamCode);
    return players?.find((player) => player.code === playerCode);
}
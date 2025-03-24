import {format} from "date-fns";

export const EUROLEAGUE_API_CONFIG = {
    BASE_URL: 'https://api-live.euroleague.net/v2',
    headers: {
        accept: 'application/json'
    }
}

export async function fetchTeams() {
    try {
        const response = await fetch(`${EUROLEAGUE_API_CONFIG.BASE_URL}/competitions/E/seasons/E2024/clubs`, {
            method: 'GET',
            headers: EUROLEAGUE_API_CONFIG.headers
        })

        if (!response.ok) {
            throw new Error('Failed to fetch teams');
        } else {
            const result = await response.json();

            const teams: Team[] = result.data.map((item: any) => {
                return {
                    name: item.name,
                    image: item.images.crest,
                    address: item.address,
                    code: item.code,
                }
            })

            return teams;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchGames(code: string) {
    try {
        const response = await fetch(`${EUROLEAGUE_API_CONFIG.BASE_URL}/competitions/E/seasons/E2024/games?teamCode=${code}`, {
            method: 'GET',
            headers: EUROLEAGUE_API_CONFIG.headers
        })

        if (!response.ok) {
            throw new Error('Failed to fetch games');
        } else {
            const result = await response.json();

            const games: Game[] = result.data.map((item: any) => {
                return {
                    team: item.local.club.name,
                    opponent: item.road.club.name,
                    date: item.date,
                    played: item.played
                }
            })

            return games.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchPlayers(code: string) {
    try {
        const response = await fetch(`${EUROLEAGUE_API_CONFIG.BASE_URL}/competitions/E/seasons/E2024/clubs/${code}/people?personType=J`, {
            method: 'GET',
            headers: EUROLEAGUE_API_CONFIG.headers
        })

        if (!response.ok) {
            throw new Error('Failed to fetch players');
        } else {
            const result = await response.json();

            const players: Player[] = result.map((item: any) => {
                return {
                    name: item.person.name,
                    height: item.person.height,
                    weight: item.person.weight,
                    birthDate: item.person.birthDate,
                    dorsal: item.dorsal,
                    position: item.postionName,
                    image: item.images.action,
                    lastTeam: item.lastTeam,
                    code: item.person.code
                }
            })

            return players;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}
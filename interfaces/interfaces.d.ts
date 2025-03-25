interface Team {
    name: string;
    image: string;
    address: string;
    code: string;
}

interface Game {
    team: string;
    opponent: string;
    date: string;
    played: boolean;
}

interface Player {
    name: string;
    height: number;
    weight: number;
    age: string;
    dorsal: string;
    position: string;
    image?: string;
    country: string;
    lastTeam: string;
    code: string;
    teamCode: string;
}
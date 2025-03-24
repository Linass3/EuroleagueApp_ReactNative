import { Stack } from "expo-router";
import './global.css'

export default function RootLayout() {
  return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerStyle: {
                        backgroundColor: '#df5b20'
                    },
                    headerTintColor: 'white',
                    title: 'Euroleague',
                }}
            />

            <Stack.Screen
                name="teams/[id]"
                options={{
                    headerStyle: {
                        backgroundColor: '#df5b20'
                    },
                    headerTintColor: 'white',
                    title: 'Team',
                }}
            />

            <Stack.Screen
                name="players/[id]"
                options={{
                    headerStyle: {
                        backgroundColor: '#df5b20'
                    },
                    headerTintColor: 'white',
                    title: 'Player',
                }}
            />
        </Stack>
)
}

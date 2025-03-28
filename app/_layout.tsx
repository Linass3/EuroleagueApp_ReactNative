import {Stack} from "expo-router";
import './global.css'
import {Text, TouchableOpacity} from "react-native";
import {SettingsProvider, useSettings} from "@/utils/SettingsContext";

function HeaderRightButton() {
    const {isTeamsViewList, setIsTeamsViewList} = useSettings();

    return (
        <TouchableOpacity onPress={() => setIsTeamsViewList((previousValue) => !previousValue)}>
            <Text className="text-white text-xl font-medium">{isTeamsViewList ? 'Grid' : 'List'}</Text>
        </TouchableOpacity>
    );
}

export default function RootLayout() {
    return (
        <>
            <SettingsProvider>
                <Stack>
                    <Stack.Screen
                        name="index"
                        options={{
                            headerStyle: {
                                backgroundColor: '#df5b20'
                            },
                            headerTintColor: 'white',
                            title: 'Euroleague',
                            headerRight: () => <HeaderRightButton/>
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
            </SettingsProvider>
        </>
    )
}

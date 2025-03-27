import {Stack} from "expo-router";
import './global.css'
import {Text, TouchableOpacity} from "react-native";
import {useContext} from "react";
import {SettingsContext} from "@/utils/SettingsContext";
import UpdateTimeContextProvider, {UpdateTimeContext} from "@/utils/UpdateTimesContext";

export default function RootLayout() {


    return (
        <>
            <UpdateTimeContextProvider>
                <Stack>
                    <Stack.Screen
                        name="index"
                        options={{
                            headerStyle: {
                                backgroundColor: '#df5b20'
                            },
                            headerTintColor: 'white',
                            title: 'Euroleague',
                            headerRight: () => (
                                <TouchableOpacity
                                    // onPress={() => (
                                    //     updateTimesContext?.setLastUpdateTime
                                    // )}
                                >
                                    <Text className="text-white text-xl font-medium">text</Text>
                                </TouchableOpacity>
                            )
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
            </UpdateTimeContextProvider>
        </>
    )
}

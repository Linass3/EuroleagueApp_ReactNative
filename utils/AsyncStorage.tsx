import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeObject = async (key: string, object: any) => {
    try {
        const parsedValue = JSON.stringify(object);
        await AsyncStorage.setItem(key, parsedValue);
    } catch (error) {
        console.error(error);
    }
};

export const getObject = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(`${key}`);
        if (value !== null) {
            return JSON.parse(value);
        }
        return value;
    } catch (error) {
        console.error(error);
    }
}

import AsyncStorage from "@react-native-async-storage/async-storage"

export const setUserStorage = async (user) => {
    try {
       await AsyncStorage.setItem('user', JSON.stringify(user)) 
    } catch (error) {
        
    }
}

export const getUserStorage = async () => {
    try {
        const user = await AsyncStorage.getItem('user')
        return JSON.parse(user)
    } catch (error) {
        
    }
}

export const logOut = async () => {
    await AsyncStorage.deleteItem('user')
}
// web: 808363992443-lnksl3p3jkn7eanacsciq8t6r11485mf.apps.googleusercontent.com
// ios: 808363992443-os4lhsl3jg66go41tacf2ca73m8qf9ae.apps.googleusercontent.com
// android: 808363992443-t1rcr1f1cckj3hd0hr5nfk1o9r8tlre0.apps.googleusercontent.com
import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Button,
    ScrollView
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { getUserStorage } from './App/Shared/Services'
import { AuthContext } from './App/Context/AuthContext'
import HomeNavigations from './App/Navigations/HomeNavigations'
import Login from './App/Pages/Login'
import Home from './App/Pages/Home'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CourseDetails from './App/Pages/CourseDetails'
const Stack = createNativeStackNavigator()

export default function App() {
    const [user, setUser] = useState()

    useEffect(() => {
        getUserStorage().then((resp) => {
            if (resp) {
                setUser(resp)
            } else {
                setUser(null)
            }
        })
    }, [])

    return (
        <View style={styles.container}>
            <AuthContext.Provider value={{ user, setUser }}>
                {user ? <HomeNavigations /> : <Login />}
            </AuthContext.Provider>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

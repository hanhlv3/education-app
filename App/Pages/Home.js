import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { useContext, useEffect } from 'react'

import Colors from '../Shared/Colors'

import { AuthContext } from '../Context/AuthContext'
import GlobalApi from '../Shared/GlobalApi'

import WelcomeHeader from '../Components/WelcomeHeader'
import SeachBar from '../Components/SeachBar'
import Slider from '../Components/Slider'
export default function Home() {

    const { user, setUser } = useContext(AuthContext)

   

    return (
        <View style={styles.container}>
            <WelcomeHeader />
            <SeachBar />
            <Slider />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingStart: 20,
        paddingEnd: 20,
        paddingBottom: 30,
        backgroundColor: Colors.backgroundColor
    }
})

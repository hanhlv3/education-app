import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons, Feather } from '@expo/vector-icons'


export default function BackScreen() {
    const navigation = useNavigation()
    return (
        <View style={styles.backContainer}>
            <Ionicons
                name="arrow-back-sharp"
                size={24}
                color="black"
                onPress={() => navigation.goBack()}
            />

            <Feather name="more-vertical" size={24} color="black" />
        </View>
    )
}

const styles = StyleSheet.create({
    backContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

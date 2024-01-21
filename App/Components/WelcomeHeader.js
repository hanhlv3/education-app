import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

export default function WelcomeHeader() {

    const {user, setUser} = useContext(AuthContext)
    return (
        <View style={styles.container}>
           <View >
                <Text style={[styles.helloText, styles.text]}>Hello,</Text>
                <Text style={[styles.userNameText, styles.text]}>{user.name}</Text>
           </View>
           <Image 
                style={styles.avatarImage}
                source={{ uri: user?.picture }}
           />
           
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    text: {
       
    },
    helloText: {
        fontSize: 14,
        fontWeight:'400',
        lineHeight: 14.52
    },
    userNameText: {
        fontSize: 20,
        fontWeight:'600',
        lineHeight: 20.6
    },
    avatarImage: { 
        width: 40,
        height: 40,
        borderRadius: 50
    }
})

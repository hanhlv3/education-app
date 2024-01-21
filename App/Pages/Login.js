import React, { useEffect, useState, useContext } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import Colors from '../Shared/Colors'
import { setUserStorage } from '../Shared/Services';
import { AuthContext } from '../Context/AuthContext'

WebBrowser.maybeCompleteAuthSession()
const Login = () => {
    const [accessToken, setAccessToken] = useState(null)
    const {user, setUser} = useContext(AuthContext)
    

    const [request, response, promtAsync] = Google.useAuthRequest({ 
        iosClientId:
            '808363992443-os4lhsl3jg66go41tacf2ca73m8qf9ae.apps.googleusercontent.com',
        androidClientId:
            '808363992443-t1rcr1f1cckj3hd0hr5nfk1o9r8tlre0.apps.googleusercontent.com',
        expoClientId:
            '808363992443-lnksl3p3jkn7eanacsciq8t6r11485mf.apps.googleusercontent.com'
    })

    useEffect(() => {
        
        if (response?.type === 'success') {
            setAccessToken(response.authentication.accessToken)
            accessToken && fetchUserInfo()
        }
    }, [response, accessToken])

    const fetchUserInfo = async () => {
        let response = await fetch(
            'https://www.googleapis.com/userinfo/v2/me',
            {
                headers: { Authorization: 'Bearer ' + accessToken }
            }
        )
        const useInfo = await response.json()
        setUser(useInfo)
        await setUserStorage(useInfo)
    }
    return (
        <View>
            <Image style={styles.img} source={require('../Assets/Images/login.png')} />
            <View style={styles.container}>
                <Text style={styles.welcomeText}>Welcome to Education App</Text>
                <Text style={styles.loginText}>Login/Signup</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => promtAsync()}
                >
                    <FontAwesome
                        name="google"
                        size={30}
                        color="white"
                        style={{ marginRight: 10 }}
                    />
                    <Text style={styles.googleText}>Sign in with Google</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        width: '100%',
    },
    container: {
        paddingTop: 40,
        marginTop: -20,
        backgroundColor: Colors.white,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    },
    welcomeText: {
        fontSize: 38,
        paddingLeft: 20,
        paddingRight: 10,
        color: Colors.primary,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    loginText: {
        textAlign: 'center',
        marginTop: 80,
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        padding: 10,
        margin: 30,
        borderRadius: 10
    },
    googleText: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default Login

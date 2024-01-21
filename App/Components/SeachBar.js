import { StyleSheet, Text, View, TextInput} from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons';

import Colors from '../Shared/Colors'

export default function SeachBar() {
  return (
    <View style={styles.container}>
      <EvilIcons name="search" style={styles.btnSearch} size={34} color="black" />
      <TextInput style={styles.inputSearch} placeholder='Search'/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        shadowColor: Colors.black,
        elevation: 3,
    
    },
    btnSearch: {
        opacity: 0.5,
        marginRight: 5
    },
    inputSearch: { 
        fontSize: 16,
        lineHeight: 19.36,
        fontWeight: '400'
    }
})


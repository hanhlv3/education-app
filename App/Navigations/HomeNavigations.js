import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import Home from '../Pages/Home'
import CourseDetails from '../Pages/CourseDetails'
import CourseChapter from '../Pages/CourseChapter'

const Stack = createNativeStackNavigator()

const HomeNavigations = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="home"
                    component={Home}
                    options={{ headerShown: false }}
                ></Stack.Screen>
                <Stack.Screen
                    name="course-detail"
                    component={CourseDetails}
                    options={{ headerShown: false }}
                ></Stack.Screen>
                <Stack.Screen
                    name="course-chapter"
                    component={CourseChapter}
                    options={{ headerShown: false }}
                ></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default HomeNavigations

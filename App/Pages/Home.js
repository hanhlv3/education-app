import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import { useContext, useEffect } from 'react'

import Colors from '../Shared/Colors'

import WelcomeHeader from '../Components/WelcomeHeader'
import SeachBar from '../Components/SeachBar'
import Slider from '../Components/Slider'
import VideoCourseList from '../Components/VideoCourseList'
import CourseList from '../Components/CourseList'
export default function Home() {
    return (
        <ScrollView style={styles.container}>
            <WelcomeHeader />
            <SeachBar />
            <Slider />
            <VideoCourseList />
            <CourseList courseType={'basic'} />
            <CourseList courseType={'advance'} />
        </ScrollView>
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

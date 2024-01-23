import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function CourseContent({ course }) {
    return (
        <View>
            <Text style={styles.courseDescTitle}>About Course</Text>
            <Text style={styles.courseDesc}>
                {course?.description}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    courseDescTitle: {
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 19.36,
        marginBottom: 5
    },
    courseDesc: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 16
    },
})

import {
    Button,
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe'
import { useState, useEffect, useCallback } from 'react'
import { useRoute } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'

import CourseContent from '../Components/CourseContent'
import Colors from '../Shared/Colors'
import BackScreen from '../Components/BackScreen'

export default function PlayVideo() {
    const param = useRoute().params
    const [chapter, setChapter] = useState([])

    useEffect(() => {
        setChapter(param.chapter.item)
    }, [])

    return (
        <View style={styles.container}>
            <BackScreen />
            <Text style={[styles.title]}>{chapter?.name}</Text>
            <View style={[styles.frameVideo]}>
                <YoutubePlayer
                    height={300}
                    play={true}
                    videoId={chapter?.videoUrl}
                    onChangeState={true}
                />
            </View>

            <CourseContent desc={chapter?.description} title={'Description'} />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: Colors.black,
        fontWeight: '700',
        fontSize: 24,
        lineHeight: 25,
        marginBottom: 20
    },
    container: {
        flex: 1,
        paddingTop: 32,
        paddingStart: 20,
        paddingEnd: 20,
        paddingBottom: 30,
        backgroundColor: Colors.backgroundColor
    }
})

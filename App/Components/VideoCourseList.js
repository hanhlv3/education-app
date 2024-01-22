import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    Dimensions
} from 'react-native'
import { useState, useEffect } from 'react'

import GlobalApi from '../Shared/GlobalApi'

export default function VideoCourseList() {
    const [videoList, setVideoList] = useState([])

    useEffect(() => {
        fetchCourseList()
    }, [])

    const fetchCourseList = async () => {
        const response = (await GlobalApi.getVideoCourseList()).data

        const result = response.data.map((item) => ({
            id: item.id,
            title: item.attributes.title,
            description: item.attributes.description,
            image: item.attributes.image.data.attributes.url,
            videoTopic: item.attributes.VideoTopic
        }))
        setVideoList(result)
    }

    const CourseItem = ({ item }) => {
        return (
            <View>
                <Image style={styles.coureImage} source={{ uri: item.image }} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleList}>Video Course</Text>
            <FlatList
                data={videoList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CourseItem item={item} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    titleList: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    coureImage: {
        width: Dimensions.get('screen').width * 0.5,
        height: 120,
        marginRight: 10,
        borderRadius: 7,
        
    }
})

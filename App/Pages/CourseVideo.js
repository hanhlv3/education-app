import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { ScrollView } from 'react-native-virtualized-view'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import Colors from '../Shared/Colors'
import CourseContent from '../Components/CourseContent'
import BackScreen from '../Components/BackScreen'

export default function CourseVideo() {
    const navigation = useNavigation()
    const param = useRoute().params
    const [course, setCourse] = useState(null)

    useEffect(() => {
        setCourse(param.course)
    }, [])

    const TopicItem = ({ topic }) => {
        console.log('topic', topic)
        const success = topic.item.success

        return (
            <TouchableOpacity
                style={styles.courseTopic}
                onPress={() =>
                    navigation.navigate('play-video', { chapter: topic })
                }
            >
                <View style={styles.disPlayFelexRow}>
                    {success ? (
                        <AntDesign
                            name="checkcircle"
                            style={styles.topicSuccess}
                        />
                    ) : (
                        <Text style={styles.topicNumber}>
                            {topic.item.chapter < 10
                                ? `0${topic.item.chapter}`
                                : topic.item.chapter}
                        </Text>
                    )}

                    <Text style={styles.topicName}>{topic.item.name}</Text>
                </View>
                <Image
                    style={{ width: 24, height: 24 }}
                    source={require('../Assets/Images/runButton.jpg')}
                />
            </TouchableOpacity>
        )
    }


    return (
        <ScrollView style={styles.container}>
            <BackScreen />
            <View style={{ marginTop: 20, marginBottom: 10 }}>
                <Text style={styles.courseName}>{course?.title}</Text>
                <Text style={styles.author}>Author</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: course?.image }} />
            </View>
            <CourseContent desc={course?.description} />
            <View style={{ marginTop: 20, marginBottom: 10 }}>
                <Text style={styles.titleContent}>Course Content</Text>
            </View>

            <FlatList
                data={course?.videoTopic}
                renderItem={(item) => <TopicItem topic={item} />}
                keyExtractor={(item, inex) => item.id}
            />
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    disPlayFelexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        paddingTop: 32,
        paddingStart: 20,
        paddingEnd: 20,
        paddingBottom: 30,
        backgroundColor: Colors.backgroundColor
    },
    backContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    courseName: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 24.2
    },
    author: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 14.52
    },
    imageContainer: {
        shadowColor: Colors.black,
        elevation: 5,
        marginBottom: 20
    },
    image: {
        width: '100%',
        height: 165,
        borderRadius: 10
    },
    courseTopic: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: Colors.white,
        borderRadius: 10,
        marginBottom: 10
    },
    titleContent: {
        fontSize: 18,
        fontWeight: '900',
        lineHeight: 20.3,
        marginTop: 5
    },
    topicNumber: {
        fontSize: 29,
        fontWeight: '700',
        lineHeight: 30.26,
        color: 'gray',
        marginRight: 10
    },
    topicName: {
        fontSize: 17,
        fontWeight: 'bold',
        lineHeight: 25
    }, 
    topicSuccess: {
        fontSize: 24,
        color: 'green',
        marginRight: 10
    }
})

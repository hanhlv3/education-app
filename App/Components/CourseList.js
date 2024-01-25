import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import GlobalApi from '../Shared/GlobalApi'
import Colors from '../Shared/Colors'
import { useNavigation } from '@react-navigation/native'

export default function CourseList({ courseType }) {
    const [courseList, setCourseList] = useState([])

    const [titleList, setTitleList] = useState(null)
    const navigation = useNavigation()
    useEffect(() => {
        if (courseType === 'basic') {
            setTitleList('Basic Popular Course')
        } else {
            setTitleList('Advance Courses')
        }
        getCourses(courseType)
    }, [courseType])

    useEffect(() => {
        getCourses(courseType)
    }, [])

    const getCourses = async (type) => {
        const response = (await GlobalApi.getCourseByType(type)).data
    
        const result = response.data.map((item) => ({
            id: item.id,
            name: item.attributes.name,
            image: item.attributes.image.data.attributes.url,
            description: item.attributes.description,
            Topic: item.attributes.Topic
        }))
        setCourseList(result)
    }

    const onPressCourse = (course) => {
        navigation.navigate('course-detail', {course: course})
    }

    const CourseItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.courseItem} onPress={() => onPressCourse(item)}>
                <Image style={styles.coureImage} source={{ uri: item.image }} />
                <View style={styles.contentItem}>
                    <Text style={styles.courseTitle}>{item.name}</Text>
                    <Text style={styles.courseLesson}>{`${item.Topic?.length} Lessons`}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleList}>{titleList}</Text>
            <FlatList 
                style={{paddingBottom: 3}}
                 data={courseList}
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
        marginTop: 20,
        borderRadius: 10,
    },

    
    titleList: {
        marginBottom: 3,
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 24.2,
    }, 
    courseItem: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: 10,
        marginTop: 10,
    },
    contentItem: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        backgroundColor: Colors.white,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        
    },
    coureImage: {
        width: Dimensions.get('screen').width * 0.5,
        height: 120,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    }, 
    courseTitle: {
        fontSize: 15,
        fontWeight: '700', 
        lineHeight: 14.52
    },
    courseLesson: {
        fontSize: 12,
        fontWeight: '300', 
        lineHeight: 12.89,
        color: Colors.gray,
        marginTop: 5
    },
})

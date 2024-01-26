import {
    Button,
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { useState, useEffect, useRef } from 'react'
import { useRoute } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import * as Progress from 'react-native-progress';
import CourseContent from '../Components/CourseContent'
import Colors from '../Shared/Colors'
import BackScreen from '../Components/BackScreen'

export default function CourseChapter() {
    const param = useRoute().params
    const [chapter, setChapter] = useState([])
    const chapterRef = useRef()

    const [process, setProcess] = useState(0)

    const [isRun, setIsRun] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const [currentChapter, setCurrentChapter] = useState(0)
    const moveNextChapter = (index) => {
        if (index === chapter.length - 1) {
            isSuccess ? setProcess(1) :  setProcess((index + 1)/chapter.length) 
            return 
        }
        isSuccess ? setProcess(1) :  setProcess((index + 1)/chapter.length) 
        setCurrentChapter(index + 1)
        setIsRun(false)
        chapterRef.current?.scrollToIndex({
            index: currentChapter,
            animated: true
        })  
    }

    useEffect(() => {
        setChapter(param.chapter.item.Content)     
        const isSuccess = param.chapter.item.success   
        setIsSuccess(isSuccess)
        if (isSuccess) setProcess(1) 
    }, [])

    const ChapterItem = (item, index) => (
        <View style={styles.itemContainer}>
            <CourseContent desc={item.description} title={item.name} />
            <View style={[styles.input]}>
                <View style={styles.codeBox}>
                    <Text style={[styles.textCode, styles.text]}>
                        {item.input}
                    </Text>
                </View>
                <View>
                    <TouchableOpacity style={[styles.button, styles.btnRun]} onPress={() => setIsRun(true)}>
                        <AntDesign name="play" style={styles.iconRun} />
                        <Text style={[styles.text]}>Run</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {isRun && (
                <View style={[styles.output]}>
                    <Text style={[styles.outText]}>Output</Text>
                    <View style={styles.codeBox}>
                        <Text style={[styles.textCode, styles.text]}>
                            {item.output}
                        </Text>
                    </View>
                </View>
            )}

            <TouchableOpacity
                style={[styles.button, styles.nextBtn]}
                onPress={() => moveNextChapter(index)}
            >
                <Text style={[styles.textCode, styles.text]}>
                    {index === chapter.length - 1 ? 'Finish' : 'Next'}
                </Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={styles.container}>
            <BackScreen />
            <Progress.Bar progress={process} width={null} color={Colors.primary} />
            <FlatList
                data={chapter}
                horizontal={true}
                pagingEnabled={false}
                ref={chapterRef}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => ChapterItem(item, index)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 10,
        padding: 10
    },
    text: {
        color: Colors.white,
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 19.36
    },
    container: {
        flex: 1,
        paddingTop: 32,
        paddingStart: 20,
        paddingEnd: 20,
        paddingBottom: 30,
        backgroundColor: Colors.backgroundColor
    },
    itemContainer: {
        flex: 1,
        position: 'relative',
        width: Dimensions.get('screen').width * 0.87,
        marginRight: 15,
        marginTop: 12,
        padding: 10
    },
    input: {
        marginTop: 30,
        marginBottom: 50,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    codeBox: {
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
        backgroundColor: Colors.black
    },
    btnRun: {
        padding: 8,
        borderRadius: 5,
        width: 'auto',
        alignSelf: 'baseline'
    },
    iconRun: {
        fontSize: 16,
        color: Colors.white,
        marginRight: 5
    },
    outText: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 24.2,
        marginBottom: 5
    },
    nextBtn: {
        position: 'absolute',
        bottom: 0,
        right: 10,
        width: '100%'
    }
})

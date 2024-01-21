import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import GlobalApi from '../Shared/GlobalApi'
import { FlatList } from 'react-native'
import { Dimensions } from 'react-native'

export default function Slider() {
    const [sliders, setSliders] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const flatListRef = useRef(null)

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % sliders.length
            setCurrentIndex(nextIndex)
        }, 5000)

        return () => clearInterval(interval)
    }, [currentIndex, sliders.length])

    useEffect(() => {
        flatListRef.current?.scrollToIndex({ index: currentIndex, animated: true })
    }, [currentIndex])

    useEffect(() => {
        getSlider()
    }, [])

    const getSlider = async () => {
        const res = (await GlobalApi.getSlider()).data

        const result = res.data.map((item) => {
            return {
                id: item.id,
                name: item.attributes.Name,
                image: item.attributes.image.data.attributes.formats.thumbnail
                    .url
            }
        })
        setSliders(result)
    }

    const ImageItem = ({item}) => {
        return (
            <View>
                <Image style={styles.image} source={{ uri: item?.image }} />
            </View>
        )
    }

    if (sliders.length === 0) {
        return null; // Render nothing if the sliders array is empty
    }


    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={sliders}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <ImageItem item={item} />}
                keyExtractor={(item) => item.id}
                pagingEnabled={true}
                initialScrollIndex={0}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    image: {
        width: Dimensions.get('screen').width*0.9,
        height: 150,
        borderRadius: 15,
    }
})
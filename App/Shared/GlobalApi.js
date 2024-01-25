import { create } from 'apisauce'

const api = create({
    baseURL: 'http://192.168.1.15:1337/api',
})

const getSlider = () => api.get('/sliders?populate=*')

const getVideoCourseList = () => api.get('/video-courses?populate=*')

const getCourseByType = (courseType) => api.get(`/course-lists?populate[Topic][populate]=*&populate[Content][populate]=*&populate[image][populate]=*&filters[type][$eq]=${courseType}`)

export default {
    getSlider,
    getVideoCourseList,
    getCourseByType,
}

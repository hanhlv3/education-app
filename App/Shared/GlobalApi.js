import { create } from 'apisauce'

const api = create({
    baseURL: 'http://192.168.1.15:1337/api',
})

const getSlider = () => api.get('/sliders?populate=*')

export default {
    getSlider
}

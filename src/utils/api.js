import axios from 'axios'
import { getUserFromLocalStorage } from './localStorage'

const api = axios.create({
    baseURL: '<baseUrl>/api/v1'
})

api.interceptors.request.use((config) => {
    const user = getUserFromLocalStorage()
    let locale = 'uz'
    
    if (typeof window !== 'undefined') {
        locale = localStorage.getItem('locale')
    }

    if (user) {
        config.headers['Authorization'] = `Bearer ${user.token}`
    }

    config.headers['Accept'] = 'application/json'
    config.headers['x-app-lang'] = locale
    return config
})

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
    if (error.response.status === 401) {
        return thunkAPI.rejectWithValue('Foydalanuvchi ro\'yxatdan o\'tmagan!')
    }
    return thunkAPI.rejectWithValue(error.response.data.error.message)
}

export default api
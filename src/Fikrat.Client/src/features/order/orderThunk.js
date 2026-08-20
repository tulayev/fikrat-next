import api, { checkForUnauthorizedResponse } from '../../utils/api'

export const checkCouponThunk = async (url, formData, thunkAPI) => {
    try {
        const { data } = await api.post(url, formData)
        return data.data
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI)
    }
}

export const orderCreateThunk = async (url, formData, thunkAPI) => {
    try {
        const { data } = await api.post(url, formData)
        return data.data
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI)
    }
}

export const getOrdersThunk = async (url, params, thunkAPI) => {
    try {
        const { data } = await api.get(url, { params: params })
        return data.data
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI)
    }
}
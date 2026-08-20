import api, { checkForUnauthorizedResponse } from '../../utils/api'
import { getAuthenticatedUser } from './authSlice'

export const sendOtpThunk = async (url, formData, thunkAPI) => {
    try {
        const { data } = await api.post(url, formData)

        if (!data.success && data.error) 
            throw data.error.message

        return data.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
}

export const verifyOtpThunk = async (url, formData, thunkAPI) => {
    try {
        const { data } = await api.post(url, formData)

        if (!data.success && data.error) 
            throw data.error.message

        return data.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
}

export const signUpThunk = async (url, formData, thunkAPI) => {
    const { otpToken } = thunkAPI.getState().auth

    try {
        const { data } = await api.post(url, formData, {
            headers: {
                'Authorization': `Bearer ${otpToken}`
            }
        })

        if (!data.success && data.error) 
            throw data.error.message

        thunkAPI.dispatch(getAuthenticatedUser())
        return data.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
}

export const getAuthenticatedUserThunk = async (url, thunkAPI) => {
    const { otpToken } = thunkAPI.getState().auth

    try {
        const { data } = await api.get(url, {
            headers: {
                'Authorization': `Bearer ${otpToken}`
            }
        })

        return data.data
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI)
    }
}
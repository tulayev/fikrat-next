import api, { checkForUnauthorizedResponse } from '../../utils/api'

export const getSeminarsThunk = async (url, thunkAPI) => {
    const { page } = thunkAPI.getState().seminar

    try {
        const { data } = await api.get(url, {
            params: {
                page,
                per_page: 20
            }
        })
        
        return data.data
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI)
    }
}

export const getSeminarThunk = async (url, thunkAPI) => {
    try {
        const { data } = await api.get(url)

        return data.data
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI)
    }
}
import api, { checkForUnauthorizedResponse } from '../../utils/api'

export const getCategoriesThunk = async (url, params, thunkAPI) => {
    try {
        const { data } = await api.get(url, {
            params: params
        })

        return data.data
    } catch (error) {
        return checkForUnauthorizedResponse(error, thunkAPI)
    }
}
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCategoriesThunk } from './categoryThunk'
import { toast } from 'react-toastify'

const namespace = 'category'

const initialState = {
    isLoading: false,
    categories: []
}

export const getCategories = createAsyncThunk(
    `${namespace}/getCategories`, 
    async (params, thunkAPI) => {
        return getCategoriesThunk('/categories', params, thunkAPI)
    }
)

const categorySlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        showLoading: (state) => {
            state.isLoading = true
        },
        hideLoading: (state) => {
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCategories.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.categories = payload.categories
            })
            .addCase(getCategories.rejected, (state, { payload }) => {
                state.isLoading = false
                toast.error(payload)
            })
    }
})

export const { showLoading, hideLoading } = categorySlice.actions

export default categorySlice.reducer
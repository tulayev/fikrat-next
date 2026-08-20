import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSeminarsThunk, getSeminarThunk } from './seminarThunk'
import { toast } from 'react-toastify'

const namespace = 'seminar'

const initialState = {
    isLoading: false,
    seminar: {},
    seminars: [],
    page: 1,
    numberOfPages: 1
}

export const getSeminars = createAsyncThunk(
    `${namespace}/getSeminars`, 
    async (slug, thunkAPI) => {
        return getSeminarsThunk(`/categories/${slug}`, thunkAPI)
    }
)

export const getSeminar = createAsyncThunk(
    `${namespace}/getSeminar`, 
    async (slug, thunkAPI) => {
        return getSeminarThunk(`/seminars/${slug}`, thunkAPI)
    }
)

const seminarSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        showLoading: (state) => {
            state.isLoading = true
        },
        hideLoading: (state) => {
            state.isLoading = false
        },
        changePage: (state, { payload }) => {
            state.page = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSeminars.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSeminars.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.seminars = payload.seminars
                state.numberOfPages = payload.meta.last_page
            })
            .addCase(getSeminars.rejected, (state, { payload }) => {
                state.isLoading = false
                toast.error(payload)
            })
            .addCase(getSeminar.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSeminar.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.seminar = payload.seminar
            })
            .addCase(getSeminar.rejected, (state, { payload }) => {
                state.isLoading = false
                toast.error(payload)
            })
    }
})

export const { showLoading, hideLoading, changePage } = seminarSlice.actions

export default seminarSlice.reducer
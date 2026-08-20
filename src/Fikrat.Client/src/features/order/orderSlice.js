import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { checkCouponThunk, orderCreateThunk, getOrdersThunk } from './orderThunk'
import { toast } from 'react-toastify'

const namespace = 'order'

const initialState = {
    coupon: null,
    successMessage: '',
    step: 1,
    orders: [],
    isLoading: false
}

export const checkCoupon = createAsyncThunk(
    `${namespace}/checkCoupon`,
    async (formData, thunkApi) => {
        return checkCouponThunk('/orders/check-coupon', formData, thunkApi)
    }
)

export const orderCreate = createAsyncThunk(
    `${namespace}/orderCreate`,
    async (formData, thunkApi) => {
        return orderCreateThunk('/orders', formData, thunkApi)
    }
)

export const getOrders = createAsyncThunk(
    `${namespace}/getOrders`,
    async (params, thunkApi) => {
        return getOrdersThunk('/orders', params, thunkApi)
    }
)

const orderSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        showLoading: state => state.isLoading = true,
        hideLoading: state => state.isLoading = false
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkCoupon.fulfilled, (state, { payload }) => {
                state.coupon = payload?.coupon
            })
            .addCase(checkCoupon.rejected, (_, { payload }) => {
                toast.error(payload)
            })
            .addCase(orderCreate.fulfilled, (state, { payload }) => {
                state.successMessage = payload?.message
            })
            .addCase(orderCreate.rejected, (_, { payload }) => {
                toast.error(payload)
            })
            .addCase(getOrders.fulfilled, (state, { payload }) => {
                state.successMessage = ''
                state.orders = payload.orders
            })
            .addCase(getOrders.rejected, (_, { payload }) => {
                toast.error(payload)
            })
    }
})

export const { showLoading, hideLoading } = orderSlice.actions

export default orderSlice.reducer
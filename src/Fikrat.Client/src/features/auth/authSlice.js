import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addUserToLocalStorage, removeUserFromLocalStorage, getUserFromLocalStorage, getGoogleUserFromLocalStorage, removeGoogleUserFromLocalStorage, addGoogleUserToLocalStorage } from '../../utils/localStorage'
import { sendOtpThunk, verifyOtpThunk, signUpThunk, getAuthenticatedUserThunk } from './authThunk'
import { toast } from 'react-toastify'

const namespace = 'auth'

const initialState = {
    user: getUserFromLocalStorage(),
    googleUser: getGoogleUserFromLocalStorage(),
    otpMessage: '',
    otpToken: '',
    userExists: false,
    step: 1
}

export const sendOtp = createAsyncThunk(
    `${namespace}/sendOtp`,
    async (formData, thunkApi) => {
        localStorage.setItem('phone', JSON.stringify(formData))
        return sendOtpThunk('/otp/send-code', formData, thunkApi)
    }
)

export const verifyOtp = createAsyncThunk(
    `${namespace}/verifyOtp`,
    async (formData, thunkApi) => {
        return verifyOtpThunk('/otp/verify', formData, thunkApi)
    }
)

export const signUp = createAsyncThunk(
    `${namespace}/signUp`,
    async (formData, thunkApi) => {
        return signUpThunk('/auth/signup', formData, thunkApi)
    }
)

export const getAuthenticatedUser = createAsyncThunk(
    `${namespace}/getAuthenticatedUser`,
    async (_, thunkApi) => {
        return getAuthenticatedUserThunk('/auth/me', thunkApi)
    }
)

const authSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        signInUser: (state, { payload }) => {
            state.googleUser = payload
            addGoogleUserToLocalStorage(payload)
        },
        logoutUser: (state) => {
            state.user = null
            state.googleUser = null
            removeUserFromLocalStorage()
            removeGoogleUserFromLocalStorage()
        },
        prevStep: (state) => {
            state.step--
        },
        resetStep: (state) => {
            state.step = 1
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendOtp.fulfilled, (state, { payload }) => {
                state.otpMessage = payload.message
                state.userExists = payload.exists
                state.step++
            })
            .addCase(sendOtp.rejected, (_, { payload }) => {
                toast.error(payload)
            })
            .addCase(verifyOtp.fulfilled, (state, { payload }) => {
                state.otpToken = payload.token
                state.step++
                localStorage.removeItem('phone')
                toast.success(payload.message)
            })
            .addCase(verifyOtp.rejected, (_, { payload }) => {
                toast.error(payload)
            })
            .addCase(signUp.fulfilled, (_, { payload }) => {
                toast.success(payload.message)
            })
            .addCase(signUp.rejected, (_, { payload }) => {
                toast.error(payload)
            })
            .addCase(getAuthenticatedUser.fulfilled, (state, { payload }) => {
                const userData = { ...payload.user, ...{ token: state.otpToken } }
                addUserToLocalStorage(userData)
                state.user = userData
                toast.success(payload.message)
            })
            .addCase(getAuthenticatedUser.rejected, (_, { payload }) => {
                toast.error(payload)
            })
    }
})

export const { signInUser, logoutUser, prevStep, resetStep } = authSlice.actions

export default authSlice.reducer
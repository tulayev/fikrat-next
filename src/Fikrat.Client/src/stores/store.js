import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '../features/modal/modalSlice'
import categoryReducer from '../features/category/categorySlice'
import seminarReducer from '../features/seminar/seminarSlice'
import authReducer from '../features/auth/authSlice'
import orderReducer from '../features/order/orderSlice'

const store = configureStore({
    reducer: {
        modal: modalReducer,
        category: categoryReducer,
        seminar: seminarReducer,
        auth: authReducer,
        order: orderReducer
    }
})

export default store
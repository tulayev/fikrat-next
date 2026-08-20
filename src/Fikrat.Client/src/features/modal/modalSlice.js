import { createSlice } from '@reduxjs/toolkit'

const namespace = 'modal'

const initialState = {
    isSignUpModalOpen: false,
    isOrderModalOpen: false,
    isProfileModalOpen: false
}

const modalSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        openModal: (state, { payload }) => {
            switch (payload) {
                case 'SignUpModal':
                    state.isSignUpModalOpen = true
                    break
                case 'OrderModal':
                    state.isOrderModalOpen = true
                    break
                case 'ProfileModal':
                    state.isProfileModalOpen = true
                    break
            }
        },
        closeModal: state => {
            state.isSignUpModalOpen = false
            state.isOrderModalOpen = false
            state.isProfileModalOpen = false
        }
    }
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
export const addUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
}

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
}

export const getUserFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        const result = localStorage.getItem('user')
        return result ? JSON.parse(result) : null
    }
}

export const addGoogleUserToLocalStorage = (googleUser) => {
    localStorage.setItem('googleUser', JSON.stringify(googleUser))
}

export const removeGoogleUserFromLocalStorage = () => {
    localStorage.removeItem('googleUser')
}

export const getGoogleUserFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
        const result = localStorage.getItem('googleUser')
        return result ? JSON.parse(result) : null
    }
}
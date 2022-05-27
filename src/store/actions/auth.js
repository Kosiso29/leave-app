import * as actionTypes from "./actionTypes";

export const authVerifyEmail = (email, userId) => {
    localStorage.setItem('email', email);
    localStorage.setItem('userId', userId);
    return {
        type: actionTypes.AUTH_VERIFY_EMAIL,
        email: email,
        userId: userId
    }
}

export const authCheckState = () => {
    const email = localStorage.getItem('email');
    const userId = localStorage.getItem('userId');
    return {
        type: actionTypes.AUTH_CHECK_STATE,
        email: email,
        userId: userId
    }
};

export const authInitiateLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
};
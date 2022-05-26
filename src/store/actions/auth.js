import * as actionTypes from "./actionTypes";

export const authVerifyEmail = (email) => {
    localStorage.setItem('email', email);
    return {
        type: actionTypes.AUTH_VERIFY_EMAIL,
        email: email
    }
}

export const authCheckState = () => {
    const email = localStorage.getItem('email');
    return {
        type: actionTypes.AUTH_CHECK_STATE,
        email: email
    }
};

export const authInitiateLogout = () => {
    localStorage.removeItem('email');
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
};
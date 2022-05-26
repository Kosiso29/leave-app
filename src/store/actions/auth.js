import * as actionTypes from "./actionTypes";

export const authVerifyEmail = (email) => {
    return {
        type: actionTypes.AUTH_VERIFY_EMAIL,
        email: email
    }
}
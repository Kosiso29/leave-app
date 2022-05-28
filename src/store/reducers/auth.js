import * as actionTypes from "../actions/actionTypes";

const initialState = {
    email: "",
    userId: "",
    loggedIn: false,
    alertState: {
        show: false,
        variant: "",
        message: ""
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_VERIFY_EMAIL:
            return {
                ...state,
                email: action.email,
                userId: action.userId
            }
        case actionTypes.AUTH_CHECK_STATE:
            return {
                ...state,
                email: action.email,
                userId: action.userId
            }
        case actionTypes.AUTH_INITIATE_LOGOUT:
            return {
                ...state,
                email: ""
            }
        case actionTypes.SET_ALERT_STATE:
            return {
                ...state,
                alertState: action.alertState
            }
        default:
            return state;
    }
}

export default reducer;
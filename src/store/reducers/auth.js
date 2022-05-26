import * as actionTypes from "../actions/actionTypes";

const initialState = {
    email: "",
    loggedIn: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_VERIFY_EMAIL:
            return {
                ...state,
                email: action.email
            }
        case actionTypes.AUTH_CHECK_STATE:
            return {
                ...state,
                email: action.email
            }
        case actionTypes.AUTH_INITIATE_LOGOUT:
            return {
                ...state,
                email: ""
            }
    
        default:
            return state;
    }
}

export default reducer;
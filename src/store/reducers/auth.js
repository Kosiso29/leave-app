import * as actionTypes from "../actions/actionTypes";

const initialState = {
    email: "",
    password: "",
    loggedIn: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_VERIFY_EMAIL:
            return {
                ...state,
                email: action.email
            }
    
        default:
            return state;
    }
}

export default reducer;
import { USER_DETAILS } from '../constants';

const initial_state = {
    userDetails: null
}

export default AuthenticationReducer = (state = initial_state, action) => {
    switch (action.type) {
        case USER_DETAILS:
            return { ...state, userDetails: { ...action.payload } }
        default:
            return state
    }
}
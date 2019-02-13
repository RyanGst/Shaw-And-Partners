import {
    FETCH_USERS_BEGIN,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    FETCH_AND_SET_USERS,
    FETCH_SPECIFIC_USER_BEGIN,
    FETCH_SPECIFIC_USER_SUCCESS,
    FETCH_SPECIFIC_USER_FAILURE
} from '../actions/actions.js'

const initialState = {
    items: [],
    loading: false,
    error: null
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USERS_BEGIN:
            // Mark the state as "loading"
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.USERS.response,
                util: action.payload.USERS.nextPage[0]
            };

        case FETCH_AND_SET_USERS:
            const prev = state.items
            const data = prev.concat(action.payload.USERS.response);
            return {
                ...state,
                loading: false,
                items: data,
                util: action.payload.USERS.nextPage[0]
            }
        case FETCH_USERS_FAILURE:
            // The request failed. It's done, Loading to "false".
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };
        case FETCH_SPECIFIC_USER_BEGIN:
            return {

                ...state,
                loading: true,
                error: null

            };

        case FETCH_SPECIFIC_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.USER.res
            };

        case FETCH_SPECIFIC_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };

        default:
            // ALWAYS
            return state;
    }
}
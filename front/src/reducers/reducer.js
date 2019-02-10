
import {types} from '../actions/actions.js';

const initState = {
    user: null
};

export const userReducer = (state = initState, action) => {
    switch (action.type) {
        case types.LOAD_USER_DATA_SUCCESS:
            return {
                ...state,
                user: action.data
            };

        default:
            return state;
    }
};
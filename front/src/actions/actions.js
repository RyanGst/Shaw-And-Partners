import Axios from "axios";

export const FETCH_USERS_BEGIN = 'FETCH_USERS_BEGIN';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const FETCH_AND_SET_USERS = "FETCH_AND_SET_USERS";

export function fetchUsers() {
    return dispatch => {
        dispatch(fetchUsersBegin());
        return Axios
            .get("http://localhost:5050/api/users/")
            .then(res => {
                dispatch(fetchUsersSuccess(res.data))
                return res.data;
            })
            .catch(error => dispatch(fetchUsersFailure(error)));
    };
}

export function fetchMoreUsers(since) {

    return dispatch => {
        dispatch(fetchUsersBegin());
        return Axios
            .get(`http://localhost:5050/api/users?${since}`)
            .then(res => {
                dispatch(fetchAndSetUsers(res.data));
                return res.data;
            })
            .catch(error => dispatch(fetchUsersFailure(error)));
    };
}

// Handle HTTP errors since fetch won't.
export const fetchUsersBegin = () => ({type: FETCH_USERS_BEGIN});

export const fetchUsersSuccess = USERS => ({type: FETCH_USERS_SUCCESS, payload: {
        USERS
    }});

export const fetchAndSetUsers = USERS => ({type: FETCH_AND_SET_USERS, payload: {
        USERS
    }});

export const fetchUsersFailure = error => ({type: FETCH_USERS_FAILURE, payload: {
        error
    }});
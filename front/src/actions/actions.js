import Axios from "axios";

export const FETCH_USERS_BEGIN = 'FETCH_USERS_BEGIN';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

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
            .get(`https://api.github.com/users?${since}`)
            .then(res => {
                console.log(res);
                dispatch(fetchUsersSuccess(res));
                return res;
            })
            .catch(error => dispatch(fetchUsersFailure(error)));
    };
}

// Handle HTTP errors since fetch won't.
export const fetchUsersBegin = () => ({type: FETCH_USERS_BEGIN});

export const fetchUsersSuccess = USERS => ({type: FETCH_USERS_SUCCESS, payload: {
        USERS
    }});
export const fetchUsersFailure = error => ({type: FETCH_USERS_FAILURE, payload: {
        error
    }});
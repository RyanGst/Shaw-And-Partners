import Axios from "axios";

export const FETCH_USERS_BEGIN = 'FETCH_USERS_BEGIN';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const FETCH_AND_SET_USERS = "FETCH_AND_SET_USERS";

export const FETCH_SPECIFIC_USER_BEGIN = 'FETCH_SPECIFIC_USER_BEGIN';
export const FETCH_SPECIFIC_USER_SUCCESS = 'FETCH_SPECIFIC_USER_SUCCESS';
export const FETCH_SPECIFIC_USER_FAILURE = 'FETCH_SPECIFIC_USER_FAILURE';

export const REQ_INIT = "REQ_INIT";
export const REQ_FAIL = "REQ_FAIL";

export const FETCH_POKE_SUCCESS = "FETCH_POKE_SUCCESS";

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

export function fetchSpecificUser(user) {
    return dispatch => {
        dispatch(fetchSpecificUserBegin());
        return Axios
            .get(`http://localhost:5050/api/user/details?name=${user}`)
            .then(res => {
                console.log(res.data);
                dispatch(fetchSpecificUserSuccess(res.data))
                return res.data;
            })
            .catch(error => dispatch(fetchSpecificUserFailure(error)));
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

function fetchPoke() {
    return dispatch => {
        dispatch(reqInit())
        return Axios
            .get("https://pokeapi.co/api/v2/pokemon?limit=151")
            .then(res => {
                dispatch(fetchPokeSucess(res.data))
                return res.data
            })
            .catch(e => dispatch(reqFail(e)))
    }
}

function shouldFetchPoke(state) {
    const pkms = state.poke.length > 1
    if (pkms) {
        console.log('there are pokms');
        return false
    } else {
        console.log('there are no pokms');

        return true
    }
}

export function FetchPokeIfNeed() {
    return (dispatch, getState) => {
        if (shouldFetchPoke(getState().rootReducer) == true) {
            return dispatch(fetchPoke())
        }
    };
}

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

export const fetchSpecificUserBegin = () => ({type: FETCH_SPECIFIC_USER_BEGIN});

export const fetchSpecificUserSuccess = USER => ({type: FETCH_SPECIFIC_USER_SUCCESS, payload: {
        USER
    }});
export const fetchSpecificUserFailure = error => ({type: FETCH_SPECIFIC_USER_FAILURE, payload: {
        error
    }});

export const reqInit = () => ({type: REQ_INIT});
export const reqFail = error => ({type: REQ_FAIL, payload: {
        error
    }});

export const fetchPokeSucess = POKE => ({type: FETCH_POKE_SUCCESS, payload: {
        POKE
    }})
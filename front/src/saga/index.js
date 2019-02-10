'use strict';
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects'
import {actions, types} from '../actions/actions.js';

// the base URL for your REST API backend
const baseUrl = 'https://api.github.com/users';

// sending request with username and getting user data from GitHub 
function* loadUserData(action) {
    const response = yield axios.get(`${baseUrl}/${action.name}`);
    console.log(response.data);
    yield put(actions.loadUserDataSuccess(response.data))
}

// watches for actions dispatched to the store and starts loadUserData saga
export function* watchLoadUserData() {
    yield takeLatest(types.LOAD_USER_DATA, loadUserData)
}
import React, {Component} from 'react';
import AppRoutes from './routes/index.js';

import 'babel-polyfill';
//Redux stuff
import {Provider} from "react-redux";
import {userReducer} from './reducers/reducer.js';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger'
import {watchLoadUserData} from './saga/index.js';

// initializing saga middleware for the store
const sagaMiddleware = createSagaMiddleware();

// creating the store with our reducer
const store = createStore(combineReducers({user: userReducer}), applyMiddleware(sagaMiddleware, createLogger));

sagaMiddleware.run(watchLoadUserData)

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppRoutes/>
            </Provider>
        );
    }
}

export default App;

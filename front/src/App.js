import React, {Component} from 'react';
import AppRoutes from './routes/index.js';
import 'babel-polyfill';
import rootReducer from './reducers/index.js';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

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

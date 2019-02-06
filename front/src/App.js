import React, {Component} from 'react';
import AppRoutes from './routes/index.js';

import 'babel-polyfill';
//Redux stuff
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

const store = configureStore()
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

import React, {Component} from 'react';
import AppRoutes from './routes/index.js';

import 'babel-polyfill';
//Redux stuff

class App extends Component {
    render() {
        return (<AppRoutes/>);
    }
}

export default App;

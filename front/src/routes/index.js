import React, {Component} from "react";
import {Route, BrowserRouter} from "react-router-dom";
import routes from "./routes.js";
import Sidebar from "../components/layout/index.js";
import Profile from "../views/Profile.js"
class AppRoutes extends Component {

    render() {
        const routeComponents = routes.map(({
            path,
            component
        }, key) => <Route exact path={path} component={component} key={key}/>);

        return (
            <BrowserRouter>
                <Sidebar routes={routes}>
                    <div>
                        <div className="content">
                            {routeComponents}
                            <Route path="/user/:userName" component={Profile}></Route>
                        </div>
                    </div>
                </Sidebar>
            </BrowserRouter>
        );
    }
}

export default AppRoutes
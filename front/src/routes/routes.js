import Home from "../views/Home.js";
import About from "../views/About.js";
const routes = [
    {
        path: '/',
        name: "Home",
        icon: "fas fa-home",
        component: Home
    }, {
        path: '/git',
        name: "Users",
        icon: "fab fa-github",
        component: About
    }
    /*, {
        path: '/details', 
        name: 'Info', 
        icon: "fas fa-info-circle", 
        component: Details
    }*/
    /* And so on. */
];

export default routes;
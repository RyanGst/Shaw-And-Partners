import Home from "../views/Home.js";
import About from "../views/About.js";
import Search from "../views/Search.js"
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
    }, {
        path: '/search',
        name: "Search",
        icon: "fab fa-houzz",
        component: Search
    }
     
    /* And so on. */
];

export default routes;
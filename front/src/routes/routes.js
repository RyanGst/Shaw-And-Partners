import Home from "../views/Home.js";
import About from "../views/About.js";
import Reddit from "../views/Reddit.js";
const routes = [
    {
        path: '/',
        name: "Home",
        icon: "fab fa-houzz",
        component: Home
    }, {
        path: '/about',
        name: "About",
        icon: "fas fa-journal-whills",
        component: About
    }, {
        path: "/r", 
        name: "Reddit Fetch", 
        icon: "fab fa-reddit", 
        component: Reddit
    }
    /* And so on. */
];

export default routes;
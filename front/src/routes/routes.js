import Home from "../views/Home.js";
import About from "../views/About.js";
import Poke from "../views/Poke.js";
const routes = [
    {
        path: '/',
        name: "Home",
        icon: "fas fa-home",
        component: Home
    }, {
        path: '/git',
        name: "GitHub",
        icon: "fab fa-github",
        component: About
    }, 
    {
        path: '/poke', 
        name: "Pokemon",
        icon: 'fab fa-nintendo-switch', 
        component: Poke 
    }
];

export default routes;
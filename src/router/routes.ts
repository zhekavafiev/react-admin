import HelloWorld from "../components/HelloWorld";
import Admin from "../components/Admin";
import Game from "../components/TinderLikedRecommendations";

export const routes = [
    { path: '/', component: HelloWorld },
    { path: '/admin', component: Admin },
    { path: '/game', component: Game }
];

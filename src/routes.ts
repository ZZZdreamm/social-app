import LandingPage from "./MainComponents/LandingPage";
import UserFriendRequests from "./Users/UserFriendRequests";
import UserFriends from "./Users/UserFriends";
import UserProfile from "./Users/UserProfile";
import UserSentFriendRequests from "./Users/UserSentFriendRequests";
import Login from "./ZZZ_USEFUL COMPONENTS/auth/Login";
import Register from "./ZZZ_USEFUL COMPONENTS/auth/Register";

const routes = [
    {path:'/login', component:Login},
    {path:'/register', component:Register},
    {path:'/user-profile/:id', component:UserProfile},
    {path:'/user-friends/:id', component:UserFriends},
    {path:'/user-friend-requests/:id', component:UserFriendRequests},
    {path:'/user-sent-friend-requests/:id', component:UserSentFriendRequests},


    { path: "/", component: LandingPage },
    { path: "*", component: LandingPage },
  ];

export const guardedRoutes = [

];

export default routes;

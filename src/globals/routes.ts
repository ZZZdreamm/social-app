import LandingPage from "../pages/LandingPage";
import Messager from "../pages/Messager";
import UserFriendRequests from "../pages/UserFriendRequests";
import UserFriends from "../pages/UserFriends";
import UserProfile from "../pages/UserProfile";
import UserSentFriendRequests from "../pages/UserSentFriendRequests";
import Calling from "../pages/Calling";
import Login from "../pages/Login";
import Register from "../pages/Register";

const routes = [
    {path:'/login', component:Login},
    {path:'/register', component:Register},
    {path:'/user-profile/:id', component:UserProfile},
    {path:'/user-profile/:id/user-friends', component:UserFriends},
    {path:'/user-friends/:id', component:UserFriends},
    {path:'/user-friend-requests/:id', component:UserFriendRequests},
    {path:'/user-sent-friend-requests/:id', component:UserSentFriendRequests},
    {path:'/call/:who/:userId/:friendId/:roomId', component:Calling},
    {path:'/messaging-only/:id', component:Messager},


    { path: "/", component: LandingPage },
    { path: "*", component: LandingPage },
  ];

export const guardedRoutes = [

];

export default routes;

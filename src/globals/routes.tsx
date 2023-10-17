import LandingPage from "../pages/LandingPage";
import Messager from "../pages/Messager";
import UserFriendRequests from "../pages/UserFriendRequests";
import UserFriends from "../pages/UserFriends";
import UserProfile from "../pages/UserProfile";
import UserSentFriendRequests from "../pages/UserSentFriendRequests";
import Calling from "../pages/Calling";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { Route, Routes } from "react-router-dom";
import { useAuthData } from "../hooks/useAuthData";
import GuardedRoute from "../_utils/GuardedRoute/GuardedRoute";
import { AddReelsPage } from "../pages/AddReelsPage";
import { OpenReelsPage } from "../pages/openReelsPage/OpenReelsPage";

const routes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },

  { path: "/", component: LandingPage },
  { path: "*", component: LandingPage },
];

export const guardedRoutes = [
  { path: "/user-profile/:id", component: UserProfile },
  { path: "/user-profile/:id/user-friends", component: UserFriends },
  { path: "/user-friends/:id", component: UserFriends },
  { path: "/user-friend-requests/:id", component: UserFriendRequests },
  { path: "/user-sent-friend-requests/:id", component: UserSentFriendRequests },
  { path: "/call/:who/:userId/:friendId/:roomId", component: Calling },
  { path: "/messaging-only/:id", component: Messager },
  { path: "/reels/create", component: AddReelsPage },
  { path: "/reels/:reelId", component: OpenReelsPage },
];

export function RoutesProvider() {
  const { claims, gotClaims } = useAuthData();
  return (
    <>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            Component={route.component}
          />
        ))}

        {gotClaims &&
          guardedRoutes.map((route: any) => (
            <Route
              key={route.path}
              element={<GuardedRoute isAuthenticated={claims.length > 0} />}
            >
              <Route Component={route.component} path={route.path} />
            </Route>
          ))}
      </Routes>
    </>
  );
}

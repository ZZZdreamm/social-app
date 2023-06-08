import LandingPage from "./MainComponents/LandingPage";

const routes = [
    { path: "/", component: LandingPage },
    { path: "*", component: LandingPage },
  ];

export const guardedRoutes = [


];

export default routes;

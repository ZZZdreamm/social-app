import { Navigate, Outlet, Route } from "react-router-dom";


//@ts-ignore
export default function GuardedRoute({isAuthenticated }) {
  return (
    <>
      {isAuthenticated ? <Outlet/> : <Navigate to={"/"} />}
    </>
  );
}

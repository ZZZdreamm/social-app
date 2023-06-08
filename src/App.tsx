import { useEffect, useState } from "react";
import "./App.scss";
import { ModalProvider } from "styled-react-modal";
import AuthenticationContext from "./ZZZ_USEFUL COMPONENTS/auth/AuthenticationContext";
import { claim } from "./ZZZ_USEFUL COMPONENTS/auth/auth.models";
import { getClaims } from "./ZZZ_USEFUL COMPONENTS/auth/HandleJWT";
import OfflineWebsite from "./ZZZ_USEFUL COMPONENTS/Utilities/OfflineWebsite";
import { Route, Routes } from "react-router-dom";
import GuardedRoute from "./ZZZ_USEFUL COMPONENTS/Utilities/GuardedRoute";
import routes, { guardedRoutes } from "./ZZZ_USEFUL COMPONENTS/routes";
import Menu from "./ZZZ_USEFUL COMPONENTS/MainComponents/Menu";

function App() {
  const [claims, setClaims] = useState<claim[]>([]);
  const [online, setOnline] = useState(true);
  const [gotClaims, setGotClaims] = useState(false);


  useEffect(() => {
    setClaims(getClaims());
    setOnline(navigator.onLine);
  }, []);

  useEffect(() => {
    setClaims(getClaims());
    setGotClaims(true);
  }, [localStorage]);

  return (
    <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
      <ModalProvider>
        <div className="App">
        {online ? (
              <>
                <Menu />
                <section className="landing-page">
                  <Routes>
                    {routes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        Component={route.component}
                      />
                    ))}

                    {gotClaims &&
                      guardedRoutes.map((route:any) => (
                        <Route
                          key={route.path}
                          element={
                            <GuardedRoute isAuthenticated={claims.length > 0} />
                          }
                        >
                          <Route
                            Component={route.component}
                            path={route.path}
                          />
                        </Route>
                      ))}
                  </Routes>
                </section>
              </>
            ) : (
              <OfflineWebsite />
            )}
        </div>
      </ModalProvider>
    </AuthenticationContext.Provider>
  );
}

export default App;

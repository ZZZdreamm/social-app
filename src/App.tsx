import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import OfflineWebsite from "./_utils/OfflineWebsite/OfflineWebsite";
import LeftBar from "./components/MainComponents/Bars/LeftBar";
import Menu from "./components/MainComponents/Menu";
import Authorized from "./globals/Auth/Authorized";
import { socketURL } from "./globals/apiPaths";
import { AuthenticationDataProvider } from "./services/Contexts/AuthenticationContext";
import "./styles/Styles.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { ProfileDataProvider } from "./services/Contexts/ProfileDataContext";
import { SocketCallModal } from "./components/socketCallModal/SocketCallModal";
import { OpenedChatsComponent } from "./components/openedChatsComponent/OpenedChatsComponent";
import { OpenedChatsProvider } from "./services/Contexts/OpenedChatsContext";
import { RoutesProvider } from "./globals/routes";
import { wakeUpDB } from "./apiFunctions/wakeUpDB";
import { LoadingModal } from "./components/loadingModal/LoadingModal";

export const socket = io(socketURL);
export const queryClient = new QueryClient();

function App() {
  const [online, setOnline] = useState(false);
  const [databaseDown, setDatabaseDown] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
  }, [localStorage]);

  useEffect(() => {
    const wakeUp = async () => {
      await wakeUpDB();
    };
    wakeUp();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationDataProvider>
        <ProfileDataProvider>
          <OpenedChatsProvider>
            <div className="App">
              {online ? (
                !databaseDown ? (
                  <>
                    <div className="navbar-placeholder"></div>
                    <Menu />
                    <Authorized isAuthorized={<LeftBar />} />
                    <OpenedChatsComponent />
                    <SocketCallModal />
                    <section className="landing-page">
                      <RoutesProvider />
                    </section>
                  </>
                ) : (
                  <LoadingModal
                    isOpen={databaseDown}
                    setIsOpen={setDatabaseDown}
                  />
                )
              ) : (
                <OfflineWebsite />
              )}
            </div>
          </OpenedChatsProvider>
        </ProfileDataProvider>
      </AuthenticationDataProvider>
    </QueryClientProvider>
  );
}

export default App;

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
import { RoutesProvider } from "./Routes";
import { SocketCallModal } from "./components/socketCallModal/SocketCallModal";
import { OpenedChatsComponent } from "./components/openedChatsComponent/OpenedChatsComponent";
import { OpenedChatsProvider } from "./services/Contexts/OpenedChatsContext";

export const socket = io(socketURL);
const queryClient = new QueryClient();

function App() {
  const [online, setOnline] = useState(false);

  useEffect(() => {
    setOnline(navigator.onLine);
  }, [localStorage]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationDataProvider>
        <ProfileDataProvider>
          <OpenedChatsProvider>
            <div className="App">
              {online ? (
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

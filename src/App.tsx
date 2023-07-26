import { ReactElement, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import { ModalProvider } from "styled-react-modal";
import GuardedRoute from "./_utils/GuardedRoute/GuardedRoute";
import OfflineWebsite from "./_utils/OfflineWebsite/OfflineWebsite";
import LeftBar from "./components/MainComponents/Bars/LeftBar";
import Menu from "./components/MainComponents/Menu";
import OpenedChats from "./components/Messages/OpenedChats";
import { openCallWindow } from "./components/WebRTC/CallFunctions";
import CallModal from "./components/WebRTC/CallModal";
import Authorized from "./globals/Auth/Authorized";
import { getClaims } from "./globals/Auth/HandleJWT";
import { getProfile } from "./globals/Profile/HandleProfile";
import { socketURL } from "./globals/apiPaths";
import routes, { guardedRoutes } from "./globals/routes";
import AuthenticationContext from "./services/Contexts/AuthenticationContext";
import ProfileContext, {
  FriendRequestsContext,
  OpenedChatsContext,
  ProfileFriendsContext,
  SentFriendRequestsContext,
} from "./services/Contexts/ProfileContext";
import { postDataToServer } from "./services/Firebase/FirebaseFunctions";
import { claim } from "./services/Models/auth.models";
import { profileDTO } from "./services/Models/profiles.models";
import "./styles/styles.scss";

export const socket = io(socketURL);

function App() {
  const [claims, setClaims] = useState<claim[]>([]);
  const [profile, setProfile] = useState<profileDTO>();
  const [myFriends, setMyFriends] = useState<profileDTO[] | undefined>();
  const [myFriendRequests, setMyFriendRequests] = useState<
    profileDTO[] | undefined
  >();
  const [mySentRequests, setMySentRequests] = useState<
    profileDTO[] | undefined
  >();
  const [openedChats, setOpenedChats] = useState<profileDTO[]>([]);
  const [call, setCall] = useState<ReactElement>(<></>);

  const [online, setOnline] = useState(false);
  const [gotClaims, setGotClaims] = useState(false);


  useEffect(() => {
    setProfile(getProfile());
    setClaims(getClaims());
  }, []);

  useEffect(() => {
    setProfile(getProfile());
    setClaims(getClaims());
    setGotClaims(true);
    setOnline(navigator.onLine);
  }, [localStorage]);

  useEffect(() => {
    if (!profile) return;
    if (!profile.Id) return;
    socket.on(`calling/${profile.Id}`, async (data) => {
      const caller = await postDataToServer({ name: data.userId }, "get-user");
      setCall(
        <CallModal
          onSubmit={() =>
            openCallWindow(profile, caller, data.roomId, "receiver")
          }
          friend={caller}
          setCall={setCall}
          onClose={() => {
            socket.emit("leave-call", { friendId: caller.Id });
          }}
        />
      );
    });
    if (myFriends) return;
    if (myFriendRequests) return;
    if (mySentRequests) return;
    getFriends();
    getFriendRequests();
    getSentFriendRequests();
  }, [profile]);

  async function getFriends() {
    const newFriends = await postDataToServer(
      { userId: profile!.Id },
      "get-friends"
    );
    if (!newFriends) return;
    setMyFriends(newFriends);
  }
  async function getFriendRequests() {
    const newFriendRequests = await postDataToServer(
      { userId: profile!.Id },
      "get-friend-requests"
    );
    if (!newFriendRequests) return;
    setMyFriendRequests(newFriendRequests);
  }
  async function getSentFriendRequests() {
    const newSentFriendRequests = await postDataToServer(
      { userId: profile!.Id },
      "get-sent-friend-requests"
    );
    if (!newSentFriendRequests) return;
    setMySentRequests(newSentFriendRequests);
  }

  return (
    <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
      <ProfileContext.Provider
        value={{ myProfile: profile!, updateProfile: setProfile }}
      >
        <ProfileFriendsContext.Provider
          value={{ myFriends, updateFriends: setMyFriends }}
        >
          <FriendRequestsContext.Provider
            value={{
              myFriendRequests: myFriendRequests,
              updateFriendRequests: setMyFriendRequests,
            }}
          >
            <SentFriendRequestsContext.Provider
              value={{
                mySentRequests: mySentRequests,
                updateSentFriendRequests: setMySentRequests,
              }}
            >
              <OpenedChatsContext.Provider
                value={{
                  openedChats: openedChats,
                  updateOpenedChats: setOpenedChats,
                }}
              >
                <ModalProvider>
                  <div className="App">
                    {online ? (
                      <>
                        <div className="navbar-placeholder"></div>
                        <Menu />
                        <Authorized isAuthorized={<LeftBar />} />

                        <OpenedChats openedChats={openedChats} />
                        {call}

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
                              guardedRoutes.map((route: any) => (
                                <Route
                                  key={route.path}
                                  element={
                                    <GuardedRoute
                                      isAuthenticated={claims.length > 0}
                                    />
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
              </OpenedChatsContext.Provider>
            </SentFriendRequestsContext.Provider>
          </FriendRequestsContext.Provider>
        </ProfileFriendsContext.Provider>
      </ProfileContext.Provider>
    </AuthenticationContext.Provider>
  );
}

export default App;

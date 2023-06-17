import { ReactElement, useEffect, useState } from "react";
import "./App.scss";
import Modal, { ModalProvider } from "styled-react-modal";
import AuthenticationContext from "./ZZZ_USEFUL COMPONENTS/auth/AuthenticationContext";
import { claim } from "./ZZZ_USEFUL COMPONENTS/auth/auth.models";
import { getClaims } from "./ZZZ_USEFUL COMPONENTS/auth/HandleJWT";
import OfflineWebsite from "./ZZZ_USEFUL COMPONENTS/Utilities/OfflineWebsite";
import { Route, Routes } from "react-router-dom";
import GuardedRoute from "./ZZZ_USEFUL COMPONENTS/Utilities/GuardedRoute";
import routes, { guardedRoutes } from "./routes";
import Menu from "./MainComponents/Menu";
import { getProfile } from "./ZZZ_USEFUL COMPONENTS/Profile/HandleProfile";
import { profileDTO } from "./ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import ProfileContext, {
  FriendRequestsContext,
  OpenedChatsContext,
  ProfileFriendsContext,
  SentFriendRequestsContext,
} from "./ZZZ_USEFUL COMPONENTS/Profile/ProfileContext";
import LeftBar from "./MainComponents/LeftBar";
import Authorized from "./ZZZ_USEFUL COMPONENTS/auth/Authorized";
import { postDataToServer } from "./Firebase/FirebaseFunctions";
import OpenedChats from "./Messages/OpenedChats";
import { socketURL } from "./ZZZ_USEFUL COMPONENTS/apiPaths";
import { io } from "socket.io-client";
import CallModal from "./WebRTC/CallModal";
import { openCallWindow } from "./WebRTC/CallFunctions";

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

  const [online, setOnline] = useState(true);
  const [gotClaims, setGotClaims] = useState(false);

  useEffect(() => {
    setProfile(getProfile());
    setClaims(getClaims());
    setOnline(navigator.onLine);
  }, []);

  useEffect(() => {
    setProfile(getProfile());
    setClaims(getClaims());
    setGotClaims(true);
  }, [localStorage]);

  useEffect(() => {
    if (!profile) return;
    if (!profile.Id) return;
    socket.on(`calling/${profile.Id}`, async (callerId) => {
      const caller = await postDataToServer({ name: callerId }, "get-user");
      console.log(caller)
      setCall(
        <CallModal
          onSubmit={() => openCallWindow(profile, caller, "call-accept")}
          friend={caller}
          setCall={setCall}
        />
      );
    });
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

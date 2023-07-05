import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import uuid4 from "uuid4";
import ProfileContext, { FriendRequestsContext, ProfileFriendsContext, SentFriendRequestsContext } from "../../Contexts/ProfileContext";
import { storageRef } from "../../Firebase/FirebaseConfig";
import {
  postDataToServer,
  putDataToServer,
} from "../../Firebase/FirebaseFunctions";
import PostsList from "../../Posts/PostsList";
import { profileDTO } from "../../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import FileInput from "../../ZZZ_USEFUL COMPONENTS/Utilities/FileInput";
import useIsInViewport from "../../ZZZ_USEFUL COMPONENTS/Utilities/IsInViewPort";
import TopModal from "../../ZZZ_USEFUL COMPONENTS/Utilities/ModalAtTop";
import Waiting from "../../ZZZ_USEFUL COMPONENTS/Utilities/Waiting/indexxx";
import { ReadyImagesURL } from "../../ZZZ_USEFUL COMPONENTS/appUrls";
import ListOfFriendsInProfile from "../ListOfFriendsInProfile";
import "./style.scss";

export default function UserProfile() {
  const { id } = useParams();
  const { myProfile, updateProfile } = useContext(ProfileContext);
  const {myFriends, updateFriends} = useContext(ProfileFriendsContext)
  const {myFriendRequests,updateFriendRequests} = useContext(FriendRequestsContext)
  const {mySentRequests, updateSentFriendRequests} = useContext(SentFriendRequestsContext)

  const [userProfile, setUserProfile] = useState<profileDTO>();
  const [content, setContent] = useState("posts");
  const [relationship, setRelationship] = useState<string>();
  const [choosenImage, setChoosenImage] = useState(
    userProfile?.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`
  );
  const [file, setFile] = useState<File>();
  const [isOpen, setIsOpen] = useState(false);
  const [friends, setFriends] = useState<profileDTO[]>([]);
  const [posts, setPosts] = useState<postDTO[]>([]);
  const [allPostsFetched, setAllPostsFetched] = useState(false);
  const endOfPostsRef = useRef(null);
  let numberOfPosts = 10;

  var scrolledPageBottom = useIsInViewport(endOfPostsRef, "1000px");
  useEffect(() => {
    if (scrolledPageBottom) {
      getPosts(userProfile!.Email);
    }
  }, [scrolledPageBottom]);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const getUserData = async () => {
      const user: profileDTO = await postDataToServer({ name: id }, "get-user");
      setUserProfile(user);
      setChoosenImage(user?.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`);
      getPosts(user?.Email);
      setFriends(await postDataToServer({ userId: user?.Id }, "get-friends"));
    };
    getUserData();
  }, [id]);

  useEffect(() => {
    checkIfInFriends();
  }, [myProfile, userProfile]);

  async function getPosts(username: string) {
    const postsToGet = posts.length + numberOfPosts;
    const newPosts = await postDataToServer(
      { name: username, numberOfPosts: postsToGet },
      "get-user-posts"
    );
    if (newPosts) {
      if (newPosts.length == posts.length) {
        setAllPostsFetched(true);
      } else {
        setPosts(newPosts);
      }
    }
  }

  async function sendFriendRequest() {
    setRelationship("inFriendRequests");
    const friend = await postDataToServer(
      { userId: myProfile.Id, friendId: userProfile!.Id },
      "send-friend-request"
    );
    //@ts-ignore
    updateSentFriendRequests((prev: profileDTO[])=>[friend, ...prev])

  }
  async function cancelFriendRequest() {
    setRelationship("stranger");
    const {Id} = await postDataToServer(
      { userId: myProfile.Id, friendId: userProfile!.Id },
      "cancel-friend-request/user"
    );
    const newFriends = mySentRequests!.filter((tempFriend) => tempFriend.Id != Id)
    updateSentFriendRequests(newFriends)
  }

  async function checkIfInFriends() {
    if (userProfile && userProfile.Id && myProfile && myProfile.Id) {
      const response = await postDataToServer(
        { userId: myProfile.Id, friendId: userProfile!.Id },
        "check-if-in-friends"
      );
      setRelationship(response.relation);
    }
  }

  async function changeProfileImage() {
    let url: any;
    if (file) {
      const imageRef = storageRef.child(
        `/profileImages/${file?.name}+${uuid4()}`
      );
      await imageRef.put(file!);
      url = await imageRef.getDownloadURL();
    }
    setChoosenImage(url!);
    putDataToServer(
      { userId: myProfile.Id, fileUrl: url },
      "change-profile-image"
    );
    localStorage.setItem("profileImage", url);
    updateProfile({
      Id: myProfile.Id,
      Email: myProfile.Email,
      ProfileImage: url,
    });
  }

  async function acceptFriendRequest() {
    const addedFriend = await postDataToServer({userId:myProfile.Id, friendId:userProfile!.Id}, "accept-friend-request")
    const newFriendRequests = myFriendRequests!.filter((tempFriend) => tempFriend.Id != userProfile!.Id)
    updateFriendRequests(newFriendRequests)
    let newFriends = [...myFriends!]
    newFriends.push(addedFriend)
    updateFriends(newFriends)
  }
  return (
    <>
      {userProfile ? (
        <div className="profile">
          <div className="profile-up">
            <TopModal
              isOpen={isOpen}
              toggleModal={toggleModal}
              children={<span style={{ padding: '0.4rem', color: 'green', textAlign:'center' }}>Do you want to set this image?</span>}
              submitButtonText={"Submit"}
              onSubmit={changeProfileImage} onClose={()=>setChoosenImage(localStorage.getItem('profileImage')!)} />
            <div
              className="profile-up-image"
              style={{ backgroundImage: `url(${choosenImage})` }}
            >
              {relationship == "me" && (
                <span className="profile-up-image-input">
                  <FileInput
                    imageFunction={setChoosenImage}
                    fileFunction={setFile}
                    callback={toggleModal}
                  />
                </span>
              )}
            </div>
            <span className="profile-up-options">
              <span className="profile-up-options-up">
                <img src={choosenImage || `${ReadyImagesURL}/noProfile.jpg`} alt=""/>
                <h4>{userProfile.Email}</h4>
              </span>
              <span className="profile-up-options-down">
                <button className="large-font" onClick={() => setContent("posts")}>Posts</button>
                <button className="large-font" onClick={() => setContent("friends")}>Friends</button>
                {relationship == "stranger" && (
                  <button className="large-font" onClick={sendFriendRequest}>Add friend</button>
                )}
                {relationship == "inFriendRequests" && (
                  <button
                  className="large-font"
                    style={{ backgroundColor: "#89CFF0" }}
                    onClick={cancelFriendRequest}
                  >
                    Cancel request
                  </button>
                )}
                {relationship == "pendingRequest" && (
                  <button
                  className="large-font"
                    style={{ backgroundColor: "#89CFF0" }}
                    onClick={acceptFriendRequest}
                  >
                    Accept request
                  </button>
                )}
              </span>
            </span>
          </div>
          <div className="profile-down">
            {content == "posts" && (
              <>
                <h2>Posts</h2>
                <PostsList posts={posts} />
                <span ref={endOfPostsRef}></span>
                {allPostsFetched && <h2>You have reached end of internet.</h2>}
              </>
            )}
            {content == "friends" && (
              <>
                <h2>Friends</h2>
                <ListOfFriendsInProfile friends={friends} />
              </>
            )}
          </div>
        </div>
      ) : (
        <Waiting message={"Loading..."} />
      )}
    </>
  );
}

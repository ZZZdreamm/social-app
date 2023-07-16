import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import uuid4 from "uuid4";

import PostsList from "../../components/Posts/PostsList";
import ListOfFriendsInProfile from "../../components/Users/ListOfFriendsInProfile";
import { ReadyImagesURL } from "../../globals/appUrls";
import ProfileContext, {
  FriendRequestsContext,
  ProfileFriendsContext,
  SentFriendRequestsContext,
} from "../../services/Contexts/ProfileContext";
import { storageRef } from "../../services/Firebase/FirebaseConfig";
import {
  postDataToServer,
  putDataToServer,
} from "../../services/Firebase/FirebaseFunctions";
import "./style.scss";
import { profileDTO } from "../../services/Models/profiles.models";
import Waiting from "../../_utils/Waiting/indexxx";
import TopModal from "../../_utils/ModalAtTop/ModalAtTop";
import FileInput from "../../_utils/FileInput/FileInput";
import useIsInViewport from "../../_utils/2Hooks/IsInViewPort";


export default function UserProfile() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState<profileDTO>();
  const [content, setContent] = useState("posts");

  useEffect(() => {
    const getUserData = async () => {
      const user: profileDTO = await postDataToServer({ name: id }, "get-user");
      setUserProfile(user);
    };
    getUserData();
  }, [id]);

  return (
    <>
      {userProfile ? (
        <div className="profile">
          <ProfileUp userProfile={userProfile} setContent={setContent} />
          <ProfileDown content={content} userProfile={userProfile} />
        </div>
      ) : (
        <Waiting message={"Loading..."} />
      )}
    </>
  );
}

interface ProfileProps {
  userProfile: profileDTO;
}

interface ProfileUpProps extends ProfileProps {
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const ProfileUp = ({ userProfile, setContent }: ProfileUpProps) => {
  const { myProfile, updateProfile } = useContext(ProfileContext);
  const { myFriends, updateFriends } = useContext(ProfileFriendsContext);
  const { myFriendRequests, updateFriendRequests } = useContext(
    FriendRequestsContext
  );
  const { mySentRequests, updateSentFriendRequests } = useContext(
    SentFriendRequestsContext
  );
  const [relationship, setRelationship] = useState<string>();

  const [file, setFile] = useState<File>();
  const [isOpen, setIsOpen] = useState(false);
  const [choosenImage, setChoosenImage] = useState(
    userProfile?.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`
  );

  useEffect(() => {
    if (!userProfile) return;
    setChoosenImage(
      userProfile?.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`
    );
  }, [userProfile]);

  useEffect(() => {
    checkIfInFriends();
  }, [myProfile, userProfile]);

  async function checkIfInFriends() {
    if (userProfile && userProfile.Id && myProfile && myProfile.Id) {
      const response = await postDataToServer(
        { userId: myProfile.Id, friendId: userProfile!.Id },
        "check-if-in-friends"
      );
      setRelationship(response.relation);
    }
  }

  function toggleModal() {
    setIsOpen(!isOpen);
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
    const addedFriend = await postDataToServer(
      { userId: myProfile.Id, friendId: userProfile!.Id },
      "accept-friend-request"
    );
    const newFriendRequests = myFriendRequests!.filter(
      (tempFriend) => tempFriend.Id != userProfile!.Id
    );
    updateFriendRequests(newFriendRequests);
    let newFriends = [...myFriends!];
    newFriends.push(addedFriend);
    updateFriends(newFriends);
  }

  async function sendFriendRequest() {
    setRelationship("inFriendRequests");
    const friend = await postDataToServer(
      { userId: myProfile.Id, friendId: userProfile!.Id },
      "send-friend-request"
    );
    //@ts-ignore
    updateSentFriendRequests((prev: profileDTO[]) => [friend, ...prev]);
  }
  async function cancelFriendRequest() {
    setRelationship("stranger");
    const { Id } = await postDataToServer(
      { userId: myProfile.Id, friendId: userProfile!.Id },
      "cancel-friend-request/user"
    );
    const newFriends = mySentRequests!.filter(
      (tempFriend) => tempFriend.Id != Id
    );
    updateSentFriendRequests(newFriends);
  }
  return (
    <div className="profile-up">
      <TopModal
        isOpen={isOpen}
        toggleModal={toggleModal}
        children={
          <span
            style={{ padding: "0.4rem", color: "green", textAlign: "center" }}
          >
            Do you want to set this image?
          </span>
        }
        submitButtonText={"Submit"}
        onSubmit={changeProfileImage}
        onClose={() => setChoosenImage(localStorage.getItem("profileImage")!)}
      />
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
          <img src={choosenImage || `${ReadyImagesURL}/noProfile.jpg`} alt="" />
          <h4>{userProfile.Email}</h4>
        </span>
        <span className="profile-up-options-down">
          <button className="large-font" onClick={() => setContent("posts")}>
            Posts
          </button>
          <button className="large-font" onClick={() => setContent("friends")}>
            Friends
          </button>
          {relationship == "stranger" && (
            <button className="large-font" onClick={sendFriendRequest}>
              Add friend
            </button>
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
  );
};

interface ProfileDownProps extends ProfileProps {
  content: string;
}

const ProfileDown = ({ userProfile, content }: ProfileDownProps) => {
  const [friends, setFriends] = useState<profileDTO[]>([]);
  const [posts, setPosts] = useState<postDTO[]>([]);
  const [allPostsFetched, setAllPostsFetched] = useState(false);
  const numberOfPosts = 10;
  const endOfPostsRef = useRef(null);

  useEffect(() => {
    if (!userProfile) return;
    const getData = async () => {
      getPosts(userProfile?.Email);
      setFriends(
        await postDataToServer({ userId: userProfile?.Id }, "get-friends")
      );
    };
    getData();
  }, [userProfile]);

  var scrolledPageBottom = useIsInViewport(endOfPostsRef, "1000px");
  useEffect(() => {
    if (scrolledPageBottom) {
      getPosts(userProfile!.Email);
    }
  }, [scrolledPageBottom]);

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

  return (
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
  );
};

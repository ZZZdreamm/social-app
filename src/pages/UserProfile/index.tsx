import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import "./style.scss";
import { profileDTO } from "../../services/Models/profiles.models";
import Waiting from "../../_utils/Waiting/indexxx";
import TopModal from "../../_utils/ModalAtTop/ModalAtTop";
import FileInput from "../../_utils/FileInput/FileInput";
import useIsInViewport from "../../_utils/2Hooks/IsInViewPort";
import FriendInProfile from "../../components/Users/FriendInProfile";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useWindowSizeChanged from "../../_utils/2Hooks/useWindowSizeChanged";
import ProfileFriendInPosts from "./ProfileFriendInPosts";
import { axiosBasePosts, axiosBaseProfiles } from "../../globals/apiPaths";

gsap.registerPlugin(ScrollTrigger);

export default function UserProfile() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState<profileDTO>();
  const [content, setContent] = useState("posts");

  const [friends, setFriends] = useState<profileDTO[]>([]);

  useEffect(() => {
    if (!userProfile) return;
    const getData = async () => {
      const response = await axiosBaseProfiles.get<profileDTO[]>(
        `getFriends/${userProfile.Id}`
      );
      const friends = response.data;
      setFriends(friends);
    };
    getData();
  }, [userProfile]);

  useEffect(() => {
    const getUserData = async () => {
      const response = await axiosBaseProfiles.get<profileDTO>(`one/${id}`);
      const user = response.data;
      setUserProfile(user);
    };
    getUserData();
  }, [id]);

  return (
    <>
      {userProfile ? (
        <div className="profile">
          <ProfileUp
            userProfile={userProfile}
            setContent={setContent}
            userFriends={friends}
          />
          <ProfileDown
            content={content}
            userProfile={userProfile}
            friends={friends}
          />
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
  userFriends: profileDTO[];
}

const ProfileUp = ({
  userProfile,
  setContent,
  userFriends,
}: ProfileUpProps) => {
  const { myProfile, updateProfile } = useContext(ProfileContext);
  const { myFriends, updateFriends } = useContext(ProfileFriendsContext);
  const { myFriendRequests, updateFriendRequests } = useContext(
    FriendRequestsContext
  );
  const { mySentRequests, updateSentFriendRequests } = useContext(
    SentFriendRequestsContext
  );
  const [relationship, setRelationship] = useState<usersRelation>();

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
      const response = await axiosBaseProfiles.get<usersRelation>(
        `ifInFriends?userId=${myProfile.Id}&friendId=${userProfile.Id}`
      );
      const relation = response.data;
      setRelationship(relation);
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
    const updateProfileDto = {
      Id: myProfile.Id,
      Email: myProfile.Email,
      ProfileImage: url,
    };
    axiosBaseProfiles.patch("update", updateProfileDto);
    localStorage.setItem("profileImage", url);
    updateProfile({
      Id: myProfile.Id,
      Email: myProfile.Email,
      ProfileImage: url,
    });
  }

  async function acceptFriendRequest() {
    const response = await axiosBaseProfiles.patch<profileDTO>(
      `acceptFriendRequest?userId=${myProfile.Id}&friendId=${userProfile!.Id}`
    );
    const addedFriend = response.data;
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
    const response = await axiosBaseProfiles.post<profileDTO>(
      `sendFriendRequest?userId=${myProfile.Id}&friendId=${userProfile!.Id}`
    );
    const friend = response.data;
    //@ts-ignore
    updateSentFriendRequests((prev: profileDTO[]) => [friend, ...prev]);
  }
  async function cancelFriendRequest() {
    setRelationship("stranger");
    const { Id } = (
      await axiosBaseProfiles.delete<{ Id: string }>("removeFriendRequest")
    ).data;
    const newFriends = mySentRequests!.filter(
      (tempFriend) => tempFriend.Id != Id
    );
    updateSentFriendRequests(newFriends);
  }
  return (
    <div id="profile-up" className="profile-up">
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
          <div className="flex-column">
            <span className="bolder large-font" style={{ textAlign: "left" }}>
              {userProfile.Email}
            </span>
            <span className="medium-font left-align hover-underline">
              {userFriends?.length} friends
            </span>
          </div>
        </span>
        <span className="profile-up-options-down">
          <button className="large-font" onClick={() => setContent("posts")}>
            Posts
          </button>
          <button className="large-font" onClick={() => setContent(`friends`)}>
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
              style={{ backgroundColor: "var(--testColor3)" }}
              onClick={cancelFriendRequest}
            >
              Cancel request
            </button>
          )}
          {relationship == "pendingRequest" && (
            <button
              className="large-font"
              style={{ backgroundColor: "var(--testColor3)" }}
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
  friends: profileDTO[];
}

const ProfileDown = ({ userProfile, content, friends }: ProfileDownProps) => {
  const [posts, setPosts] = useState<postDTO[]>([]);
  const [allPostsFetched, setAllPostsFetched] = useState(false);
  const numberOfPosts = 10;
  const endOfPostsRef = useRef(null);

  useEffect(() => {
    if (!userProfile) return;
    const getData = async () => {
      getPosts(userProfile?.Email);
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
    const response = await axiosBasePosts.get<postDTO[]>(
      `userPosts/${username}?amount=${postsToGet}`
    );
    const newPosts = response.data;
    if (newPosts) {
      if (newPosts.length == posts.length) {
        setAllPostsFetched(true);
      } else {
        setPosts(newPosts);
      }
    }
  }

  const nineFriends = friends?.slice(0, 9);

  // useEffect(() => {
  //   if(!nineFriends) return;
  //   const scrollTrigger = ScrollTrigger.create({
  //     trigger: "#profile-posts",
  //     start: "top top",
  //     endTrigger: "#profile-posts",
  //     end: "bottom bottom",
  //     pin: "#profile-friends",
  //     pinSpacing: false,
  //     markers: true
  //   });

  // }, [nineFriends]);
  const windowSize = useWindowSizeChanged(() => {});

  return (
    <div className="profile-down">
      {content == "posts" && (
        <div id="profile-posts" className="profile-down-posts">
          {nineFriends && windowSize.width > 700 && (
            <section
              id="profile-friends"
              className="profile-down-posts-container padding-1"
            >
              <div className="padding-1 flex-column">
                <span className="bold large-font">Friends</span>
                <span className="medium-font hover-underline">
                  {friends?.length} friends
                </span>
              </div>
              <div className="profile-down-posts-container-friends">
                {nineFriends?.map((friend) => (
                  <div style={{ width: "30%" }}>
                    <FriendInProfile friend={friend} />
                  </div>
                ))}
              </div>
            </section>
          )}
          <section className="flex-column gap-1">
            <div className="profile-down-posts-header large-font bold">
              Posts
            </div>
            <PostsList posts={posts} setPosts={setPosts} />
            <span ref={endOfPostsRef}></span>
            {allPostsFetched && <h2>There is no posts.</h2>}
          </section>
        </div>
      )}
      {content == "friends" && (
        <section className="profile-down-friends">
          <article>
            <h2>Friends</h2>
            <div className="profile-down-friends-container">
              {friends?.map((friend) => (
                <ProfileFriendInPosts friend={friend} />
              ))}
              {friends?.length == 0 && <h3>User doesn't have friends.</h3>}
            </div>
          </article>
        </section>
      )}
    </div>
  );
};

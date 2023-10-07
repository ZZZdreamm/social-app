import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import uuid4 from "uuid4";
import PostsList from "../../components/Posts/PostsList";
import { ReadyImagesURL } from "../../globals/appUrls";
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
import { axiosBase } from "../../globals/apiPaths";
import { useProfilesRelationsContext } from "../../services/Contexts/ProfileDataContext";
import { useInfinitePosts } from "../../hooks/useInfinitePosts";
import { getUserPosts } from "../../apiFunctions/getUserPosts";
import { useAuthenticationContext } from "../../services/Contexts/AuthenticationContext";

gsap.registerPlugin(ScrollTrigger);

export default function UserProfile() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState<profileDTO>();
  const [content, setContent] = useState("posts");

  const [friends, setFriends] = useState<profileDTO[]>([]);

  useEffect(() => {
    if (!userProfile) return;
    const getData = async () => {
      const response = await axiosBase.get<profileDTO[]>(
        `profiles/getFriends/${userProfile.Id}`
      );
      const friends = response.data;
      setFriends(friends);
    };
    getData();
  }, [userProfile]);

  useEffect(() => {
    const getUserData = async () => {
      const response = await axiosBase.get<profileDTO>(`profiles/one/${id}`);
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
  const { profile, setProfile } = useAuthenticationContext();
  const {
    friends,
    friendsRequests,
    sentFriendsRequests,
    setFriends,
    setFriendsRequests,
    setSentFriendsRequests,
  } = useProfilesRelationsContext();
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
  }, [profile, userProfile, checkIfInFriends]);

  async function checkIfInFriends() {
    if (userProfile && userProfile.Id && profile && profile?.Id) {
      const response = await axiosBase.get<usersRelation>(
        `profiles/ifInFriends?userId=${profile?.Id}&friendId=${userProfile.Id}`
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
      Id: profile?.Id,
      Email: profile?.Email,
      ProfileImage: url,
    };
    await axiosBase.patch("profiles/update", updateProfileDto);
    localStorage.setItem("profileImage", url);
    setProfile({
      Id: profile?.Id ?? "",
      Email: profile?.Email ?? "",
      ProfileImage: url,
    });
  }

  async function acceptFriendRequest() {
    const response = await axiosBase.patch<profileDTO>(
      `profiles/acceptFriendRequest?userId=${profile?.Id}&friendId=${
        userProfile!.Id
      }`
    );
    const addedFriend = response.data;
    const newFriendRequests = friendsRequests!.filter(
      (tempFriend) => tempFriend.Id != userProfile!.Id
    );
    setFriendsRequests(newFriendRequests);
    let newFriends = [...friends!];
    newFriends.push(addedFriend);
    setFriends(newFriends);
  }

  async function sendFriendRequest() {
    setRelationship("inFriendRequests");
    const response = await axiosBase.post<profileDTO>(
      `profiles/sendFriendRequest?userId=${profile?.Id}&friendId=${
        userProfile!.Id
      }`
    );
    const friend = response.data;
    //@ts-ignore
    setSentFriendsRequests((prev: profileDTO[]) => [friend, ...prev]);
  }
  async function cancelFriendRequest() {
    setRelationship("stranger");
    const { Id } = (
      await axiosBase.delete<{ Id: string }>(
        `profiles/removeFriendRequest?userId=${profile?.Id}&friendId=${userProfile.Id}`
      )
    ).data;
    const newFriends = sentFriendsRequests!.filter(
      (tempFriend) => tempFriend.Id != Id
    );
    setSentFriendsRequests(newFriends);
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
  const endOfPostsRef = useRef(null);
  const { posts, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfinitePosts(
      getUserPosts,
      `userPosts/${userProfile.Id}`,
      userProfile?.Email
    );

  useEffect(() => {
    if (!userProfile) return;
    fetchNextPage();
  }, [userProfile]);

  var scrolledPageBottom = useIsInViewport(endOfPostsRef, "1000px");
  useEffect(() => {
    if (scrolledPageBottom) {
      fetchNextPage();
    }
  }, [scrolledPageBottom]);

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
            <PostsList posts={posts} queryName={"userPosts"} />
            <span ref={endOfPostsRef}></span>
            {isFetchingNextPage && <Waiting message={"Loading..."} />}
            {!hasNextPage && <h2>You have reached end of internet.</h2>}
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

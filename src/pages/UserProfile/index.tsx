import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { ImagesInPostSection } from "./ImagesInPostSection";
import {
  convertRemToPixels,
  convertVhToPixels,
} from "../../_utils/1Functions/ConvertToPx";
import { UserProfileSkeleton } from "./skeleton";

gsap.registerPlugin(ScrollTrigger);

export default function UserProfile() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState<profileDTO>();
  const [content, setContent] = useState("posts");
  const [friends, setFriends] = useState<profileDTO[]>();
  const { profile } = useAuthenticationContext();
  const [relationship, setRelationship] = useState<usersRelation>();
  const { posts, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfinitePosts(
      getUserPosts,
      `userPosts/${userProfile?.Id}`,
      userProfile?.Email
    );

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
      {userProfile && relationship && friends && posts && (posts.length > 0 || !hasNextPage) ? (
        <div className="profile">
          <ProfileUp
            userProfile={userProfile}
            setContent={setContent}
            userFriends={friends}
            relationship={relationship}
            setRelationship={setRelationship}
          />
          <ProfileDown
            content={content}
            userProfile={userProfile}
            friends={friends}
            relationship={relationship}
            posts={posts}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
          />
        </div>
      ) : (
        <UserProfileSkeleton />
      )}
    </>
  );
}

interface ProfileProps {
  userProfile: profileDTO;
  relationship?: usersRelation;
}

interface ProfileUpProps extends ProfileProps {
  setContent: React.Dispatch<React.SetStateAction<string>>;
  userFriends: profileDTO[];
  setRelationship: React.Dispatch<
    React.SetStateAction<usersRelation | undefined>
  >;
}

const ProfileUp = ({
  userProfile,
  setContent,
  userFriends,
  relationship,
  setRelationship,
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
  posts: postDTO[] | undefined;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
}

const scrollTriggerProps: ScrollTrigger.StaticVars = {
  id: "profile-friends",
  // trigger: "#profile-down",
  // start: () => `top-=${convertRemToPixels(2) + convertVhToPixels(6)}px top`,
  trigger: "#profile-friends",
  start: () => `bottom bottom-=${convertRemToPixels(1)}px`,
  endTrigger: "body",
  end: () => "max",
  pin: "#profile-friends",
  pinSpacing: false,
  scrub: true,
  toggleActions: "play none reverse none",
  invalidateOnRefresh: true,
};

const ProfileDown = ({
  userProfile,
  content,
  friends,
  relationship,
  posts,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}: ProfileDownProps) => {
  const navigate = useNavigate();
  const endOfPostsRef = useRef(null);
  const postedImages: unknown[] | undefined = posts
    ?.map((post) => post.MediaFiles)
    .flat()
    .slice(0, 9);

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
  const windowSize = useWindowSizeChanged(() => {});

  useEffect(() => {
    // gsap.set(".profile-down-posts-container", {
    //   zIndex: (i, target, targets) => targets.length - i,
    // });
    // var images: any[] = gsap.utils.toArray(
    //   ".profile-down-posts-container"
    // );
    // images.forEach((image: any, i) => {
    //   var tl = gsap.timeline({
    //     scrollTrigger: {
    //       trigger: "#profile-friends",
    //       start: () => "top -" + window.innerHeight * (i + 0.5),
    //       end: () => "+=" + window.innerHeight,
    //       scrub: true,
    //       toggleActions: "play none reverse none",
    //       invalidateOnRefresh: true,
    //     },
    //   });
    //   tl.to(image, { height: 0 });
    // });

    ScrollTrigger.create({
      ...scrollTriggerProps,
    });

    window.addEventListener("resize", handleResizeForScrollTrigger);
  }, []);

  useEffect(() => {
    if (!posts) return;
    ScrollTrigger.refresh();
  }, [posts]);

  useEffect(() => {
    handleResizeForScrollTrigger();
  }, [userProfile, content]);

  const handleResizeForScrollTrigger = () => {
    ScrollTrigger.getById("profile-friends")?.kill();
    ScrollTrigger.create(scrollTriggerProps);
  };

  const goToFriendsSection = () => {
    navigate(`/user-friends/${userProfile.Id}`);
  };

  const goToFriendRequestsSection = () => {
    navigate(`/user-friend-requests/${userProfile.Id}`);
  };

  const goToSentFriendRequestsSection = () => {
    navigate(`/user-sent-friend-requests/${userProfile.Id}`);
  };

  return (
    <div id="profile-down" className="profile-down">
      {content == "posts" && (
        <div id="profile-posts" className="profile-down-posts">
          {nineFriends && windowSize.width > 700 && (
            <div id="profile-friends-container">
              <section id="profile-friends">
                <article className="profile-down-posts-container shadow-around mb-1">
                  <div className="padding-1 flex-column gap-1">
                    <span className="bold large-font">Relations</span>
                    <span
                      className="relationOption"
                      onClick={goToFriendsSection}
                    >
                      Friends
                    </span>
                    {relationship == "me" && (
                      <>
                        <span
                          className="relationOption"
                          onClick={goToFriendRequestsSection}
                        >
                          Friends Requests
                        </span>
                        <span
                          className="relationOption"
                          onClick={goToSentFriendRequestsSection}
                        >
                          Sent Friends Requests
                        </span>
                      </>
                    )}
                  </div>
                </article>
                <article className="profile-down-posts-container shadow-around mb-1 images">
                  <div className="padding-1 flex-column">
                    <div className="flex-between">
                      <span className="bold large-font">Images</span>
                      <span className="hyperLink" onClick={() => {}}>
                        Show all images
                      </span>
                    </div>
                  </div>
                  <ImagesInPostSection images={postedImages as string[]} />
                </article>
                <article className="profile-down-posts-container shadow-around">
                  <div className="padding-1 flex-column">
                    <div className="flex-between">
                      <span className="bold large-font">Friends</span>
                      <span className="hyperLink" onClick={goToFriendsSection}>
                        Show all friends
                      </span>
                    </div>
                    <span className="hover-underline auto-width">
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
                </article>
              </section>
            </div>
          )}
          <section className="flex-column gap-1">
            <div className="profile-down-posts-header large-font bold">
              Posts
            </div>
            <PostsList
              posts={posts}
              queryName={`userPosts/${userProfile.Id}`}
            />
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

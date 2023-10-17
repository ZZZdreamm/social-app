import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PostsList from "../../components/Posts/PostsList";
import "./style.scss";
import { profileDTO } from "../../services/Models/profiles.models";
import Waiting from "../../_utils/Waiting/indexxx";
import useIsInViewport from "../../_utils/2Hooks/IsInViewPort";
import FriendInProfile from "../../components/Users/FriendInProfile";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useWindowSizeChanged from "../../_utils/2Hooks/useWindowSizeChanged";
import ProfileFriendInPosts from "./ProfileFriendInPosts";
import { ImagesInPostSection } from "./ImagesInPostSection";
import { convertRemToPixels } from "../../_utils/1Functions/ConvertToPx";
import { ProfileProps } from ".";

gsap.registerPlugin(ScrollTrigger);

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

export const ProfileDown = ({
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
    if (posts && posts.length > 0) return;
    fetchNextPage();
  }, [userProfile]);

  var scrolledPageBottom = useIsInViewport(endOfPostsRef, "1000px");
  useEffect(() => {
    if (scrolledPageBottom) {
      fetchNextPage();
    }
  }, [scrolledPageBottom]);

  const nineFriends = friends?.slice(0, 9);
  const windowSize = useWindowSizeChanged({ callback: () => {} });

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
      {content === "posts" && (
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
                    {relationship === "me" && (
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
      {content === "friends" && (
        <section className="profile-down-friends">
          <article>
            <h2>Friends</h2>
            <div className="profile-down-friends-container">
              {friends?.map((friend) => (
                <ProfileFriendInPosts friend={friend} />
              ))}
              {friends?.length === 0 && <h3>User doesn't have friends.</h3>}
            </div>
          </article>
        </section>
      )}
    </div>
  );
};

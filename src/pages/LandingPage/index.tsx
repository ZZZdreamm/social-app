import { useEffect, useRef, useState } from "react";
import PostForm from "../../components/Posts/PostForm";
import PostsList from "../../components/Posts/PostsList";
import Login from "../Login";
import RightBar from "../../components/MainComponents/Bars/RightBar";
import "./style.scss";
import useIsInViewport from "../../_utils/2Hooks/IsInViewPort";
import Authorized from "../../globals/Auth/Authorized";
import { getPosts } from "../../apiFunctions/getPosts";
import { useInfinitePosts } from "../../hooks/useInfinitePosts";
import Waiting from "../../_utils/Waiting/indexxx";
import { useAuthenticationContext } from "../../services/Contexts/AuthenticationContext";
import { LandingPageSkeleton } from "./skeleton";
import { useProfilesRelationsContext } from "../../services/Contexts/ProfileDataContext";
import { ReelsPanel } from "../../components/reelsPanel/ReelsPanel";

export default function LandingPage() {
  const { profile } = useAuthenticationContext();
  const { friends, fetchedFriendsAfterMount } = useProfilesRelationsContext();
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const {
    posts,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetchedAfterMount,
  } = useInfinitePosts(getPosts, "landingPagePosts");

  const endOfPostsRef = useRef(null);

  useEffect(() => {
    if (!profile?.Id) return;
    if (posts && posts.length > 0) return;
    fetchNextPage();
  }, [profile, posts, fetchNextPage]);

  var scrolledPageBottom = useIsInViewport(endOfPostsRef, "1000px");
  useEffect(() => {
    if (scrolledPageBottom) {
      fetchNextPage();
    }
  }, [scrolledPageBottom, fetchNextPage]);

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, []);

  const showRightBar = windowSize > 700 ? true : false;
  return (
    <>
      <Authorized
        isAuthorized={
          <>
            {
            // (isFetchedAfterMount && fetchedFriendsAfterMount) ||
            (friends && friends?.length > 0 && posts && posts.length > 300) ? (
              <>
                <div className="middle-content">
                  <ReelsPanel queryName={"landingPageReels"} />
                  <PostForm queryName={"landingPagePosts"} />
                  <PostsList posts={posts} queryName={"landingPagePosts"} />
                  <span ref={endOfPostsRef}></span>
                  {isFetchingNextPage && <Waiting message={"Loading..."} />}
                  {!hasNextPage && <h2>You have reached end of internet.</h2>}
                </div>

                {showRightBar && <RightBar />}
              </>
            ) : (
              <LandingPageSkeleton />
            )}
          </>
        }
        notAuthorized={
          <div className="notLogged" data-testid="notLogged">
            <Login />
          </div>
        }
      />
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import PostForm from "../../components/Posts/PostForm";
import PostsList from "../../components/Posts/PostsList";
import Login from "../Login";
import RightBar from "../../components/MainComponents/Bars/RightBar";
import "./style.scss";
import useIsInViewport from "../../_utils/2Hooks/IsInViewPort";
import Authorized from "../../globals/Auth/Authorized";
import { useProfilesRelationsContext } from "../../services/Contexts/ProfileDataContext";
import { getPosts } from "../../apiFunctions/getPosts";
import { useInfinitePosts } from "../../hooks/useInfinitePosts";
import Waiting from "../../_utils/Waiting/indexxx";

export default function LandingPage() {
  const { profile } = useProfilesRelationsContext();
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const endOfPostsRef = useRef(null);
  const { posts, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfinitePosts(getPosts, "landingPagePosts");

  useEffect(() => {
    if (!profile?.Id) return;
    fetchNextPage();
  }, [profile]);

  var scrolledPageBottom = useIsInViewport(endOfPostsRef, "1000px");
  useEffect(() => {
    if (scrolledPageBottom) {
      fetchNextPage();
    }
  }, [scrolledPageBottom]);

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, [window.innerWidth]);

  const showRightBar = windowSize > 700 ? true : false;
  return (
    <>
      <Authorized
        isAuthorized={
          <>
            <div className="middle-content">
              <PostForm queryName={"landingPagePosts"} />
              <PostsList posts={posts} queryName={"landingPagePosts"} />
              <span ref={endOfPostsRef}></span>
              {isFetchingNextPage && <Waiting message={"Loading..."} />}
              {!hasNextPage && <h2>You have reached end of internet.</h2>}
            </div>
            {showRightBar && <RightBar />}
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

import { useContext, useEffect, useRef, useState } from "react";
import PostForm from "../../components/Posts/PostForm";
import PostsList from "../../components/Posts/PostsList";
import Login from "../Login";
import RightBar from "../../components/MainComponents/Bars/RightBar";

import "./style.scss";
import useIsInViewport from "../../_utils/2Hooks/IsInViewPort";
import Authorized from "../../globals/Auth/Authorized";
// import { axiosBasePosts } from "../../globals/apiPaths";
import ProfileContext from "../../services/Contexts/ProfileContext";
import { axiosBase } from "../../globals/apiPaths";

export default function LandingPage() {
  const { myProfile } = useContext(ProfileContext);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [posts, setPosts] = useState<postDTO[]>();
  const [allPostsFetched, setAllPostsFetched] = useState(false);
  const endOfPostsRef = useRef(null);
  let numberOfPosts = 10;

  useEffect(() => {
    if (!myProfile.Id) return;
    getPosts();
  }, [myProfile]);

  var scrolledPageBottom = useIsInViewport(endOfPostsRef, "1000px");
  useEffect(() => {
    if (scrolledPageBottom) {
      getPosts();
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

  async function getPosts() {
    const postsToGet = posts ? posts?.length + numberOfPosts : numberOfPosts;
    const newPosts = (await axiosBase.get<postDTO[]>(`posts/all/${postsToGet}`))
      .data;
    if (newPosts && newPosts.length != 0) {
      if (posts && newPosts.length == posts.length) {
        setAllPostsFetched(true);
      } else {
        setPosts(newPosts);
      }
    }
  }

  const showRightBar = windowSize > 700 ? true : false;
  return (
    <>
      <Authorized
        isAuthorized={
          <>
            <div className="middle-content">
              <PostForm setPosts={setPosts} />
              <PostsList posts={posts} setPosts={setPosts} />
              <span ref={endOfPostsRef}></span>
              {allPostsFetched && <h2>You have reached end of internet.</h2>}
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

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postDataToServer } from "../../Firebase/FirebaseFunctions";
import PostForm from "../../Posts/PostForm";
import PostsList from "../../Posts/PostsList";
import useIsInViewport from "../../ZZZ_USEFUL COMPONENTS/Utilities/IsInViewPort";
import { ReadyImagesURL } from "../../ZZZ_USEFUL COMPONENTS/appUrls";
import Authorized from "../../ZZZ_USEFUL COMPONENTS/auth/Authorized";
import Login from "../../ZZZ_USEFUL COMPONENTS/auth/Login";
import RightBar from "../Bars/RightBar";

import "./style.scss"

export default function LandingPage() {
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [posts, setPosts] = useState<postDTO[]>();
  const [allPostsFetched, setAllPostsFetched] = useState(false);
  const endOfPostsRef = useRef(null);
  let numberOfPosts = 10;

  useEffect(() => {
    getPosts();
  }, []);

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
    const newPosts = await postDataToServer(
      { numberOfPosts: postsToGet },
      "get-posts"
    );
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
              <PostsList posts={posts} />
              <span ref={endOfPostsRef}></span>
              {allPostsFetched && <h2>You have reached end of internet.</h2>}
            </div>
            {showRightBar && <RightBar />}
          </>
        }
        notAuthorized={
          <div className="notLogged" data-testid="notLogged">
            <img src={`${ReadyImagesURL}/logo.png`} alt="" />
            <span className="notLogged-logging">
              <Login />
              <div>
                No account?{" "}
                <span className="link" onClick={() => navigate("/register")}>
                  Register here!
                </span>
              </div>
            </span>
          </div>
        }
      />
    </>
  );
}

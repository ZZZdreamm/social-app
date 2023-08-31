import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addItemToState } from "../../../_utils/1Functions/StateModifications";
import useDebounce from "../../../_utils/2Hooks/useDebounce";
import ScrollingMediaFiles from "../../../_utils/ScrollingMediaFiles";
import Textarea from "../../../_utils/Textarea";
import { ReadyImagesURL } from "../../../globals/appUrls";
import ProfileContext from "../../../services/Contexts/ProfileContext";
import {
  deleteDataOnServer,
  postDataToServer,
  putDataToServer,
} from "../../../services/Firebase/FirebaseFunctions";
import ListOfComments from "../../Comments/ListOfComments";
import "./style.scss";
import OpenedPostForm from "../PostForm/OpenedForm";
import { getStringBetweenPercentSigns } from "../../../_utils/1Functions/StringManipulations";
import { set } from "cypress/types/lodash";
import { ProfileImage } from "../../ProfileImage/ProfileImage";

interface PostContainerProps {
  post: postDTO;
  setPosts: (posts: postDTO[]) => void;
}

export default function PostContainer({ post, setPosts }: PostContainerProps) {
  const [amountOfLikes, setAmountOfLikes] = useState(post.AmountOfLikes);
  const [amountOfComments, setAmountOfComments] = useState(
    post.AmountOfComments
  );
  const [showComments, setShowComments] = useState(false);

  function updateShowComments() {
    setShowComments(!showComments);
  }

  return (
    <div className="post shadow-around">
      <PostProfile post={post} setPosts={setPosts} />
      <PostContent post={post} />
      <div className="post-bottom">
        <PostBottomUpperPart
          amountOfLikes={amountOfLikes}
          amountOfComments={amountOfComments}
        />
        <div className="post-bottom-down">
          <Like
            post={post}
            amountOfLikes={amountOfLikes}
            setAmountOfLikes={setAmountOfLikes}
          />
          <button onClick={updateShowComments}>Comment it</button>
        </div>
      </div>
      <Comments
        showComments={showComments}
        post={post}
        setAmountOfComments={setAmountOfComments}
      />
    </div>
  );
}

interface PostProps {
  post: postDTO;
}

interface PostProfileProps extends PostProps {
  setPosts: (posts: postDTO[]) => void;
}

const PostProfile = ({ post, setPosts }: PostProfileProps) => {
  const navigate = useNavigate();

  const goToProfile = () => {
    if (post.AutorId) {
      navigate(`/user-profile/${post.AutorId}`);
    }
  };

  return (
    <div className="post-profile">
      <ProfileImage imageURL={post.AutorProfileImage} onClick={goToProfile}/>
      <span className="flexColumnLeft" style={{ maxWidth: "60%" }}>
        <span className="elipsis" style={{ maxWidth: "100%" }}>
          {post.AutorName}
        </span>
        <span className="medium-font">
          Last edit: {new Date(post.Date).toLocaleDateString()}
          {", "}
          {new Date(post.Date).toLocaleTimeString()}
        </span>
      </span>

      <PostProfileOptions post={post} setPosts={setPosts} />
    </div>
  );
};

const PostProfileOptions = ({ post, setPosts }: PostProfileProps) => {
  const { myProfile } = useContext(ProfileContext);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  function toggleOptions() {
    setOptionsOpen(!optionsOpen);
  }

  useEffect(() => {
    window.addEventListener("click", (e: any) => {
      if (
        e.target?.id.includes(`post-profile-options/${post.Id}`) ||
        e.target?.id.includes(`post-profile-options__list/${post.Id}`)
      )
        return;
      setOptionsOpen(false);
    });
  }, []);

  async function deletePost() {
    const response = await deleteDataOnServer("delete-post", {
      postId: post.Id.toString(),
    });
    if (response.status === "success") {
      //@ts-ignore
      setPosts((posts) => posts.filter((p) => p.Id != post.Id));
      console.log("deleted");
    } else if (response.status === "error") {
      alert("Something went wrong, try again later");
    }
  }
  async function toggleEditPostForm() {
    setEditOpen(!editOpen);
  }

  function submitEditionOfPost(post: postDTO) {
    console.log(post);
    postDataToServer(post, "edit-post").then((response) => {
      //@ts-ignore
      setPosts((posts: postDTO[]) =>
        posts.map((p) => {
          console.log(p.Id, response.post.Id);
          if (p.Id === response.post.Id) {
            return response.post;
          }
          return p;
        })
      );
    });
  }

  const postFilesArray: [File, string][] | undefined = post.MediaFiles?.map(
    (url) => {
      return [new File([], getStringBetweenPercentSigns(url)), url];
    }
  );
  return (
    <div
      id={`post-profile-options/${post.Id}`}
      className="post-profile-options"
      style={{ backgroundImage: `url(${ReadyImagesURL}/moreOptions.png)` }}
      onClick={toggleOptions}
    >
      {optionsOpen && (
        <div
          id={`post-profile-options__list/${post.Id}`}
          className="post-profile-options__list shadow-around medium-font"
        >
          {post.AutorId === myProfile.Id && (
            <>
              <div
                className="post-profile-options__list__child"
                onClick={deletePost}
              >
                Delete
              </div>
              <div
                className="post-profile-options__list__child"
                onClick={toggleEditPostForm}
              >
                Edit
              </div>
            </>
          )}
          {post.AutorId !== myProfile.Id && (
            <div className="post-profile-options__list__child">
              Report (doesnt work)
            </div>
          )}
        </div>
      )}
      {editOpen && (
        <OpenedPostForm
          key="edit"
          setPosts={setPosts}
          isOpen={editOpen}
          toggleModal={toggleEditPostForm}
          onSubmit={submitEditionOfPost}
          currentPost={{
            filesArray: postFilesArray,
            text: post.TextContent,
            postId: post.Id,
            amountOfLikes: post.AmountOfLikes,
            amountOfComments: post.AmountOfComments,
            AutorProfileImage: post.AutorProfileImage,
            AutorName: post.AutorName,
          }}
          headerTitle="Edit Post"
        />
      )}
    </div>
  );
};

interface PostContentProps extends PostProps {}

const PostContent = ({ post }: PostContentProps) => {
  const [textOverflown, setTextOverflown] = useState(false);
  const [partOfTextContent, setPartOfTextContent] = useState<string>("");

  useEffect(() => {
    if (post.TextContent?.length > 100) {
      setPartOfTextContent(post.TextContent?.slice(0, 50));
      setTextOverflown(true);
    }
  }, []);

  function showMoreText() {
    setTextOverflown(false);
  }
  return (
    <div className="post-content">
      {post.TextContent && (
        <span className="post-content-text">
          {textOverflown ? (
            <>
              {partOfTextContent}
              <span className="show-text" onClick={() => showMoreText()}>
                ...Show more
              </span>
            </>
          ) : (
            post.TextContent
          )}
        </span>
      )}
      <ScrollingMediaFiles mediaFiles={post.MediaFiles} />
    </div>
  );
};

interface PostBottomUpperPartProps {
  amountOfLikes: number;
  amountOfComments: number;
}

const PostBottomUpperPart = ({
  amountOfLikes,
  amountOfComments,
}: PostBottomUpperPartProps) => {
  return (
    <div className="post-bottom-up">
      <div className="option">
        <img src={`${ReadyImagesURL}/like.png`} alt="" />
        <span className="large-font">{amountOfLikes}</span>
      </div>
      <div className="option">
        <span className="large-font">{amountOfComments} comments</span>
      </div>
    </div>
  );
};

interface LikeProps extends PostProps {
  amountOfLikes: number;
  setAmountOfLikes: React.Dispatch<React.SetStateAction<number>>;
}

const Like = ({ post, amountOfLikes, setAmountOfLikes }: LikeProps) => {
  const { myProfile } = useContext(ProfileContext);
  const [youLiked, setYouLiked] = useState<boolean>();
  const [clicked, setClicked] = useState(false);
  const debouncedAmountOfLikes = useDebounce(amountOfLikes, 1000);

  useEffect(() => {
    checkIfUserLiked();
  }, []);

  async function checkIfUserLiked() {
    setYouLiked(
      await postDataToServer(
        { postId: post.Id, userId: myProfile.Id },
        "user-liked-post"
      )
    );
  }

  useEffect(() => {
    if (clicked) {
      likePost();
    }
  }, [debouncedAmountOfLikes]);

  async function likePost() {
    if (youLiked) {
      putDataToServer({ postId: post.Id, userId: myProfile.Id }, "like-post");
    } else {
      putDataToServer(
        { postId: post.Id, userId: myProfile.Id },
        "like-post-remove"
      );
    }
  }
  function updateLikeState() {
    if (!youLiked) {
      setAmountOfLikes((amountOfLikes) => amountOfLikes + 1);
      setYouLiked(true);
    } else {
      setAmountOfLikes((amountOfLikes) => amountOfLikes - 1);
      setYouLiked(false);
    }
    setClicked(true);
  }

  const likeColor = youLiked ? "var(--testColor3)" : "";

  return (
    <button
      disabled={youLiked === undefined}
      style={{ backgroundColor: likeColor }}
      onClick={updateLikeState}
    >
      I like it!
    </button>
  );
};

interface CommentsProps {
  post: postDTO;
  showComments: boolean;
  setAmountOfComments: React.Dispatch<React.SetStateAction<number>>;
}

const Comments = ({
  post,
  showComments,
  setAmountOfComments,
}: CommentsProps) => {
  const { myProfile } = useContext(ProfileContext);
  const [comments, setComments] = useState<commentsDTO[]>();
  const [commentText, setCommentText] = useState("");
  const [allCommentsFetched, setAllCommentsFetched] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const commentsToGetNumber = 10;

  useEffect(() => {
    if (showComments === undefined) return;
    if (showComments == false) {
      if (!comments) {
        getComments(commentsToGetNumber);
      }
    }
  }, [showComments]);

  async function postComment() {
    setAmountOfComments((amountOfComments: number) => amountOfComments + 1);
    let comment = await postDataToServer(
      {
        postId: post.Id,
        userId: myProfile.Id,
        textContent: commentText,
        autorName: myProfile.Email,
        date: Date.now(),
      },
      "put-comment"
    );
    comment["AutorProfileImage"] = myProfile.ProfileImage;
    addItemToState(comment, setComments);
    setCommentText("");
  }

  async function getComments(numberOfComments: number) {
    const newComments = await postDataToServer(
      { postId: post.Id, numberOfComments: numberOfComments },
      "get-comments"
    );
    if (comments?.length == newComments.length) {
      setAllCommentsFetched(true);
    } else {
      setComments(newComments);
    }
  }
  function showMoreComments() {
    getComments(comments?.length! + commentsToGetNumber);
  }

  const commentDisabled = commentText?.length == 0;

  const sendImage = commentDisabled
    ? `${ReadyImagesURL}/cant-sendBtn.png`
    : `${ReadyImagesURL}/sendBtn.png`;

  return (
    <>
      {showComments && (
        <div className="post-comments">
          <div className="post-comments-input">
            <img
              className="post-comments-input__profile"
              src={myProfile.ProfileImage}
              alt=""
            />
            <div className="commentText">
              <Textarea
                ref={inputRef}
                text={commentText}
                setText={setCommentText}
                placeholder={"Write a comment..."}
              />
              <div className="commentText-submit">
                <span></span>
                <button
                  disabled={commentDisabled}
                  type="submit"
                  onClick={postComment}
                  style={{
                    backgroundImage: `url(${sendImage})`,
                    backgroundSize: "cover",
                  }}
                >
                  {""}
                </button>
              </div>
            </div>
          </div>
          {comments && <ListOfComments comments={comments} />}
          {comments?.length != 0 && !allCommentsFetched ? (
            <span className="post-comments-more" onClick={showMoreComments}>
              Show more...
            </span>
          ) : (
            <span>There are no more comments</span>
          )}
        </div>
      )}
    </>
  );
};

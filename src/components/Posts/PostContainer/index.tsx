import "./style.scss";
import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { ReadyImagesURL } from "../../../globals/appUrls";
import ProfileContext from "../../../services/Contexts/ProfileContext";
import {
  postDataToServer,
  putDataToServer,
} from "../../../services/Firebase/FirebaseFunctions";
import ListOfComments from "../../Comments/ListOfComments";
import { addItemToState } from "../../../_utils/1Functions/StateModifications";
import ScrollingMediaFiles from "../../../_utils/ScrollingMediaFiles";
import useDebounce from "../../../_utils/2Hooks/useDebounce";

interface PostContainerProps {
  post: postDTO;
}

export default function PostContainer({ post }: PostContainerProps) {
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
      <PostProfile post={post}/>
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

interface PostProfileProps extends PostProps {}

const PostProfile = ({ post }: PostProfileProps) => {
  const autorImage =
    post.AutorProfileImage || `${ReadyImagesURL}/noProfile.jpg`;
  return (
    <div className="post-profile">
      <img src={autorImage} alt="" />
      <span className="flexColumnLeft">
        {post.AutorName}
        <br />
        <span className="medium-font">
          {new Date(post.Date).toLocaleDateString()}
          {", "}
          {new Date(post.Date).toLocaleTimeString()}
        </span>
      </span>
    </div>
  );
};

interface PostContentProps extends PostProps {}

const PostContent = ({ post }: PostContentProps) => {
  const [textOverflown, setTextOverflown] = useState(false);
  const [partOfTextContent, setPartOfTextContent] = useState<string>("");

  useEffect(() => {
    if (post.TextContent.length > 100) {
      setPartOfTextContent(post.TextContent.slice(0, 50));
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

  const likeColor = youLiked ? "#89CFF0" : "";

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

  const commentDisabled = commentText.length == 0;

  return (
    <>
      {showComments && (
        <div className="post-comments">
          <span className="post-comments-input">
            <textarea
              className="commentText-textarea"
              value={commentText}
              onInput={(e: any) => setCommentText(e.target.value)}
            />
            <button
              disabled={commentDisabled}
              type="submit"
              onClick={postComment}
            >
              Post comment
            </button>
          </span>
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

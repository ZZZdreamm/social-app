import { useContext, useEffect, useRef, useState } from "react";
import { ReadyImagesURL } from "../ZZZ_USEFUL COMPONENTS/appUrls";
import ProfileContext from "../ZZZ_USEFUL COMPONENTS/Profile/ProfileContext";
import {
  postDataToServer,
  putDataToServer,
} from "../Firebase/FirebaseFunctions";
import useDebounce from "../ZZZ_USEFUL COMPONENTS/Utilities/useDebounce";
import ListOfComments from "../Comments/ListOfComments";
import { addItemToState } from "../ZZZ_USEFUL COMPONENTS/Utilities/StateModifications";
import ScrollingMediaFiles from "../ZZZ_USEFUL COMPONENTS/Utilities/ScrollingMediaFiles";

export default function PostContainer({ post }: PostContainerProps) {
  const { myProfile } = useContext(ProfileContext);
  const [comments, setComments] = useState<commentsDTO[]>();
  const [youLiked, setYouLiked] = useState<boolean>(false);
  const [amountOfLikes, setAmountOfLikes] = useState(post.AmountOfLikes);
  const [clicked, setClicked] = useState(false);
  const [amountOfComments, setAmountOfComments] = useState(
    post.AmountOfComments
  );
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [allCommentsFetched, setAllCommentsFetched] = useState(false);

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

  const debouncedAmountOfLikes = useDebounce(amountOfLikes, 1000);

  const autorImage =
    post.AutorProfileImage || `${ReadyImagesURL}/noProfile.jpg`;

  let commentsToGetNumber = 10;

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
      setAmountOfLikes(amountOfLikes + 1);
      setYouLiked(true);
    } else {
      setAmountOfLikes(amountOfLikes - 1);
      setYouLiked(false);
    }
    setClicked(true);
  }

  function updateShowComments() {
    if (showComments == false) {
      if (!comments) {
        getComments(commentsToGetNumber);
      }
    }
    setShowComments(!showComments);
  }

  async function postComment() {
    setAmountOfComments(amountOfComments + 1);
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
  const likeColor = youLiked ? "#89CFF0" : "";

  const commentDisabled = commentText.length == 0
  return (
    <div className="post shadow-around">
      <div className="post-profile">
        <img src={autorImage} alt=""/>
        <span>{post.AutorName}</span>
      </div>
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
        <ScrollingMediaFiles mediaFiles={post.MediaFiles}/>
      </div>
      <div className="post-bottom">
        <div className="post-bottom-up">
          <div className="option">
            <img src={`${ReadyImagesURL}/like.png`} alt=""/>
            <span className="large-font">{amountOfLikes}</span>
          </div>
          <div className="option">
            <span className="large-font">{amountOfComments} comments</span>
          </div>
        </div>
        <div className="post-bottom-down">
          <button
            style={{ backgroundColor: likeColor }}
            onClick={updateLikeState}
          >
            I like it!
          </button>
          <button onClick={updateShowComments}>Comment it</button>
        </div>
      </div>
      {showComments && (
        <div className="post-comments">
          <span className="post-comments-input">
            <textarea
            className="commentText-textarea"
              // id={`comment-text/${post.Id}`}
              value={commentText}
              onInput={(e: any) => setCommentText(e.target.value)}
            />
            <button disabled={commentDisabled} type="submit" onClick={postComment}>
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
    </div>
  );
}

interface PostContainerProps {
  post: postDTO;
}

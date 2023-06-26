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

  const filesContainerRef = useRef<HTMLDivElement | null>(null);
  const leftScrollRef = useRef<HTMLDivElement | null>(null);
  const rightScrollRef = useRef<HTMLDivElement | null>(null);

  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const [isScrollAtStart, setIsScrollAtStart] = useState(false);


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

  useEffect(()=>{
    setIsScrollAtStart(true)
  },[])

  useEffect(()=>{
    if(!filesContainerRef.current || !leftScrollRef.current || !rightScrollRef.current) return;
    leftScrollRef.current.addEventListener('click', () => {
      filesContainerRef.current!.scrollBy({ left: -filesContainerRef.current!.offsetWidth, behavior: 'smooth' });
    });
    rightScrollRef.current.addEventListener('click', () => {
      filesContainerRef.current!.scrollBy({ left: filesContainerRef.current!.offsetWidth, behavior: 'smooth' });
    });


    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = filesContainerRef.current!;

      const isAtEnd = Math.floor(scrollLeft) + clientWidth >=  scrollWidth-10;
      const isAtStart = scrollLeft == 0
      setIsScrolledToEnd(isAtEnd);
      setIsScrollAtStart(isAtStart)
    };

    filesContainerRef.current.addEventListener('scroll', handleScroll);

  },[filesContainerRef, leftScrollRef, rightScrollRef, isScrolledToEnd, isScrollAtStart])

  const commentDisabled = commentText.length == 0
  return (
    <div className="post shadow-around">
      <div className="post-profile">
        <img src={autorImage} />
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
        {post.MediaFiles && (
          <div className="box">
            <div ref={filesContainerRef} className="container">
              {post.MediaFiles.map((oneFile) => (
                <span key={oneFile} className="element">
                  {oneFile.includes("postImages") && <img src={oneFile} />}
                  {oneFile.includes("postVideos") && (
                    <video controls>
                      <source src={oneFile} type="video/mp4" />
                    </video>
                  )}
                </span>
              ))}
            </div>
            {post.MediaFiles.length > 1 && (
              <>
                {!isScrollAtStart && <div ref={leftScrollRef} style={{backgroundImage:`url(${ReadyImagesURL}/goBackArrow.png)`}} className="scroll scroll-left"/>}
                {!isScrolledToEnd && <div ref={rightScrollRef} style={{backgroundImage:`url(${ReadyImagesURL}/goBackArrow.png)`}} className="scroll scroll-right"/>}
              </>
            )}
          </div>
        )}
      </div>
      <div className="post-bottom">
        <div className="post-bottom-up">
          <div className="option">
            <img src={`${ReadyImagesURL}/like.png`} />
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
              id={`comment-text/${post.Id}`}
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

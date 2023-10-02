import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addItemToState } from "../../../_utils/1Functions/StateModifications";
import useDebounce from "../../../_utils/2Hooks/useDebounce";
import ScrollingMediaFiles from "../../../_utils/ScrollingMediaFiles";
import Textarea from "../../../_utils/Textarea";
import { ReadyImagesURL } from "../../../globals/appUrls";
import ListOfComments from "../../Comments/ListOfComments";
import "./style.scss";
import OpenedPostForm from "../PostForm/OpenedForm";
import { getStringBetweenPercentSigns } from "../../../_utils/1Functions/StringManipulations";
import { ProfileImage } from "../../ProfileImage/ProfileImage";
import { axiosBase } from "../../../globals/apiPaths";
import { useProfilesRelationsContext } from "../../../services/Contexts/ProfileDataContext";
import { useMutation } from "react-query";
import { queryClient } from "../../../App";
import { deletePost } from "../../../apiFunctions/deletePost";
import { patchPost } from "../../../apiFunctions/patchPost";
import { useAuthData } from "../../../hooks/useAuthData";
import { useAuthenticationContext } from "../../../services/Contexts/AuthenticationContext";
import { useInfiniteComments } from "../../../hooks/useInfiniteComments";
import { getComments } from "../../../apiFunctions/getComments";
import Waiting from "../../../_utils/Waiting/indexxx";
import { postComment } from "../../../apiFunctions/postComment";

interface PostContainerProps {
  post: postDTO;
  queryName: string;
}

export default function PostContainer({ post, queryName }: PostContainerProps) {
  const [amountOfLikes, setAmountOfLikes] = useState(post.AmountOfLikes);
  const [amountOfComments, setAmountOfComments] = useState(
    post.AmountOfComments
  );
  const [showComments, setShowComments] = useState(false);

  function updateShowComments() {
    setShowComments((showComments) => !showComments);
  }

  return (
    <div className="post shadow-around">
      <PostProfile post={post} queryName={queryName} />
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
  queryName: string;
}

const PostProfile = ({ post, queryName }: PostProfileProps) => {
  const navigate = useNavigate();

  const goToProfile = () => {
    if (post.AutorId) {
      navigate(`/user-profile/${post.AutorId}`);
    }
  };

  return (
    <div className="post-profile">
      <ProfileImage imageURL={post.AutorProfileImage} onClick={goToProfile} />
      <span className="flexColumnLeft" style={{ maxWidth: "60%" }}>
        <span className="medium-font elipsis" style={{ maxWidth: "100%" }}>
          {post.AutorName}
        </span>
        <span className="small-font">
          Last edit: {new Date(post.Date).toLocaleDateString()}
          {", "}
          {new Date(post.Date).toLocaleTimeString()}
        </span>
      </span>

      <PostProfileOptions post={post} queryName={queryName} />
    </div>
  );
};

const PostProfileOptions = ({ post, queryName }: PostProfileProps) => {
  const { profile } = useAuthenticationContext();
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  function toggleOptions() {
    setOptionsOpen(!optionsOpen);
  }

  const { mutate: delPost } = useMutation({
    mutationFn: (postId: string) => {
      if (profile?.Id === undefined) throw Error("Something went wrong");
      return deletePost(postId);
    },
    onSuccess: ({ status, postId }) => {
      queryClient.setQueryData([queryName], (oldData: any) => {
        if (status === "error") throw Error("Something went wrong");
        const oldPages = Array.isArray(oldData.pages[0])
          ? oldData.pages[0]
          : oldData.pages;
        const newPages = oldPages.filter((p: postDTO) => p.Id != postId);
        return {
          pages: newPages,
          pageParams: [oldData.pageParams[0]],
        };
      });
    },
    onError: () => {
      alert("Something went wrong, try again later");
    },
  });

  const { mutate: editPost } = useMutation({
    mutationFn: (post: postDTO) => {
      if (profile?.Id === undefined) throw Error("Something went wrong");
      return patchPost(post);
    },
    onSuccess: ({ status, post }) => {
      queryClient.setQueryData([queryName], (oldData: any) => {
        if (status === "error") throw Error("Something went wrong");
        const oldPages = Array.isArray(oldData.pages[0])
          ? oldData.pages[0]
          : oldData.pages;
        const newPages = oldPages.map((p: postDTO) => {
          if (p.Id === post.Id) {
            return post;
          }
          return p;
        });

        return {
          pages: newPages,
          pageParams: [oldData.pageParams[0]],
        };
      });
    },
    onError: () => {
      alert("Something went wrong, try again later");
    },
  });

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

  async function toggleEditPostForm() {
    setEditOpen(!editOpen);
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
          className="post-profile-options__list shadow-around"
        >
          {post.AutorId === profile?.Id && (
            <>
              <div
                className="post-profile-options__list__child"
                onClick={() => delPost(post.Id)}
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
          {post.AutorId !== profile?.Id && (
            <div className="post-profile-options__list__child">
              Report (doesnt work)
            </div>
          )}
        </div>
      )}
      {editOpen && (
        <OpenedPostForm
          key="edit"
          isOpen={editOpen}
          toggleModal={toggleEditPostForm}
          onSubmit={editPost}
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
        <span className="post-content-text medium-font">
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
        <span>{amountOfLikes}</span>
      </div>
      <div className="option">
        <span>{amountOfComments} comments</span>
      </div>
    </div>
  );
};

interface LikeProps extends PostProps {
  amountOfLikes: number;
  setAmountOfLikes: React.Dispatch<React.SetStateAction<number>>;
}

const Like = ({ post, amountOfLikes, setAmountOfLikes }: LikeProps) => {
  const { profile } = useAuthenticationContext();
  const [youLiked, setYouLiked] = useState<boolean>();
  const [clicked, setClicked] = useState(false);
  const debouncedAmountOfLikes = useDebounce(amountOfLikes, 1000);

  useEffect(() => {
    checkIfUserLiked();
  }, []);

  async function checkIfUserLiked() {
    const response = await axiosBase.get<boolean>(
      `posts/ifUserLiked?postId=${post.Id}&userId=${profile?.Id}`
    );
    setYouLiked(response.data);
  }

  useEffect(() => {
    if (clicked) {
      likePost();
    }
  }, [debouncedAmountOfLikes]);

  async function likePost() {
    if (youLiked) {
      axiosBase.patch(`posts/like?postId=${post.Id}&userId=${profile?.Id}`);
    } else {
      axiosBase.patch(
        `posts/removeLike?postId=${post.Id}&userId=${profile?.Id}`
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
  const { profile } = useAuthenticationContext();
  const [commentText, setCommentText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { comments, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteComments(
      getComments,
      `getComments/${profile?.Id}/${post.Id}`,
      post.Id,
      showComments
    );

  const { mutate: addComment } = useMutation({
    mutationFn: (profileId: string) =>
      postComment(post.Id, profileId, commentText),
    onSuccess: (comment) => {
      queryClient.setQueryData(
        [`getComments/${profile?.Id}/${post.Id}`],
        (oldData: any) => {
          const newPages = oldData.pages.map((page: any[]) => {
            return [comment, ...page];
          });
          return {
            pages: newPages,
            pageParams: oldData.pageParams,
          };
        }
      );
    },
  });

  useEffect(() => {
    if (showComments === undefined) return;
    if (showComments === true) {
      if (comments?.length === 0) {
        fetchNextPage();
      }
    }
  }, [showComments]);

  async function createComment() {
    if (!profile?.Id) return;
    setAmountOfComments((amountOfComments: number) => amountOfComments + 1);
    addComment(profile?.Id);
    setCommentText("");
  }

  function showMoreComments() {
    fetchNextPage();
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
            <ProfileImage sizeInRem={2.4} imageURL={profile?.ProfileImage} />
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
                  onClick={createComment}
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
          {isFetchingNextPage && <Waiting message="Loading..." />}
          {hasNextPage && (
            <span
              style={{ textAlign: "left", cursor: "pointer" }}
              onClick={showMoreComments}
            >
              Show more...
            </span>
          )}
          {!hasNextPage && (
            <span style={{ marginTop: "0.5rem" }}>
              There are no more comments
            </span>
          )}
        </div>
      )}
    </>
  );
};

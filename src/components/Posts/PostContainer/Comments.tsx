import { useEffect, useRef, useState } from "react";
import Textarea from "../../../_utils/Textarea";
import { ReadyImagesURL } from "../../../globals/appUrls";
import ListOfComments from "../../Comments/ListOfComments";
import "./style.scss";
import { ProfileImage } from "../../ProfileImage/ProfileImage";
import { useMutation } from "react-query";
import { queryClient } from "../../../App";
import { useAuthenticationContext } from "../../../services/Contexts/AuthenticationContext";
import { useInfiniteComments } from "../../../hooks/useInfiniteComments";
import { getComments } from "../../../apiFunctions/getComments";
import Waiting from "../../../_utils/Waiting/indexxx";
import { postComment } from "../../../apiFunctions/postComment";

interface CommentsProps {
  post: postDTO;
  showComments: boolean;
  amountOfComments: number;
  setAmountOfComments: React.Dispatch<React.SetStateAction<number>>;
}

export const Comments = ({
  post,
  showComments,
  amountOfComments,
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
    if (showComments === undefined || amountOfComments === 0) return;
    if (showComments === true) {
      if (comments?.length === 0) {
        fetchNextPage();
      }
    }
  }, [showComments, amountOfComments]);

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
          {amountOfComments !== 0 && hasNextPage && (
            <span
              style={{ textAlign: "left", cursor: "pointer" }}
              onClick={showMoreComments}
            >
              Show more...
            </span>
          )}
          {amountOfComments !== 0 && !hasNextPage && (
            <span style={{ marginTop: "0.5rem" }}>
              There are no more comments
            </span>
          )}
          {amountOfComments === 0 && (
            <span style={{ marginTop: "0.5rem" }}>
              No comments. Post something here!
            </span>
          )}
        </div>
      )}
    </>
  );
};

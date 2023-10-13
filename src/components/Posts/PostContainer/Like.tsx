import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useMutation } from "react-query";
import { queryClient } from "../../../App";
import { deletePost } from "../../../apiFunctions/deletePost";
import { patchPost } from "../../../apiFunctions/patchPost";
import { useAuthenticationContext } from "../../../services/Contexts/AuthenticationContext";
import { useInfiniteComments } from "../../../hooks/useInfiniteComments";
import { getComments } from "../../../apiFunctions/getComments";
import Waiting from "../../../_utils/Waiting/indexxx";
import { postComment } from "../../../apiFunctions/postComment";
import { PostProps } from ".";

interface LikeProps extends PostProps {
  amountOfLikes: number;
  setAmountOfLikes: React.Dispatch<React.SetStateAction<number>>;
}

export const Like = ({ post, amountOfLikes, setAmountOfLikes }: LikeProps) => {
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

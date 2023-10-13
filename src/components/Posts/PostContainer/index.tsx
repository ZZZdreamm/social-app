import { useState } from "react";
import "./style.scss";
import { PostProfile } from "./PostProfile";
import { PostContent } from "./PostContent";
import { PostBottomUpperPart } from "./PostBottomUpperPart";
import { Like } from "./Like";
import { Comments } from "./Comments";

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
        amountOfComments={amountOfComments}
      />
    </div>
  );
}

export interface PostProps {
  post: postDTO;
}

export interface PostProfileProps extends PostProps {
  queryName: string;
}

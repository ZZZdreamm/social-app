import { useNavigate } from "react-router-dom";
import { ProfileImage } from "../../ProfileImage/ProfileImage";
import { PostProfileOptions } from "./PostProfileOptions";
import { PostProfileProps } from ".";

export const PostProfile = ({ post, queryName }: PostProfileProps) => {
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

import "../style.scss";
import { PostContainerSkeleton } from "./PostContainerSkeleton";

export function MiddleContentSkeleton() {
  const numbers = [1, 2, 3, 4, 5];
  return (
    <div className="middle-content">
      <div className="post-form" style={{ height: "4rem" }}>
        <div className="post-form-up skeleton"></div>
        <div className="post-form-down"></div>
      </div>
      <div className="listOfPosts">
        {numbers.map(() => (
          <PostContainerSkeleton />
        ))}
      </div>
    </div>
  );
}

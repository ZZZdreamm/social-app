import "../style.scss";
import { PostContainerSkeleton } from "./PostContainerSkeleton";

export function MiddleContentSkeleton() {
  const numbers = [1, 2, 3, 4, 5];
  return (
    <div className="middle-content">
      <div className="post-form skeleton-background" style={{ height: "8rem" }}>
        <div className="post-form-up">
          <div
            className="skeleton-circle"
            style={{ height: "2.4rem", width: "2.4rem" }}
          ></div>
          <div
            className="post-form-up-placeholder skeleton-text"
            style={{ height: "3rem" }}
          ></div>
        </div>
        <div className="post-form-down"></div>
      </div>
      <div className="listOfPosts">
        {numbers.map((number) => (
          <PostContainerSkeleton key={number} />
        ))}
      </div>
    </div>
  );
}

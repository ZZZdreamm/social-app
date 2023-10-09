export function PostContainerSkeleton() {
  return (
    <div className="post skeleton-background" style={{ height: "50rem" }}>
      <div className="post-profile" style={{ height: "10%" }}>
        <div className="profileImage skeleton"></div>
        <span
          className="flexColumnLeft"
          style={{ width: "60%", gap: "0.5rem" }}
        >
          <span
            className="medium-font elipsis skeleton-text"
            style={{ width: "70%", height: "1.2rem" }}
          ></span>
          <span
            className="small-font skeleton-text"
            style={{ height: "0.8rem", width: "40%" }}
          ></span>
        </span>
      </div>
      <div
        className="post-content skeleton-text"
        style={{ height: "75%" }}
      ></div>
      <div className="post-bottom" style={{ height: "10%", width: "100%" }}>
        <div className="post-bottom-up">
          <div className="option skeleton-text" style={{ width: "20%" }}></div>
          <div className="option skeleton-text" style={{ width: "20%" }}></div>
        </div>
        <div className="post-bottom-down">
          <div className="option skeleton-text" style={{ width: "20%" }}></div>
          <div className="option skeleton-text" style={{ width: "20%" }}></div>
        </div>
      </div>
    </div>
  );
}

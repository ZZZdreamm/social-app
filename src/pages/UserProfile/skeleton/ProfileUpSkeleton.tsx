export function ProfileUpSkeleton() {
  return (
    <div id="profile-up" className="profile-up">
      <div className="profile-up-image skeleton-background">
        <span
          className="profile-up-image-input skeleton"
          style={{ width: "3rem" }}
        ></span>
      </div>
      <span className="profile-up-options">
        <span className="profile-up-options-up">
          <div
            className="skeleton-circle"
            style={{
              border: "0.3rem solid var(--test-color3)",
              height: "70%",
              aspectRatio: "1",
              margin: "1rem",
            }}
          ></div>
          <div className="flex-column" style={{ gap: "0.5rem" }}>
            <span
              className="skeleton-text"
              style={{ width: "10rem", height: "1.6rem" }}
            ></span>
            <span
              className="skeleton-text"
              style={{ width: "6rem", height: "1.6rem" }}
            ></span>
          </div>
        </span>
        <span className="profile-up-options-down">
          <div
            className="large-font skeleton-text"
            style={{ width: "6rem", height: "80%" }}
          ></div>
          <button
            className="large-font skeleton-text"
            style={{ width: "6rem", height: "80%" }}
          ></button>
          <button
            className="large-font skeleton-text"
            style={{ width: "6rem", height: "80%" }}
          ></button>
        </span>
      </span>
    </div>
  );
}

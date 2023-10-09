import { PostContainerSkeleton } from "../../LandingPage/skeleton/PostContainerSkeleton";

export function ProfileDownSkeleton() {
  const numbers = [1, 2];
  return (
    <div className="profile-down">
      <div className="profile-down-posts" style={{ width: "100%" }}>
        <section className="profile-down-friends">
          <article
            className="profile-down-posts-container skeleton"
            style={{ height: "20rem", margin: "0" }}
          ></article>
          <article
            className="profile-down-posts-container skeleton"
            style={{ height: "35rem" }}
          ></article>
          <article
            className="profile-down-posts-container skeleton"
            style={{ height: "35rem" }}
          ></article>
        </section>
        <section className="flex-column gap-1">
          <div className="profile-down-posts-header skeleton"></div>
          <div className="listOfPosts">
            {numbers.map(() => (
              <PostContainerSkeleton />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

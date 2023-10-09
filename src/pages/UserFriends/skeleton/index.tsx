export function UserFriendsSkeleton() {
  const numbers = [1, 2, 3, 4, 5, 6];
  return (
    <>
      <h2 className="mv-1 flex-center">
        <div
          className="skeleton-text"
          style={{ height: "2rem", width: "10rem" }}
        ></div>
      </h2>
      <span className="friends-container">
        <div className="listOfFriends">
          {numbers.map(() => (
            <div
              className="friend skeleton-background"
              style={{ height: "20rem", width: "100%", borderRadius: "1rem" }}
            >
              <div
                className="skeleton"
                style={{ width: "100%", height: "50rem" }}
              ></div>
              <span className="friend-info skeleton-background">
                <span
                  className="skeleton-text"
                  style={{ width: "100%", height: "1.6rem" }}
                ></span>
                <button
                  className="friend-remove skeleton-text"
                  style={{ width: "50%", height: "2rem" }}
                ></button>
              </span>
            </div>
          ))}
        </div>
      </span>
    </>
  );
}

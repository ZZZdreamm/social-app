import RightBarFriend from "../../../components/Messages/RightBarFriend";

export function RightBarSkeleton() {
  const numbers = [1, 2, 3, 4, 5];
  return (
    <div className="bar bar-right">
      <h5 className="large-font">Friends</h5>
      <ul>
        {numbers.map((number) => (
          <li key={number}>
            <div
              className="skeleton-circle"
              style={{ height: "2.4rem", aspectRatio: "1" }}
            ></div>
            <span
              className="skeleton-text"
              style={{ height: "1.2rem", width: "50%" }}
            ></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

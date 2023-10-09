export function ChatWithFriendSkeleton() {
  const numbers = [1, 7, 5, 6, 2, 3, 4, 10, 8, 9];
  return (
    <div className="listOfMessages">
      {numbers.map((number) => {
        const styles: any =
          number % 2 === 0
            ? {
                alignSelf: "flex-end",
                flexDirection: "row-reverse",
              }
            : {
                alignSelf: "flex-start",
                flexDirection: "row",
              };
        return (
          <div
            key={number}
            className="message skeleton-text"
            style={{
              ...styles,
              width: "15rem",
            }}
          >
            <div className="message-content" style={{ height: "2rem" }}></div>
          </div>
        );
      })}
    </div>
  );
}

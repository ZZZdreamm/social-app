import { useEffect, useState } from "react";
import { ReadyImagesURL } from "../ZZZ_USEFUL COMPONENTS/appUrls";

export default function Comment(comment: commentsDTO) {
  const [textOverflown, setTextOverflown] = useState(false);
  const [partOfTextContent, setPartOfTextContent] = useState<string>("");

  useEffect(() => {
    if (comment.TextContent.length > 150) {
      setPartOfTextContent(comment.TextContent.slice(0, 50));
      setTextOverflown(true);
    }
  }, []);

  function showMoreText() {
    setTextOverflown(false)
  }
  const autorImage =
    comment.AutorProfileImage || `${ReadyImagesURL}/noProfile.jpg`;
  return (
    <div className="comment">
      <div className="comment-profile">
        <img className="comment-profile-image" src={autorImage} alt="profile" />
        <span className="comment-profile-name">{comment.AutorName}</span>
      </div>

      <div className="comment-text">
        {textOverflown ? (
          <>
            {partOfTextContent}
            <span className="show-text" onClick={() => showMoreText()}>
              ...Show more
            </span>
          </>
        ) : (
          comment.TextContent
        )}
      </div>
    </div>
  );
}

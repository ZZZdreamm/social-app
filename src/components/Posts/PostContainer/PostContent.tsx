import { useEffect, useState } from "react";
import { PostProps } from ".";
import ScrollingMediaFiles from "../../../_utils/ScrollingMediaFiles";

interface PostContentProps extends PostProps {}

export const PostContent = ({ post }: PostContentProps) => {
  const [textOverflown, setTextOverflown] = useState(false);
  const [partOfTextContent, setPartOfTextContent] = useState<string>("");

  useEffect(() => {
    if (post.TextContent?.length > 100) {
      setPartOfTextContent(post.TextContent?.slice(0, 50));
      setTextOverflown(true);
    }
  }, []);

  function showMoreText() {
    setTextOverflown(false);
  }
  return (
    <div className="post-content">
      {post.TextContent && (
        <span className="post-content-text medium-font">
          {textOverflown ? (
            <>
              {partOfTextContent}
              <span className="show-text" onClick={() => showMoreText()}>
                ...Show more
              </span>
            </>
          ) : (
            post.TextContent
          )}
        </span>
      )}
      <ScrollingMediaFiles mediaFiles={post.MediaFiles} />
    </div>
  );
};

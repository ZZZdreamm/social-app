import "./style.scss";

import GenericList from "../../../_utils/GenericList/GenericList";
import Waiting from "../../../_utils/Waiting/indexxx";
import Comment from "../Comment";

interface ListOfCommentsProps {
  comments: commentsDTO[];
}

export default function ListOfComments({ comments }: ListOfCommentsProps) {
  return (
    <GenericList list={comments} emptyListUI={<></>}>
      <span className="post-comments-comments">
        {comments ? (
          comments?.map((comment) => (
            <Comment
              key={comment.Id}
              Id={comment.Id}
              PostId={comment.PostId}
              AutorName={comment.AutorName}
              TextContent={comment.TextContent}
              AutorProfileImage={comment.AutorProfileImage}
              Date={comment.Date}
            />
          ))
        ) : (
          <Waiting message="Loading" />
        )}
      </span>
    </GenericList>
  );
}

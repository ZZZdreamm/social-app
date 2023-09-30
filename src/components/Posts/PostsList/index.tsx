import GenericList from "../../../_utils/GenericList/GenericList";
import Waiting from "../../../_utils/Waiting/indexxx";
import PostContainer from "../PostContainer";

import "./style.scss";

export default function PostsList(props: postsListProps) {
  return (
    <GenericList list={props.posts} emptyListUI={<></>}>
      <div className="listOfPosts">
        {props.posts && props.posts.length > 0 ? (
          props.posts.map((post) => (
            <PostContainer
              post={post}
              key={post.Id}
              queryName={props.queryName}
            />
          ))
        ) : (
          <Waiting message="Loading" />
        )}
      </div>
    </GenericList>
  );
}

interface postsListProps {
  posts?: postDTO[];
  queryName: string;
}

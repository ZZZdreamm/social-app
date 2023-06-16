
import GenericList from "../ZZZ_USEFUL COMPONENTS/Utilities/GenericList";
import Waiting from "../ZZZ_USEFUL COMPONENTS/Utilities/Waiting";
import PostContainer from "./PostContainer";

export default function PostsList(props:postsListProps){
    return <GenericList list={props.posts} emptyListUI={<></>}>
        <div className="listOfPosts">
            {props.posts ? props.posts?.map((post) =>
            (
                <PostContainer post={post} key={post.Id}/>

            )): <Waiting message="Loading"/>}
       </div>

    </GenericList>
}

interface postsListProps{
    posts?:postDTO[];
}
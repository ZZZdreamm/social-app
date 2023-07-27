import { useContext, useState } from "react";
import ProfileContext from "../../../services/Contexts/ProfileContext";
import OpenedPostForm from "./OpenedForm";
import "./style.scss";
import { postDataToServer } from "../../../services/Firebase/FirebaseFunctions";
import { addItemToState } from "../../../_utils/1Functions/StateModifications";

export interface PostFormChildProps {
  toggleModal: () => void;
}

const UpperPart = ({ toggleModal }: PostFormChildProps) => {
  const { myProfile } = useContext(ProfileContext);

  return (
    <span className="post-form-up shadow-around">
      <img src={myProfile.ProfileImage} alt="" />
      <div className="post-form-up-placeholder large-font" onClick={toggleModal}>
        What do you want to post?
      </div>
    </span>
  );
};

const BottomPart = ({ toggleModal }: PostFormChildProps) => {
  return <span className="post-form-down"></span>;
};

export default function PostForm({ setPosts }: PostFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function onSubmit(post: postCreationDTO) {
    postDataToServer(post, "post-post").then((newPost: postDTO) => {
      addItemToState(newPost, setPosts);
    });
  }

  return (
    <div className="post-form ">
      <UpperPart toggleModal={toggleModal} />
      <BottomPart toggleModal={toggleModal} />
      <OpenedPostForm
        key="post"
        setPosts={setPosts}
        isOpen={isOpen}
        toggleModal={toggleModal}
        onSubmit={onSubmit}
        headerTitle="Create Post"
      />
    </div>
  );
}
interface PostFormProps {
  setPosts: (posts: postDTO[]) => void;
}

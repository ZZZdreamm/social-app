import { useContext, useState } from "react";
import ProfileContext from "../../../services/Contexts/ProfileContext";
import OpenedPostForm from "./OpenedForm";
import "./style.scss";
import { addItemToState } from "../../../_utils/1Functions/StateModifications";
import { ProfileImage } from "../../ProfileImage/ProfileImage";
import { axiosBase } from "../../../globals/apiPaths";
import { ReadyImagesURL } from "../../../globals/appUrls";
// import { axiosBasePosts } from "../../../globals/apiPaths";

export default function PostForm({ setPosts }: PostFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen((isOpen) => !isOpen);
  }

  function onSubmit(post: postCreationDTO) {
    axiosBase.post<postDTO>("posts/create", post).then((response) => {
      const newPost = response.data;
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

export interface PostFormChildProps {
  toggleModal: () => void;
}

const UpperPart = ({ toggleModal }: PostFormChildProps) => {
  const { myProfile } = useContext(ProfileContext);

  return (
    <span className="post-form-up shadow-around">
      <ProfileImage imageURL={myProfile.ProfileImage} padding={0.25} />
      <div className="post-form-up-placeholder" onClick={toggleModal}>
        What do you want to post?
      </div>
    </span>
  );
};

const BottomPart = ({ toggleModal }: PostFormChildProps) => {
  return <span className="post-form-down"></span>;
};

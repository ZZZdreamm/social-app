import { useState } from "react";
import OpenedPostForm from "./OpenedForm";
import "./style.scss";
import { ProfileImage } from "../../ProfileImage/ProfileImage";
import { useMutation } from "react-query";
import { queryClient } from "../../../App";
import { postPost } from "../../../apiFunctions/postPost";
import { useAuthenticationContext } from "../../../services/Contexts/AuthenticationContext";
import Button from "../../../_utils/Button";
import { postReels } from "../../../apiFunctions/postReels";
import { useNavigate } from "react-router-dom";

export default function PostForm({ queryName }: { queryName: string }) {
  const { profile } = useAuthenticationContext();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: addPost } = useMutation({
    mutationFn: (data: postCreationDTO) => {
      if (profile?.Id === undefined) throw Error("Something went wrong");
      return postPost(data);
    },
    onSuccess: (newPost) => {
      queryClient.setQueryData([queryName], (oldData: any) => {
        return {
          pages: [newPost, ...oldData.pages],
          pageParams: [oldData.pageParams[0] + 1],
        };
      });
    },
  });

  function toggleModal() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className="post-form shadow-around">
      <UpperPart toggleModal={toggleModal} />
      <BottomPart toggleModal={toggleModal} />
      <OpenedPostForm
        key="post"
        isOpen={isOpen}
        toggleModal={toggleModal}
        onSubmit={addPost}
        headerTitle="Create Post"
      />
    </div>
  );
}

export interface PostFormChildProps {
  toggleModal: () => void;
}

const UpperPart = ({ toggleModal }: PostFormChildProps) => {
  const { profile } = useAuthenticationContext();

  return (
    <span className="post-form-up">
      <ProfileImage imageURL={profile?.ProfileImage} />
      <div className="post-form-up-placeholder" onClick={toggleModal}>
        What do you want to post?
      </div>
    </span>
  );
};

const BottomPart = ({}: PostFormChildProps) => {
  const navigate = useNavigate();
  const openAddStory = () => {
    navigate("/reels/create");
  };
  return (
    <div className="post-form-down">
      <Button onClick={openAddStory}>Add your story</Button>
    </div>
  );
};

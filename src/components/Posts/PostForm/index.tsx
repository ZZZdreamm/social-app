import { useState } from "react";
import OpenedPostForm from "./OpenedForm";
import "./style.scss";
import { addItemToState } from "../../../_utils/1Functions/StateModifications";
import { ProfileImage } from "../../ProfileImage/ProfileImage";
import { axiosBase } from "../../../globals/apiPaths";
import { useProfilesRelationsContext } from "../../../services/Contexts/ProfileDataContext";
import { InfiniteData, useMutation } from "react-query";
import { queryClient } from "../../../App";
import { postPost } from "../../../apiFunctions/postPost";
import { useAuthenticationContext } from "../../../services/Contexts/AuthenticationContext";

export default function PostForm({ queryName }: { queryName: string }) {
  // const { profile } = useProfilesRelationsContext();
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
    <div className="post-form ">
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
    <span className="post-form-up shadow-around">
      <ProfileImage imageURL={profile?.ProfileImage}/>
      <div className="post-form-up-placeholder" onClick={toggleModal}>
        What do you want to post?
      </div>
    </span>
  );
};

const BottomPart = ({ toggleModal }: PostFormChildProps) => {
  return <span className="post-form-down"></span>;
};

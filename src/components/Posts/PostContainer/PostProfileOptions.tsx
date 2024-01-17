import { useEffect, useState } from "react";
import { getStringBetweenPercentSigns } from "../../../_utils/1Functions/StringManipulations";
import { ReadyImagesURL } from "../../../globals/appUrls";
import OpenedPostForm from "../PostForm/OpenedForm";
import { patchPost } from "../../../apiFunctions/patchPost";
import { useMutation } from "react-query";
import { deletePost } from "../../../apiFunctions/deletePost";
import { useAuthenticationContext } from "../../../services/Contexts/AuthenticationContext";
import { PostProfileProps } from ".";
import { queryClient } from "../../../globals/constants";

export const PostProfileOptions = ({ post, queryName }: PostProfileProps) => {
  const { profile } = useAuthenticationContext();
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  function toggleOptions() {
    setOptionsOpen(!optionsOpen);
  }

  const { mutate: delPost } = useMutation({
    mutationFn: (postId: string) => {
      if (profile?.Id === undefined) throw Error("Something went wrong");
      return deletePost(postId);
    },
    onSuccess: ({ status, postId }) => {
      queryClient.setQueryData([queryName], (oldData: any) => {
        if (status === "error") throw Error("Something went wrong");
        const oldPages = Array.isArray(oldData.pages[0])
          ? oldData.pages[0]
          : oldData.pages;
        const newPages = oldPages.filter((p: postDTO) => p.Id != postId);
        return {
          pages: newPages,
          pageParams: [oldData.pageParams[0]],
        };
      });
    },
    onError: () => {
      alert("Something went wrong, try again later");
    },
  });

  const { mutate: editPost } = useMutation({
    mutationFn: (post: postDTO) => {
      if (profile?.Id === undefined) throw Error("Something went wrong");
      return patchPost(post);
    },
    onSuccess: ({ status, post }) => {
      queryClient.setQueryData([queryName], (oldData: any) => {
        if (status === "error") throw Error("Something went wrong");
        console.log(oldData);
        const oldPages = Array.isArray(oldData.pages[0])
          ? oldData.pages[0]
          : oldData.pages;
        const newPages = oldPages.map((p: postDTO) => {
          if (p.Id === post.Id) {
            return post;
          }
          return p;
        });

        return {
          pages: newPages,
          pageParams: [oldData.pageParams[0]],
        };
      });
    },
    onError: () => {
      alert("Something went wrong, try again later");
    },
  });

  useEffect(() => {
    window.addEventListener("click", (e: any) => {
      if (
        e.target?.id.includes(`post-profile-options/${post.Id}`) ||
        e.target?.id.includes(`post-profile-options__list/${post.Id}`)
      )
        return;
      setOptionsOpen(false);
    });
  }, []);

  async function toggleEditPostForm() {
    setEditOpen(!editOpen);
  }

  const postFilesArray: [File, string][] | undefined = post.MediaFiles?.map(
    (url) => {
      return [new File([], getStringBetweenPercentSigns(url)), url];
    }
  );

  return (
    <div
      id={`post-profile-options/${post.Id}`}
      className="post-profile-options"
      style={{ backgroundImage: `url(${ReadyImagesURL}/moreOptions.png)` }}
      onClick={toggleOptions}
    >
      {optionsOpen && (
        <div
          id={`post-profile-options__list/${post.Id}`}
          className="post-profile-options__list shadow-around"
        >
          {post.AutorId === profile?.Id && (
            <>
              <div
                className="post-profile-options__list__child"
                onClick={() => delPost(post.Id)}
              >
                Delete
              </div>
              <div
                className="post-profile-options__list__child"
                onClick={toggleEditPostForm}
              >
                Edit
              </div>
            </>
          )}
          {post.AutorId !== profile?.Id && (
            <div className="post-profile-options__list__child">
              Report (doesnt work)
            </div>
          )}
        </div>
      )}
      {editOpen && (
        <OpenedPostForm
          key="edit"
          isOpen={editOpen}
          toggleModal={toggleEditPostForm}
          onSubmit={editPost}
          currentPost={{
            filesArray: postFilesArray,
            text: post.TextContent,
            postId: post.Id,
            amountOfLikes: post.AmountOfLikes,
            amountOfComments: post.AmountOfComments,
            AutorProfileImage: post.AutorProfileImage,
            AutorName: post.AutorName,
          }}
          headerTitle="Edit Post"
        />
      )}
    </div>
  );
};

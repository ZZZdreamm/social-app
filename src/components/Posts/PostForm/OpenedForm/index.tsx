import { useState, useEffect, useRef } from "react";
import "./style.scss";
import { storageRef } from "../../../../services/Firebase/FirebaseConfig";
import uuid4 from "uuid4";
import FileDropElement from "../../FileDropElement";
import MultipleFileInput from "../../MultipleFileInput";
import { ReadyImagesURL } from "../../../../globals/appUrls";
import { PostFormChildProps } from "..";
import MyModal from "../../../../_utils/Modal/Modal";
import { ProfileImage } from "../../../ProfileImage/ProfileImage";
import { useProfilesRelationsContext } from "../../../../services/Contexts/ProfileDataContext";

interface ImagesListProps {
  filesArray: [File, string][];
  eraseChoosenFile: (fileName: string) => void;
}

const ImagesList = ({ filesArray, eraseChoosenFile }: ImagesListProps) => {
  return (
    <>
      {filesArray &&
        filesArray.map(([file, displayedFile], index) => {
          const imageOrVideo =
            displayedFile &&
            (displayedFile.includes("data:image") ||
              displayedFile.includes("postImages"))
              ? "Images"
              : "Videos";
          return (
            <div
              data-testid="modalBodyImage"
              style={{
                width: "100%",
                aspectRatio: "1",
                position: "relative",
              }}
              key={index}
            >
              {imageOrVideo == "Images" && (
                <img className="modal-body-image" src={displayedFile} alt="" />
              )}
              {imageOrVideo == "Videos" && (
                <video style={{ width: "100%", aspectRatio: "1" }} controls>
                  <source src={displayedFile} type="video/mp4" />
                </video>
              )}
              <img
                className="erase-image"
                style={{ height: "2rem" }}
                src={`${ReadyImagesURL}/redX.png`}
                onClick={() => eraseChoosenFile(file.name)}
                alt=""
              />
            </div>
          );
        })}
    </>
  );
};

interface PostFormProps extends PostFormChildProps {
  setPosts: (posts: postDTO[]) => void;
  isOpen: boolean;
  onSubmit: (post: any) => void;
  headerTitle: string;
  currentPost?: any;
}
export default function OpenedPostForm({
  setPosts,
  isOpen,
  toggleModal,
  onSubmit,
  headerTitle,
  currentPost = {
    text: "",
    filesArray: [],
    postId: "",
    amountOfLikes: 0,
    amountOfComments: 0,
    AutorProfileImage: "",
    AutorName: "",
  },
}: PostFormProps) {
  const { profile } = useProfilesRelationsContext();
  const textareaRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState(currentPost.text);
  const [filesArray, setFilesArray] = useState<[File, string][]>(
    currentPost.filesArray
  );

  const disableSubmit = !text && filesArray.length <= 0 ? true : false;
  const onFormSubmit = async () => {
    const post: any = {
      AutorId: profile?.Id,
      AutorName: profile?.Email,
      TextContent: text,
      MediaFiles: [],
      Date: Date.now(),
    };
    let filesUrls: any = [];
    const oldFiles = filesArray.filter(([file, _]) => file.type === "");
    const newFiles = filesArray.filter(([file, _]) => file.type !== "");
    if (newFiles.length > 0) {
      filesUrls = newFiles.map(async ([file, _]) => {
        const imageOrVideo = file?.type.includes("image") ? "Images" : "Videos";
        const imageRef = storageRef.child(
          `/post${imageOrVideo}/${file?.name}+${uuid4()}`
        );
        await imageRef.put(file!);
        const url = await imageRef.getDownloadURL();
        return url;
      });
    }
    if (currentPost.postId) {
      post.Id = currentPost.postId;
      post.AutorProfileImage = currentPost.AutorProfileImage;
    }
    post.MediaFiles = await Promise.all(filesUrls);
    post.MediaFiles = [...post.MediaFiles, ...oldFiles.map(([_, url]) => url)];

    onSubmit(post);
  };

  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result;
      //@ts-ignore
      setFilesArray((filesArray: [File, string][]) => {
        return [...filesArray, [file, base64Data]];
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  function eraseChoosenFile(name: string) {
    const newFilesArray = filesArray.filter(([file, _]) => file.name != name);
    setFilesArray(newFilesArray);
  }

  return (
    <MyModal
      isOpen={isOpen}
      toggleModal={() => {
        toggleModal();
        setText("");
        setFilesArray([]);
        textareaRef.current!.innerHTML = "";
      }}
      children={
        <>
          <div className="modal-header">{headerTitle}</div>
          <div className="modal-body">
            <span className="modal-body-profile">
              <ProfileImage imageURL={profile?.ProfileImage} />
              <span>{profile?.Email}</span>
            </span>
            <div
              ref={textareaRef}
              className="modal-body-text"
              placeholder="Write something..."
              contentEditable
              onInput={(e: any) => {
                setText(e.target.innerHTML);
              }}
            >
              {currentPost.text}
            </div>

            <ImagesList
              filesArray={filesArray}
              eraseChoosenFile={eraseChoosenFile}
            />
            <FileDropElement handleFileChange={handleFileChange} />
          </div>
          <div className="modal-image">
            <MultipleFileInput handleFileChange={handleFileChange} />
          </div>
        </>
      }
      disableSubmit={disableSubmit}
      submitButtonText={"Submit post"}
      onSubmit={onFormSubmit}
    />
  );
}

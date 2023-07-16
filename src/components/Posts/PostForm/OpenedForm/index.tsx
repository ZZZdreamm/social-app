import { useState, useContext } from "react";

import "./style.scss";
import ProfileContext from "../../../../services/Contexts/ProfileContext";
import { storageRef } from "../../../../services/Firebase/FirebaseConfig";
import uuid4 from "uuid4";
import { postDataToServer } from "../../../../services/Firebase/FirebaseFunctions";
import { addItemToState } from "../../../../_utils/1Functions/StateModifications";
import FileDropElement from "../../FileDropElement";
import MultipleFileInput from "../../MultipleFileInput";
import { ReadyImagesURL } from "../../../../globals/appUrls";
import { PostFormChildProps } from "..";
import MyModal from "../../../../_utils/Modal/Modal";

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
            displayedFile && displayedFile.includes("data:image")
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
}
export default function OpenedPostForm({
  setPosts,
  isOpen,
  toggleModal,
}: PostFormProps) {
  const { myProfile } = useContext(ProfileContext);

  const [text, setText] = useState("");
  const [filesArray, setFilesArray] = useState<[File, string][]>([]);

  const disableSubmit = !text && filesArray.length <= 0 ? true : false;
  const onFormSubmit = async () => {
    const post: postCreationDTO = {
      AutorName: myProfile.Email,
      TextContent: text,
      MediaFiles: [],
      Date: Date.now(),
    };
    let filesUrls: any = [];
    if (filesArray.length > 0) {
      filesUrls = filesArray.map(async ([file, _]) => {
        const imageOrVideo = file?.type.includes("image") ? "Images" : "Videos";
        const imageRef = storageRef.child(
          `/post${imageOrVideo}/${file?.name}+${uuid4()}`
        );
        await imageRef.put(file!);
        const url = await imageRef.getDownloadURL();
        return url;
      });
    }
    post.MediaFiles = await Promise.all(filesUrls);
    postDataToServer(post, "post-post").then((newPost) => {
      addItemToState(newPost, setPosts);
    });
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
      }}
      children={
        <>
          <div className="modal-header">Create post</div>
          <div className="modal-body">
            <span className="modal-body-profile">
              <img src={myProfile.ProfileImage} alt="" />
              <span>{myProfile.Email}</span>
            </span>
            <div
              className="modal-body-text"
              contentEditable={true}
              placeholder="Write something..."
              onInput={(e: any) => {
                setText(e.target.innerHTML);
              }}
            />
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

import "./style.scss";
import { useContext, useState } from "react";
import uuid4 from "uuid4";
import { storageRef } from "../../Firebase/FirebaseConfig";
import {
  postDataToServer
} from "../../Firebase/FirebaseFunctions";
import ProfileContext from "../../Contexts/ProfileContext";
import MyModal from "../../ZZZ_USEFUL COMPONENTS/Utilities/Modal";
import { addItemToState } from "../../ZZZ_USEFUL COMPONENTS/Utilities/StateModifications";
import { ReadyImagesURL } from "../../ZZZ_USEFUL COMPONENTS/appUrls";
import FileDropElement from "../FileDropElement";
import MultipleFileInput from "../MultipleFileInput";

export default function PostForm({ setPosts }: PostFormProps) {
  const { myProfile } = useContext(ProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [filesArray, setFilesArray] = useState<[File, string][]>([]);

  function toggleModal(isOpen: any, setIsOpen: any) {
    setIsOpen(!isOpen);
  }

  const disableSubmit = !text && filesArray.length <= 0 ? true : false;
  const onFormSubmit = async () => {
    const post: postCreationDTO = {
      AutorName: myProfile.Email,
      TextContent: text,
      MediaFiles: [],
      Date: Date.now(),
    };
    let filesUrls :any = []
    if (filesArray.length > 0) {
      filesUrls = filesArray.map(async ([file, _]) => {
        const imageOrVideo = file?.type.includes("image") ? "Images" : "Videos";
        const imageRef = storageRef.child(
          `/post${imageOrVideo}/${file?.name}+${uuid4()}`
        );
        await imageRef.put(file!);
        const url = await imageRef.getDownloadURL();
        return url
      });
    }
    post.MediaFiles = await Promise.all(filesUrls)
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
    <div className="post-form ">
      <span className="post-form-up shadow-around">
        <img src={myProfile.ProfileImage} alt=""/>
        <div
          className="post-form-up-placeholder"
          onClick={() => {
            toggleModal(isOpen, setIsOpen);
          }}
        >
          What do you want to post?
        </div>

        <MyModal
          isOpen={isOpen}
          toggleModal={() => {
            toggleModal(isOpen, setIsOpen);
            setText("");
            setFilesArray([]);
          }}
          children={
            <>
              <div className="modal-header">Create post</div>
              <div className="modal-body">
                <span className="modal-body-profile">
                  <img src={myProfile.ProfileImage} alt=""/>
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
                          <img
                            className="modal-body-image"
                            src={displayedFile}
                            alt=""
                          />
                        )}
                        {imageOrVideo == "Videos" && (
                          <video style={{width:'100%', aspectRatio:'1'}} controls>
                            <source src={displayedFile} type="video/mp4" />
                          </video>
                        )}
                        <img
                          className="erase-image"
                          style={{height:'2rem'}}
                          src={`${ReadyImagesURL}/redX.png`}
                          onClick={() => eraseChoosenFile(file.name)}
                          alt=""
                        />
                      </div>
                    );
                  })}
                <FileDropElement handleFileChange={handleFileChange} />
              </div>
              <div className="modal-image">
                <MultipleFileInput handleFileChange={handleFileChange}/>
              </div>
            </>
          }
          disableSubmit={disableSubmit}
          submitButtonText={"Submit post"}
          onSubmit={onFormSubmit}
        />
      </span>
      <span className="post-form-down"></span>
    </div>
  );
}

interface PostFormProps {
  setPosts: (posts: postDTO[]) => void;
}

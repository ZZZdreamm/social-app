import { useContext, useEffect, useState } from "react";
import ProfileContext from "../ZZZ_USEFUL COMPONENTS/Profile/ProfileContext";
import MyModal from "../ZZZ_USEFUL COMPONENTS/Utilities/Modal";
import { ReadyImagesURL } from "../ZZZ_USEFUL COMPONENTS/appUrls";
import { useFormik } from "formik";
import {
  postDataToServer,
  postFormDataToServer,
} from "../Firebase/FirebaseFunctions";
import { useNavigate } from "react-router-dom";
import FileInput from "../ZZZ_USEFUL COMPONENTS/Utilities/FileInput";
import { storageRef } from "../Firebase/FirebaseConfig";
import { uploadBytes } from "firebase/storage";
import uuid4 from "uuid4";
import { addItemToState } from "../ZZZ_USEFUL COMPONENTS/Utilities/StateModifications";
import FileDropElement from "./FileDropElement";

export default function PostForm({ setPosts }: PostFormProps) {
  const navigate = useNavigate();
  const { myProfile } = useContext(ProfileContext);
  const [isOpen, setIsOpen] = useState(false);

  const [text, setText] = useState("");
  const [file, setFile] = useState<File>();
  const [choosenImage, setChoosenImage] = useState("");

  function toggleModal(isOpen: any, setIsOpen: any) {
    setIsOpen(!isOpen);
  }

  const disableSubmit = !text && !choosenImage ? true : false;
  const onFormSubmit = async () => {
    let post = {
      AutorName: myProfile.Email,
      AmountOfLikes: 0,
      AmountOfComments: 0,
      TextContent: text,
      MediaFile: "",
      Date: Date.now(),
    };
    if (file) {
      const imageRef = storageRef.child(`/post${imageOrVideo}/${file?.name}+${uuid4()}`);
      await imageRef.put(file!);
      const url = await imageRef.getDownloadURL();
      post.MediaFile = url;
    }
    const newPost = await postDataToServer(post, "post-post");
    addItemToState(newPost, setPosts);
  };
  const imageOrVideo =
    choosenImage && choosenImage.includes("data:image") ? "Images" : "Videos";
  return (
    <div className="post-form">
      <span className="post-form-up">
        <img src={myProfile.ProfileImage} />
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
            setChoosenImage('');
          }}
          children={
            <>
              <div className="modal-header">Create post</div>
              <div className="modal-body">
                <span className="modal-body-profile">
                  <img src={myProfile.ProfileImage} />
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
                <FileDropElement/>
                {choosenImage && (
                  <>
                    {imageOrVideo == "Images" && (
                      <img className="modal-body-image" src={choosenImage} />
                    )}
                    {imageOrVideo == "Videos" && (
                      <video controls>
                        <source src={choosenImage} type="video/mp4" />
                      </video>
                    )}
                  </>
                )}
              </div>
              <div className="modal-image">
                <FileInput
                  imageFunction={setChoosenImage}
                  fileFunction={setFile}
                  callback={() => {}}
                />
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

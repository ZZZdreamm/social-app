import { useState } from "react";
import FileDropElement from "../../components/Posts/FileDropElement";
import "./style.scss";
import { ProfileImage } from "../../components/ProfileImage/ProfileImage";
import { useAuthenticationContext } from "../../services/Contexts/AuthenticationContext";
import Button from "../../_utils/Button";
import { postReels } from "../../apiFunctions/postReels";
import { ONE_DAY } from "../../globals/constants";
import { useNavigate } from "react-router-dom";
import { BarAndContentDisplay } from "../../components/barAndContentDisplay/BarAndContentDisplay";

export function AddReelsPage() {
  const navigate = useNavigate();
  const { profile } = useAuthenticationContext();
  const [file, setFile] = useState<[File, string]>();
  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result;
      setFile([file, base64Data as string]);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const postStory = async () => {
    if (profile?.Id && file) {
      const post = await postReels({
        MediaFile: file[0],
        AutorId: profile?.Id,
        CreationTime: Date.now(),
        ExpirationTime: ONE_DAY,
      });
      if (post) navigate("/");
    }
  };

  const discardFile = () => {
    setFile(undefined);
  };

  return (
    <BarAndContentDisplay
      bar={
        <>
          <span className="reelsPage-bar-profile">
            <div className="large-font bold">Your story</div>
            <div className="reelsPage-bar-profile__data">
              <ProfileImage sizeInRem={3.5} imageURL={profile?.ProfileImage} />
              <div className="medium-font">{profile?.Email}</div>
            </div>
          </span>
          {file && (
            <span className="reelsPage-bar-formData">
              <div className="reelsPage-bar-formData__mediaFile"></div>
              <div className="reelsPage-bar-formData__buttons shadow-above">
                <Button onClick={discardFile}>Discard</Button>
                <Button onClick={postStory}>Post story</Button>
              </div>
            </span>
          )}
        </>
      }
      content={
        <>
          {file ? (
            <div className="reelsPage-form-preview shadow-around">
              <span>Preview</span>
              <div className="reelsPage-form-preview__image">
                <img src={file[1]} />
              </div>
            </div>
          ) : (
            <>
              <div className="reelsPage-form-option">
                <div className="reelsPage-form-option__file">
                  <FileDropElement handleFileChange={handleFileChange} />
                  <span>Create story with media file</span>
                </div>
              </div>
              <div className="reelsPage-form-option"></div>
            </>
          )}
        </>
      }
    />
  );
}
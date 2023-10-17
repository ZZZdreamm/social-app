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
import { CropImage } from "../../components/cropImage/CropImage";
import { Input } from "../../_utils/input/Input";

export function AddReelsPage() {
  const navigate = useNavigate();
  const { profile } = useAuthenticationContext();
  const [file, setFile] = useState<[File, string]>();
  const [croppedFile, setCroppedFile] = useState<[File, string]>();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const postStory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) return setErrors({ name: "Name is required" });
    if (!profile?.Id || !croppedFile) return;
    const post = await postReels({
      Name: name,
      MediaFile: croppedFile[0],
      AutorId: profile?.Id,
      CreationTime: Date.now(),
      ExpirationTime: ONE_DAY,
    });
    if (post) navigate("/");
    else alert("Something went wrong");
  };

  const discardFile = () => {
    setCroppedFile(undefined);
    setFile(undefined);
  };

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
          {file && croppedFile && (
            <form
              onSubmit={(e) => postStory(e)}
              className="reelsPage-bar-formData"
            >
              <div className="reelsPage-bar-formData__data">
                <div className="reelsPage-bar-formData__data__input">
                  <label style={{ padding: "0 0.5rem" }}>Name your story</label>
                  <Input
                    className="medium-font"
                    setValue={setName}
                    error={errors?.name}
                  />
                </div>
              </div>
              <div className="reelsPage-bar-formData__buttons shadow-above">
                <Button onClick={discardFile}>Discard</Button>
                <Button type="submit" color="blue">
                  Post story
                </Button>
              </div>
            </form>
          )}
        </>
      }
      content={
        <>
          {file ? (
            <div
              className="reelsPage-form-preview shadow-around"
              style={{ position: "relative" }}
            >
              <span className="large-font">Preview</span>
              <CropImage file={file} setCroppedFile={setCroppedFile} />
            </div>
          ) : (
            <div className="reelsPage-form-optionContainer">
              <div className="reelsPage-form-option">
                <div className="reelsPage-form-option__file">
                  <FileDropElement
                    handleFileChange={handleFileChange}
                    multiple={false}
                  />
                  <span>Create story with media file</span>
                </div>
              </div>
            </div>
          )}
        </>
      }
    />
  );
}

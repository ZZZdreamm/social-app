import { useEffect, useState } from "react";
import uuid4 from "uuid4";
import { ReadyImagesURL } from "../../globals/appUrls";
import { storageRef } from "../../services/Firebase/FirebaseConfig";
import "./style.scss";
import { profileDTO } from "../../services/Models/profiles.models";
import TopModal from "../../_utils/ModalAtTop/ModalAtTop";
import FileInput from "../../_utils/FileInput/FileInput";
import { axiosBase } from "../../globals/apiPaths";
import { useProfilesRelationsContext } from "../../services/Contexts/ProfileDataContext";
import { useAuthenticationContext } from "../../services/Contexts/AuthenticationContext";
import { ProfileProps } from ".";

interface ProfileUpProps extends ProfileProps {
  setContent: React.Dispatch<React.SetStateAction<string>>;
  userFriends: profileDTO[];
  setRelationship: React.Dispatch<
    React.SetStateAction<usersRelation | undefined>
  >;
}

export const ProfileUp = ({
  userProfile,
  setContent,
  userFriends,
  relationship,
  setRelationship,
}: ProfileUpProps) => {
  const { profile, setProfile } = useAuthenticationContext();
  const {
    friends,
    friendsRequests,
    sentFriendsRequests,
    setFriends,
    setFriendsRequests,
    setSentFriendsRequests,
  } = useProfilesRelationsContext();

  const [file, setFile] = useState<File>();
  const [isOpen, setIsOpen] = useState(false);
  const [choosenImage, setChoosenImage] = useState(
    userProfile?.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`
  );

  useEffect(() => {
    if (!userProfile) return;
    setChoosenImage(
      userProfile?.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`
    );
  }, [userProfile]);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  async function changeProfileImage() {
    let url: any;
    if (file) {
      const imageRef = storageRef.child(
        `/profileImages/${file?.name}+${uuid4()}`
      );
      await imageRef.put(file!);
      url = await imageRef.getDownloadURL();
    }
    setChoosenImage(url!);
    const updateProfileDto = {
      Id: profile?.Id,
      Email: profile?.Email,
      ProfileImage: url,
    };
    await axiosBase.patch("profiles/update", updateProfileDto);
    localStorage.setItem("profileImage", url);
    setProfile({
      Id: profile?.Id ?? "",
      Email: profile?.Email ?? "",
      ProfileImage: url,
    });
  }

  async function acceptFriendRequest() {
    const response = await axiosBase.patch<profileDTO>(
      `profiles/acceptFriendRequest?userId=${profile?.Id}&friendId=${
        userProfile!.Id
      }`
    );
    const addedFriend = response.data;
    const newFriendRequests = friendsRequests!.filter(
      (tempFriend) => tempFriend.Id !== userProfile!.Id
    );
    setFriendsRequests(newFriendRequests);
    let newFriends = [...friends!];
    newFriends.push(addedFriend);
    setFriends(newFriends);
  }

  async function sendFriendRequest() {
    setRelationship("inFriendRequests");
    const response = await axiosBase.post<profileDTO>(
      `profiles/sendFriendRequest?userId=${profile?.Id}&friendId=${
        userProfile!.Id
      }`
    );
    const friend = response.data;
    //@ts-ignore
    setSentFriendsRequests((prev: profileDTO[]) => [friend, ...prev]);
  }
  async function cancelFriendRequest() {
    setRelationship("stranger");
    const { Id } = (
      await axiosBase.delete<{ Id: string }>(
        `profiles/removeFriendRequest?userId=${profile?.Id}&friendId=${userProfile.Id}`
      )
    ).data;
    const newFriends = sentFriendsRequests!.filter(
      (tempFriend) => tempFriend.Id !== Id
    );
    setSentFriendsRequests(newFriends);
  }
  return (
    <div id="profile-up" className="profile-up">
      <TopModal
        isOpen={isOpen}
        toggleModal={toggleModal}
        children={
          <span
            style={{ padding: "0.4rem", color: "green", textAlign: "center" }}
          >
            Do you want to set this image?
          </span>
        }
        submitButtonText={"Submit"}
        onSubmit={changeProfileImage}
        onClose={() => setChoosenImage(localStorage.getItem("profileImage")!)}
      />
      <div
        className="profile-up-image"
        style={{ backgroundImage: `url(${choosenImage})` }}
      >
        {relationship === "me" && (
          <span className="profile-up-image-input">
            <FileInput
              imageFunction={setChoosenImage}
              fileFunction={setFile}
              callback={toggleModal}
            />
          </span>
        )}
      </div>
      <span className="profile-up-options">
        <span className="profile-up-options-up">
          <img src={choosenImage || `${ReadyImagesURL}/noProfile.jpg`} alt="" />
          <div className="flex-column">
            <span className="bolder large-font" style={{ textAlign: "left" }}>
              {userProfile.Email}
            </span>
            <span className="medium-font left-align hover-underline">
              {userFriends?.length} friends
            </span>
          </div>
        </span>
        <span className="profile-up-options-down">
          <button className="large-font" onClick={() => setContent("posts")}>
            Posts
          </button>
          <button className="large-font" onClick={() => setContent(`friends`)}>
            Friends
          </button>
          {relationship === "stranger" && (
            <button className="large-font" onClick={sendFriendRequest}>
              Add friend
            </button>
          )}
          {relationship === "inFriendRequests" && (
            <button
              className="large-font"
              style={{ backgroundColor: "var(--testColor3)" }}
              onClick={cancelFriendRequest}
            >
              Cancel request
            </button>
          )}
          {relationship === "pendingRequest" && (
            <button
              className="large-font"
              style={{ backgroundColor: "var(--testColor3)" }}
              onClick={acceptFriendRequest}
            >
              Accept request
            </button>
          )}
        </span>
      </span>
    </div>
  );
};

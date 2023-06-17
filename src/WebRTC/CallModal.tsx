import { useState } from "react";
import Modal from "styled-react-modal";
import { profileDTO } from "../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import { ReadyImagesURL } from "../ZZZ_USEFUL COMPONENTS/appUrls";

const StyledModal = Modal.styled`
  width: 20rem;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  flex-direction: column;
  padding:1rem;
  text-align:center;
  gap:1rem;
`;

//@ts-ignore
export default function CallModal({ friend, onSubmit, setCall }: MyModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  function toggleModal() {
    setIsOpen(!isOpen);
    setCall(<></>)
  }
  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      {friend.Email} is calling...
      <div style={{display:'flex', gap:'1rem'}}>
        <img
        className="call-image"
          src={`${ReadyImagesURL}/accept-call.png`}
          onClick={() => {
            toggleModal();
            onSubmit();
          }}
        />
        <img
        className="call-image"
          src={`${ReadyImagesURL}/leave-call.png`}
          onClick={toggleModal}
        />
      </div>
    </StyledModal>
  );
}

interface MyModalProps {
  friend: profileDTO;
  setCall:any;
  onSubmit: any;
}

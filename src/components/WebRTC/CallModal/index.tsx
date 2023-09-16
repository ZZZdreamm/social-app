import { useState } from "react";
import { ReadyImagesURL } from "../../../globals/appUrls";
import { profileDTO } from "../../../services/Models/profiles.models";
import styled from "styled-components";
import DefaultModal from "../../../_utils/defaultModal/DefaultModal";

interface MyModalProps {
  friend: profileDTO;
  setCall: any;
  onSubmit: any;
  onClose: any;
}
export default function CallModal({
  friend,
  onSubmit,
  setCall,
  onClose,
}: MyModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  function toggleModal() {
    setIsOpen(!isOpen);
    setCall(<></>);
  }
  return (
    <DefaultModal isOpen={isOpen} toggleModal={toggleModal}>
      <StyledModal>
        {friend.Email} is calling...
        <div style={{ display: "flex", gap: "1rem" }}>
          <img
            className="call-image"
            src={`${ReadyImagesURL}/accept-call.png`}
            onClick={() => {
              toggleModal();
              onSubmit();
            }}
            alt=""
          />
          <img
            className="call-image"
            src={`${ReadyImagesURL}/leave-call.png`}
            onClick={() => {
              onClose();
              toggleModal();
            }}
            alt=""
          />
        </div>
      </StyledModal>
    </DefaultModal>
  );
}

const StyledModal = styled.div`
  width: 20rem;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  flex-direction: column;
  padding: 1rem;
  text-align: center;
  gap: 1rem;
`;

import styled from "styled-components";
import DefaultModal from "../defaultModal/DefaultModal";
interface MyModalProps {
  isOpen: any;
  toggleModal: any;
  children: any;
}

export default function BigImageModal({
  isOpen,
  toggleModal,
  children,
}: MyModalProps) {

  return (
    <DefaultModal isOpen={isOpen} toggleModal={toggleModal}>
      <StyledModal>{children}</StyledModal>
    </DefaultModal>
  );
}

const StyledModal = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  flex-direction: column;
`;

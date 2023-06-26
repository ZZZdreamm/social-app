import Modal from "styled-react-modal";

const StyledModal = Modal.styled`
  width: 30rem;
  height: 40rem;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  flex-direction: column;
`;

export default function ImageModal({
  isOpen,
  toggleModal,
  children
}:ImageModalProps) {
  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      {children}
    </StyledModal>
  );
}


interface ImageModalProps{
  isOpen:any;
  toggleModal:any;
  children:any;
}
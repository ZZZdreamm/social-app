import Modal from "styled-react-modal";

const StyledModal = Modal.styled`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  flex-direction: column;
`;

//@ts-ignore
export default function BigImageModal({
  isOpen,
  toggleModal,
  children,
}: MyModalProps) {
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

interface MyModalProps {
  isOpen: any;
  toggleModal: any;
  children: any;
}

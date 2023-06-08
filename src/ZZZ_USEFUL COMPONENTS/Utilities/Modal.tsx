import Modal from "styled-react-modal";

const StyledModal = Modal.styled`
  width: 30rem;
  height: 30rem;
  display: flex;
  align-items: center;
  background-color: #fff0a5;
  flex-direction: column;
`;

//@ts-ignore
export default function MyModal({
  isOpen,
  toggleModal,
  children,
  submitButtonText,
  onSubmit,
  disableSubmit
}:MyModalProps) {
  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      {children}
      <div>
        <button
        disabled={disableSubmit}
          onClick={() => {
            toggleModal();
            onSubmit();
          }}
        >
          {submitButtonText}
        </button>
        <button onClick={toggleModal}>Close</button>
      </div>
    </StyledModal>
  );
}


interface MyModalProps{
  isOpen:any;
  toggleModal:any;
  children:any;
  submitButtonText:string;
  onSubmit:any;
  disableSubmit?:boolean
}
import Modal from "styled-react-modal";

const StyledModal = Modal.styled`
  position: absolute;
  top: 0;
  width: 70vw;
  height: 13vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
  background-color: #ffffff;
  border-radius: 0 0 1rem 1rem;
`;

//@ts-ignore
export default function TopModal({
  isOpen,
  toggleModal,
  children,
  submitButtonText,
  onSubmit,
  onClose,
  disableSubmit,
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
        <button onClick={()=>{
          onClose()
          toggleModal()
          }}>Close</button>
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
  onClose:any;
  disableSubmit?:boolean;
}
import Modal from "styled-react-modal";

const StyledModal = Modal.styled`
  position: absolute;
  top: 0;
  width: 60vw;
  height: 13vh;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  justify-content: space-between;
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
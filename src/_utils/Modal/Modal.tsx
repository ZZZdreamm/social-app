import Modal from "styled-react-modal";

const StyledModal = Modal.styled`
  width: 30rem;
  height: 40rem;
  display: flex;
  align-items: center;
  background-color: var(--navColor);
  flex-direction: column;
  border-radius: 1rem;
  box-shadow: 0 12px 28px 0 var(--typicalShadow), 0 2px 4px 0 rgba(0, 0, 0, 0.4), inset 0 0 0 1px var(--shadowInset);
`;

//@ts-ignore
export default function MyModal({
  isOpen,
  toggleModal,
  children,
  submitButtonText,
  onSubmit,
  disableSubmit,
}: MyModalProps) {
  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      {children}
      <div style={{display:'flex', gap: '0.5rem'}}>
        <button
          data-testid="modalSubmit"
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

interface MyModalProps {
  isOpen: any;
  toggleModal: any;
  children: any;
  submitButtonText: string;
  onSubmit: any;
  disableSubmit?: boolean;
}

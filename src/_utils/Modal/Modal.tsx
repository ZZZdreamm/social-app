import { useEffect, useRef } from "react";
import styled from "styled-components";
import DefaultModal from "../defaultModal/DefaultModal";

interface MyModalProps {
  isOpen: any;
  toggleModal: any;
  children: any;
  submitButtonText: string;
  onSubmit: any;
  disableSubmit?: boolean;
}

interface OverlayProps {
  isOpen: boolean;
}

export default function MyModal({
  isOpen,
  toggleModal,
  children,
  submitButtonText,
  onSubmit,
  disableSubmit,
}: MyModalProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  // const handleClickOutside = (event: any) => {
  //   if (isOpen) {
  //     if (event.key === "Escape") {
  //       toggleModal();
  //       return;
  //     }
  //     if (
  //       elementRef.current &&
  //       !elementRef.current.contains(event.target as Node)
  //     ) {
  //       toggleModal();
  //     }
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <DefaultModal isOpen={isOpen} toggleModal={toggleModal}>
      <StyledModal ref={elementRef}>
        {children}
        <div style={{ display: "flex", gap: "0.5rem" }}>
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
    </DefaultModal>
  );
}

const StyledModal = styled.div`
  position: relative;
  width: 30rem;
  max-height: 40rem;
  padding-bottom: 0.5rem;
  display: flex;
  align-items: center;
  background-color: var(--navColor);
  flex-direction: column;
  border-radius: 1rem;
  box-shadow: 0 12px 28px 0 var(--typicalShadow), 0 2px 4px 0 rgba(0, 0, 0, 0.4),
    inset 0 0 0 1px var(--shadowInset);
`;

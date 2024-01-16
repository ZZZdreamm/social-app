import { useEffect, useRef } from "react";
import styled from "styled-components";
import Portal from "../Portal/Portal";

interface MyModalProps {
  isOpen: any;
  toggleModal: any;
  children: any;
}

interface OverlayProps {
  isOpen: boolean;
}

export default function DefaultModal({
  isOpen,
  toggleModal,
  children,
}: MyModalProps) {
  //   const elementRef = useRef<HTMLDivElement>(null);
  //   const handleClickOutside = (event: any) => {
  //     if (isOpen) {
  //       if (event.key === "Escape") {
  //         toggleModal();
  //         return;
  //       }
  //       if (
  //         elementRef.current &&
  //         !elementRef.current.contains(event.target as Node)
  //       ) {
  //         toggleModal();
  //       }
  //     }
  //   };

  //   useEffect(() => {
  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, []);

  return (
    <Portal>
      <Overlay isOpen={isOpen}>
        {children}
      </Overlay>
    </Portal>
  );
}

const Overlay = styled.div<OverlayProps>`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
`;

// const StyledModal = styled.div`
//   width: 30rem;
//   height: 40rem;
//   display: flex;
//   align-items: center;
//   background-color: var(--navColor);
//   flex-direction: column;
//   border-radius: 1rem;
//   box-shadow: 0 12px 28px 0 var(--typicalShadow), 0 2px 4px 0 rgba(0, 0, 0, 0.4),
//     inset 0 0 0 1px var(--shadowInset);
// `;

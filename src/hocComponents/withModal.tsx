import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Portal from "../_utils/Portal/Portal";

interface OverlayProps {
  isOpen: boolean;
}

interface WithModalProps {
  isOpen: boolean;
  toggleModal: () => void;
}

const withModal = (WrappedComponent: React.ComponentType<any>) => {
  return function WithModal({
    isOpen,
    toggleModal,
    ...rest
  }: WithModalProps) {
    const elementRef = useRef<HTMLDivElement>(null);

    return (
      <Portal>
        <Overlay isOpen={isOpen} ref={elementRef}>
          <WrappedComponent {...rest} />
        </Overlay>
      </Portal>
    );
  };
};

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

export default withModal;

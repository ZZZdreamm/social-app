import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

interface EnterFromProps {
  children: React.ReactNode;
  from: "left" | "right" | "top" | "bottom";
  start: string;
  timeToEnterAfter?: number;
}

export function EnterFrom({
  children,
  from,
  start,
  timeToEnterAfter = 0,
}: EnterFromProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (containerRef.current && containerRef.current.style[from]) {
      setTimeout(() => {
        if (containerRef.current) {
          console.log(containerRef.current.style[from]);
          containerRef.current.style[from] = "0";
        }
      }, timeToEnterAfter);
    }
  }, [containerRef, location.pathname]);
  return (
    <Container ref={containerRef} style={{ [from]: start }} from={from}>
      {children}
    </Container>
  );
}

const Container = styled.div<{
  from: string;
}>`
  position: relative;
  transition: ${({ from }) => from} 0.5s ease-in-out;
`;

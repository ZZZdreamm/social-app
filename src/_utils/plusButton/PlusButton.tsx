import styled from "styled-components";

interface Props {
  handleClick?: () => void;
}

export function PlusButton({ handleClick = () => {} }: Props) {
  return (
    <Container onClick={handleClick}>
      <Plus>+</Plus>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: var(--navColor);
  box-sizing: border-box;
  padding: 0.2rem;
  cursor: pointer;
  height: 2.5rem;
  width: 2.5rem;
`;

const Plus = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--testColor3);
  color: var(--navColor);
  font-size: 2.2rem;
  font-weight: 600;
  line-height: 1.6rem;
`;

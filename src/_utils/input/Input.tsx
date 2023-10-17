import styled from "styled-components";

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  setValue: (value: string) => void;
  error?: string;
}

export function Input({ setValue, error, ...props }: InputProps) {
  return (
    <InputContainer>
      <InputField onChange={(e) => setValue(e.target.value)} {...props} />
      {error && <Error>{error}</Error>}
    </InputContainer>
  );
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  gap: 0.5rem;
`;

const InputField = styled.input`
  width: 100%;
  height: 1.6rem;
  border-radius: 0.5rem;
`;

const Error = styled.div`
  height: 1.6rem;
  color: red;
`;

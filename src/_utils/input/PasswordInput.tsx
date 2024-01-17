import { useState } from "react";
import styled from "styled-components";
import { Input } from "./Input";
import { ButtonIconSize } from "../../globals/constants";
import { ButtonIcon } from "../buttonIcon/ButtonIcon";
import { EyeIcon } from "../../assets/icons/EyeIcon";
import { ClosedEyeIcon } from "../../assets/icons/ClosedEyeIcon";

interface Props {
  name?: string;
  placeholder?: string;
}

export function PasswordInput({
  name = "password",
  placeholder = "Password",
}: Props) {
  const [passwordVisible, setPasswordVisibile] = useState(false);

  const togglePasswordInput = () => {
    setPasswordVisibile((passwordVisible) => !passwordVisible);
  };
  return (
    <PasswordContainer>
      <PasswordInputContainer>
        <Input
          name={name}
          placeholder={placeholder}
          typeOfInput={passwordVisible ? "text" : "password"}
        />
      </PasswordInputContainer>
      <PasswordEye>
        <ButtonIcon
          onClick={togglePasswordInput}
          icon={passwordVisible ? <EyeIcon /> : <ClosedEyeIcon />}
          color="inputs"
          size={ButtonIconSize.medium}
        />
      </PasswordEye>
    </PasswordContainer>
  );
}

const PasswordContainer = styled.div`
  display: flex;
  position: relative;
  background: ${({ theme }) => theme.colors.inputs};
  border-radius: 8px;
`;

const PasswordInputContainer = styled.div`
  width: calc(100% - 48px);
`;

const PasswordEye = styled.div`
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
`;

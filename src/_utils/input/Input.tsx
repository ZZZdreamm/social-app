import styled from 'styled-components'
import { forwardRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { Text } from '../text/Text'

type InputTypes = 'dropdown' | 'text'

export interface InputOnlyProps {
  name: string
  typeOfInput?: 'text' | 'password'
  placeholder?: string
  inputOptions?: string[]
  required?: boolean
}

interface InputWithTypeProps extends InputOnlyProps {
  type?: InputTypes
}

export interface InputProps
  extends React.HTMLAttributes<HTMLInputElement>,
    InputWithTypeProps {}

export const Input = forwardRef(
  (
    {
      type = 'text',
      typeOfInput = 'text',
      placeholder,
      inputOptions = [],
      name,
      required = false,
      ...props
    }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const {
      register,
      setValue,
      formState: { errors },
    } = useFormContext()
    // const [showOptions, setShowOptions] = useState(false)
    // const toggleOptions = () => {
    //   setShowOptions((showOptions) => !showOptions)
    // }
    // const chooseOption = (option: string) => {
    //   setValue(`${name}`, option)
    //   toggleOptions()
    // }

    // const blockWriting = type === 'dropdown'

    return (
      <InputWrapper {...register(name)}>
        <LeftSide>
          <InputStyled
            ref={ref}
            name={name}
            type={typeOfInput}
            placeholder={placeholder}
            // readOnly={blockWriting}
            {...props}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <ErrorMessageContainer>
                <Text fontSize={10} color="red" lineHeight={132}>
                  {message}
                </Text>
              </ErrorMessageContainer>
            )}
          />
        </LeftSide>
        {/* {type === 'dropdown' && (
          <>
            <ButtonIcon
              size={ButtonIconSize.large}
              color="ecru"
              icon={<ArrowIcon size={ButtonIconSize.vSmall} direction="down" />}
              onClick={toggleOptions}
              inCircle={false}
            />
            {showOptions && (
              <DropdownOptionsList
                inputOptions={inputOptions}
                chooseOption={chooseOption}
              />
            )}
          </>
        )} */}
      </InputWrapper>
    )
  }
)


const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  background: ${({ theme }) => theme.colors.inputs};
  border-radius: 8px;
  padding-left: 12px;
  width: 100%;
  height: 48px;
  box-sizing: border-box;
`

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const InputStyled = styled.input`
  width: 90%;
  background: transparent;
  font-size: 14px;
  line-height: 100%;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
  cursor: auto;
  border: none;
  outline: none;
`

const ErrorMessageContainer = styled.div`
  position: absolute;
  bottom: 2px;
  left: 12px;
`

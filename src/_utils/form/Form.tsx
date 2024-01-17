import {
  useForm,
  SubmitHandler,
  FormProvider,
  DefaultValues,
} from "react-hook-form";
import { FormRegister } from "../../models/FormRegister";
import { FormLogin } from "../../models/FormLogin";
import styled from "styled-components";

export type FormValues = FormRegister | FormLogin;

interface FormProps<T> extends React.HTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  handleOnSubmit?: (values: T) => void;
  defaultValues?: T;
}

export default function Form<T extends FormValues>({
  children,
  handleOnSubmit = () => {},
  defaultValues,
}: FormProps<T>) {
  const methods = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<T> = (values) => handleOnSubmit(values);

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>{children}</StyledForm>
    </FormProvider>
  );
}

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

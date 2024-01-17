import { useState } from "react";
import { userCredentials } from "../../../models/auth.models";
import "./style.scss";
import { Input } from "../../../_utils/input/Input";
import Form from "../../../_utils/form/Form";
import { FormLogin } from "../../../models/FormLogin";
import { PasswordInput } from "../../../_utils/input/PasswordInput";

export default function AuthForm({ model, onSubmit, formName = "Login" }: authFormProps) {
  const [submission, setSubmission] = useState(false);
  // //@ts-ignore
  // const onSubmit = (values, actions) => {
  //   props.onSubmit(values);
  //   setSubmission(true);
  //   setTimeout(() => {
  //     setSubmission(false);
  //   }, 3000);
  // };
  // const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
  //   useFormik({
  //     initialValues: {
  //       email: props.model.email,
  //       password: props.model.password,
  //     },
  //     validationSchema: basicSchema,
  //     onSubmit,
  //   });
  const handleSubmit = (values: FormLogin) => {
    console.log(values);
    onSubmit(values);
    setSubmission(true);
    setTimeout(() => {
      setSubmission(false);
    }, 3000);
  };
  return (
    // <form className="auth-form" onSubmit={handleSubmit}>
    <Form handleOnSubmit={handleSubmit}>
      <Input name="email" placeholder="Email" />
      {/* <div className="error" style={{ minHeight: "4rem" }}>
      </div> */}
      <PasswordInput name="password" placeholder="Password" />
      {/* <div className="error" style={{ minHeight: "4rem" }}>
      </div> */}
      <button
        className="auth-submit"
        disabled={submission}
        type="submit"
        style={{ marginTop: "25px" }}
      >
        {formName}
      </button>
    </Form>
  );
}
interface authFormProps {
  model: userCredentials;
  onSubmit(values: userCredentials): void;
  formName?: string;
}

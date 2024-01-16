import { useFormik } from "formik";
import { useState } from "react";
import { userCredentials } from "../../../models/auth.models";
import { basicSchema } from "../Schemas";
import "./style.scss";
import { Input } from "../../../_utils/input/Input";
import Form from "../../../_utils/form/Form";
import { FormLogin } from "../../../models/FormLogin";
import { PasswordInput } from "../../../_utils/input/PasswordInput";

export default function AuthForm(props: authFormProps, ifRegister: boolean) {
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
    props.onSubmit(values);
    setSubmission(true);
    setTimeout(() => {
      setSubmission(false);
    }, 3000);
  }
  return (
    // <form className="auth-form" onSubmit={handleSubmit}>
    <Form handleOnSubmit={handleSubmit}>
      <Input name="email" placeholder="Email" />
      {/* <div className="error" style={{ minHeight: "4rem" }}>
      </div> */}
      <PasswordInput name="password" placeholder="Password"/>
      {/* <div className="error" style={{ minHeight: "4rem" }}>
      </div> */}
      <button
        className="auth-submit"
        disabled={submission}
        type="submit"
        style={{ marginTop: "25px" }}
      >
        Submit
      </button>
    </Form>
  );
}
interface authFormProps {
  model: userCredentials;
  onSubmit(values: userCredentials): void;
  submitButtonName: string;
}

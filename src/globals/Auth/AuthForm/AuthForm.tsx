import { useFormik } from "formik";
import { useState } from "react";
import { userCredentials } from "../../../services/Models/auth.models";
import { basicSchema } from "../Schemas";
import "./style.scss";

export default function AuthForm(props: authFormProps, ifRegister: boolean) {
  const [submission, setSubmission] = useState(false);
  //@ts-ignore
  const onSubmit = (values, actions) => {
    props.onSubmit(values);
    setSubmission(true);
    setTimeout(() => {
      setSubmission(false);
    }, 3000);
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: props.model.email,
        password: props.model.password,
      },
      validationSchema: basicSchema,
      onSubmit,
    });
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        autoComplete="on"
        style={{ textAlign: "left" }}
        className="auth-input my-input"
        onChange={handleChange}
        onBlur={handleBlur}
        id="email"
        type="email"
        placeholder="Email"
      />
      {/* {touched.email && errors.email && ( */}
      <div className="error" style={{ minHeight: "2rem" }}>
        {errors.email}
      </div>
      {/* )} */}
      <input
        autoComplete="on"
        style={{ textAlign: "left" }}
        className="auth-input my-input"
        onChange={handleChange}
        onBlur={handleBlur}
        id="password"
        type="password"
        placeholder="Password"
      />

      <div className="error" style={{ minHeight: "2rem" }}>
        {errors.password}
      </div>
      <button
        className="auth-submit"
        disabled={submission}
        type="submit"
        style={{ marginTop: "25px" }}
      >
        Submit
      </button>
    </form>
  );
}
interface authFormProps {
  model: userCredentials;
  onSubmit(values: userCredentials): void;
  submitButtonName: string;
}

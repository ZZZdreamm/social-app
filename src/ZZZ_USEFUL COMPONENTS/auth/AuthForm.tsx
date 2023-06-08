import { userCredentials } from "./auth.models";
import { useFormik } from "formik";
import { basicSchema } from "./Schemas";
import { useState } from "react";

export default function AuthForm(props: authFormProps, ifRegister: boolean) {
  const [submission, setSubmission] = useState(false)
  //@ts-ignore
  const onSubmit = (values, actions) => {
      props.onSubmit(values)
      setSubmission(true)
      setTimeout(()=>{
        setSubmission(false)
      },3000)
  }
  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema:basicSchema,
    onSubmit
  });
  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        style={{ textAlign: "left" }}
        className="my-input"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        id="email"
        type="email"
        placeholder="Enter your email"
      />
      {touched.email &&  errors.email && <div className="error">{errors.email}</div>}
      <label htmlFor="password">Password</label>
      <input
        style={{ textAlign: "left" }}
        className="my-input"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        id="password"
        type="password"
        placeholder="Enter your password"
      />
      {touched.password && errors.password && <div className="error">{errors.password}</div>}
      <button disabled={submission} type="submit">Submit</button>
    </form>
  );
}
interface authFormProps {
  model: userCredentials;
  onSubmit(
    values: userCredentials
  ): void;
  submitButtonName: string;
}

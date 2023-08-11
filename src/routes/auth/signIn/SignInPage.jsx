import React from "react";
import Form from "../sign-up-form/SignUpForm";
import SignInForm from "./SignInForm";
import "./style.scss"
const SignUpPage = () => {
  return (
    <div className="form-container">
      <SignInForm />
      <Form />
    </div>
  );
};

export default SignUpPage;

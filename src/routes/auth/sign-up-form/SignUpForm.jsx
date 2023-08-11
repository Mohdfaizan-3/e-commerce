import React, { useState } from "react";
import {
  createUserAuthWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../../utils/firebase/firebase";
import Button from "../../../components/button/Button";
import  './styles.scss'

const defaultFormFeilds = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Form = () => {
  const [formFeilds, setFormFeilds] = useState(defaultFormFeilds);
  const { displayName, email, password, confirmPassword } = formFeilds;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFeilds({
      ...formFeilds,
      [name]: value,
    });
  };

  const resetFormFields = () => {
    setFormFeilds(defaultFormFeilds);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("password does not match");
      return;
    }

    if (password.length < 5) {
      alert("enter password length greater than 5");
      return;
    }

    try {
      const { user } = await createUserAuthWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("cannot create user- email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }

    resetFormFields();
  };

  return (
    <div className="SignUpform-container">
    <h2>don't have an account? sign up</h2>

      <form onSubmit={handleSubmit}>
        <label id="name">Name</label>
        <input
          type="text"
          placeholder="enter the name"
          onChange={handleChange}
          value={displayName}
          required
          name="displayName"
        />

        <label id="email">email</label>
        <input
          type="email"
          placeholder="enter the email"
          onChange={handleChange}
          value={email}
          required
          name="email"
        />

        <label id="password">password</label>
        <input
          type="password"
          placeholder="enter the password"
          onChange={handleChange}
          value={password}
          required
          name="password"
        />

        <label id="confirmPassword">confirm Password</label>
        <input
          type="password"
          placeholder="confirm password"
          onChange={handleChange}
          value={confirmPassword}
          required
          name="confirmPassword"
        />

<Button type="submit" buttonType={"inverted"}>submit</Button>
      </form>
    </div>
  );
};

export default Form;

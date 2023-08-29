import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../components/button/Button";
import {
  signInUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../../utils/firebase/firebase";
import "./style.scss";

const defaultFormFeilds = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFeilds, setFormFeilds] = useState(defaultFormFeilds);
  const { email, password } = formFeilds;
  // const { setCurrentUser } = useContext(UserContext);
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

    try {
      await signInUserWithEmailAndPassword(email, password);
      resetFormFields();
      toast.success("sign in successfully");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          toast.error("wrong password");
          break;
        case "auth/user-not-found":
          toast.error("user not found");
          break;
        default:
          console.error(error);
      }
    }

    resetFormFields();
  };

  const signInGoogleUser = async () => {
    await signInWithGooglePopup();
  };

  return (
    <>
      <div className="signInForm-container">
        <h2> have an account? sign in</h2>

        <form onSubmit={handleSubmit}>
          <label id="email">email</label>
          <input
            type="email"
            placeholder="enter the email"
            onChange={handleChange}
            value={email}
            required
            name="email"
            autoComplete="true"
          />

          <label id="password">password</label>
          <input
            type="password"
            placeholder="enter the password"
            onChange={handleChange}
            value={password}
            required
            name="password"
            autoComplete="false"
          />

          <div
            style={{
              display: "flex",
              width: "100%",
              marginTop: "20px",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              style={{ width: "80px" }}
              type="submit"
              buttonType={"inverted"}
            >
              submit
            </Button>
            <Button
              style={{ width: "80px" }}
              type="button"
              buttonType={"google"}
              onClick={signInGoogleUser}
            >
              google signIn
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInForm;

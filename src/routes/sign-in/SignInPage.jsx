import React from "react";
import { signInWithGooglePopup } from "../../utils/firebase/firebase";

const SignInPage = () => {
  const logGoogleUser = async () => {
    const user = await signInWithGooglePopup();
    console.log(user);
  };
  return (
    <div>
      <button onClick={logGoogleUser}>signIn with google</button>
    </div>
  );
};

export default SignInPage;

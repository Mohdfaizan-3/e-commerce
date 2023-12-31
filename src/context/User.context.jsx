import React, { createContext, useEffect, useState } from "react";
import {
  authStateChangeEventListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const unsubscribe = authStateChangeEventListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      

      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export default UserContextProvider;

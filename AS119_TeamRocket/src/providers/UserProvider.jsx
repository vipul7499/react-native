import React, { useState, useEffect, createContext } from "react";
import { auth, createUserProfileDocument } from "../utils/firebase";

export const UserContext = createContext(null);

const UserProvider = (props) => {
  const [user, setUser] = useState({ data: null, loading: true });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      const user = await createUserProfileDocument(userAuth);
      if (userAuth) {
        setUser({ data: user, loading: false });
      } else {
        setUser({ data: null, loading: false });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;

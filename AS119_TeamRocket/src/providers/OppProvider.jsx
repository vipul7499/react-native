import React, { useState, useEffect, createContext } from "react";

export const OppContext = createContext(null);

const OppProvider = (props) => {
  const [opp, setOpp] = useState({data:null});

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
//       const user = await createUserProfileDocument(userAuth);
//       if (userAuth) {
//         setUser({ data: user, loading: false });
//       } else {
//         setUser({ data: null, loading: false });
//       }
//     });
//     return () => unsubscribe();
//   }, []);

  return (
    <OppContext.Provider value={[opp, setOpp]}>
      {props.children}
    </OppContext.Provider>
  );
};

export default OppProvider;

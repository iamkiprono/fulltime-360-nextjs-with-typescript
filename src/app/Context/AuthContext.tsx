"use client";

import { ReactNode, createContext, useEffect, useState } from "react";

type stateProps = {
  email: string;
  token: string;
};

export type ContextProps = {
  state: stateProps | null;
  updateUser: (x: stateProps | null) => void;
};

export const AuthContext = createContext<ContextProps | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  //   const [state, dispatch] = useReducer(AuthReducer, { user: null });
  const [state, setState] = useState<stateProps | null>(null);

  const updateUser = (user: stateProps | null) => {
    setState(user);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      updateUser(JSON.parse(user));
    }
  }, []);

  console.log("AuthContext:", state);
  return (
    <AuthContext.Provider value={{ state, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

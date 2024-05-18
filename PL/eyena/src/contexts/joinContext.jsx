import { createContext, useState } from "react";

export const JoinContext = createContext();

export const JoinContextProvider = ({ children }) => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    step: 1,
  });

  return (
    <JoinContext.Provider value={{ registerData, setRegisterData }}>
      {children}
    </JoinContext.Provider>
  );
};

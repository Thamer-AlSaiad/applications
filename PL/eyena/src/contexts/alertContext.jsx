import { createContext, useState } from "react";

export const AlertContext = createContext();

export const AlertContextProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
  });

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

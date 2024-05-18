import { createContext, useState } from "react";

export const SideMenuContext = createContext();

export const SideMenuProvider = ({ children }) => {
  const [showSideMenu, setShowSideMenu] = useState(false);

  const handleShowSideMenu = () => setShowSideMenu(!showSideMenu);

  return (
    <SideMenuContext.Provider value={{ showSideMenu, handleShowSideMenu }}>
      {children}
    </SideMenuContext.Provider>
  );
};

import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
export const AuthContext = createContext();

export const AuthContextContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const data = localStorage.getItem("userData") || null;
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  const loginUser = async (email, password) => {
    const res = await fetch(`http://localhost:8333/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usernameOrEmail: email, password }),
    });
    const data = await res.json();
    if (data.status === "success") {
      setUserData(data.data);
      localStorage.setItem("userData", JSON.stringify(data.data));
    }
    return data.status === "success";
  };
  const registerUser = async (newUser) => {
    const res = await fetch(`http://localhost:8333/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();
    if (data.status === "success") {
      setUserData(data.user);
      localStorage.setItem("userData", JSON.stringify(data.user));
    }
    return data.status === "success";
  };

  const logoutUser = () => {
    setUserData(null);
    localStorage.removeItem("userData");
  };

  const contextData = {
    userData,
    loginUser,
    logoutUser,
    registerUser,
    setUserData,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
AuthContextContextProvider.propTypes = {
  children: PropTypes.node,
};

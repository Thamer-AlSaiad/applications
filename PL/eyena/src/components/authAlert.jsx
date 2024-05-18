import { useContext } from "react";
import { AlertContext } from "../contexts/alertContext";

export const AuthAlert = () => {
  const { alert } = useContext(AlertContext);
  return (
    <div
      className={
        "fixed left-4 top-4 px-4 py-2 bg-red-600 text-white rounded-md transition-custom " +
        (alert.show ? "opacity-100" : "opacity-0")
      }
      role="alert"
    >
      {alert.message}
    </div>
  );
};

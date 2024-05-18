import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { CartContext } from "../contexts/cartContext";
export const ButtonLeave = ({ handleShowSideMenu }) => {
  const navigate = useNavigate();
  const { logoutUser } = useContext(AuthContext);
  const { setCart } = useContext(CartContext);

  const handleLeave = () => {
    logoutUser();
    setCart((prev) => ({
      ...prev,
      items: [],
      total: 0,
    }));
    localStorage.removeItem("cart");
    if (handleShowSideMenu) handleShowSideMenu();
    navigate("/");
  };

  return (
    <button
      className="px-3 py-1 border border-primary rounded-md transition-custom hover:bg-primary hover:text-secondary"
      onClick={handleLeave}
    >
      Leave
    </button>
  );
};

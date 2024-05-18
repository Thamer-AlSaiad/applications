import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { SideMenuContext } from "../contexts/sideMenuContext";
import { Link } from "react-router-dom";
import { ButtonLeave } from "./buttonLeave";

export const SideMenu = () => {
  const { userData } = useContext(AuthContext);
  const { showSideMenu, handleShowSideMenu } = useContext(SideMenuContext);

  return (
    <menu
      className={
        "z-40 md:hidden absolute top-0 h-screen pl-4 pr-16 flex flex-col justify-between bg-secondary transition-custom " +
        (showSideMenu ? "left-0" : "-left-80")
      }
    >
      <ul className="font-bold text-xl mt-20 flex flex-col gap-6">
        <li>
          <Link to="/" className="nav-link" onClick={handleShowSideMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/explore" className="nav-link" onClick={handleShowSideMenu}>
            Explore
          </Link>
        </li>
      </ul>
      {userData && (
        <div className="mb-8">
          <ButtonLeave handleShowSideMenu={handleShowSideMenu} />
        </div>
      )}
    </menu>
  );
};

import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { CartContext } from "../contexts/cartContext";
import { OwlIcon } from "./icons/owlIcon";
import { BurgerMenu } from "./burgerMenu";
import { NavCart } from "./navCart";
import { SideMenuProvider } from "../contexts/sideMenuContext";
import { SideMenu } from "./sideMenu";
import { ButtonLeave } from "./buttonLeave";

const UserNavigation = () => {
  const { userData } = useContext(AuthContext);
  return (
    <div className="flex items-center gap-4">
      <Link to="/dashboard" className="nav-link">
        {userData.username}
      </Link>
      <div className="hidden md:block">
        <ButtonLeave />
      </div>
    </div>
  );
};

const VisitorNavigation = () => {
  return (
    <div className="flex justify-center items-center gap-4 font-bold">
      <Link to="/signin" className="">
        Sign In
      </Link>
      <Link
        to="/join"
        className="px-3 py-1 border border-primary rounded-md transition hover:bg-primary hover:text-secondary"
      >
        Join
      </Link>
    </div>
  );
};

export const Navbar = () => {
  const { userData } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <SideMenuProvider>
      <nav className="relative flex justify-between items-center px-4 py-4 md:px-8 bg-secondary">
        <SideMenu />
        <div className="flex items-center gap-4">
          <BurgerMenu />
          <div className="w-12">
            <Link to="/">
              <OwlIcon />
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center gap-8">
          <ul className="font-bold gap-6 hidden md:flex">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/explore" className="nav-link">
                Explore
              </Link>
            </li>
          </ul>
          <NavCart cart={cart} />
          {userData ? <UserNavigation /> : <VisitorNavigation />}
        </div>
      </nav>
    </SideMenuProvider>
  );
};

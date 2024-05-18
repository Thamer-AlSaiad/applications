import PropTypes from "prop-types";
import { ButtonLeave } from "../../components/buttonLeave";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";
function Header({ sidebarOpen, setSidebarOpen }) {
  const { userData } = useContext(AuthContext);
  return (
    <header className="flex w-full border-b-2 border-neutral-400">
      <div className="flex flex-grow items-center justify-between px-4 py-3 md:px-6 lg:justify-end 2xl:px-11">
        <button
          aria-controls="sidebar"
          onClick={(e) => {
            e.stopPropagation();
            setSidebarOpen(!sidebarOpen);
          }}
          className=" flex w-8 flex-col justify-between gap-y-1 rounded-sm shadow-sm hover:scale-105 lg:hidden"
        >
          <span
            className={
              "block h-[6px] rounded-full bg-neutral-800 transition-all duration-200 ease-cubic " +
              (sidebarOpen ? "translate-y-2 rotate-45" : "w-full")
            }
          ></span>
          <span
            className={
              "block h-[6px] rounded-full bg-neutral-800 transition-all duration-200 ease-cubic " +
              (sidebarOpen ? "w-0" : "w-full")
            }
          ></span>
          <span
            className={
              "block h-[6px] rounded-full bg-neutral-800 transition-all duration-200 ease-cubic " +
              (sidebarOpen ? "-translate-y-3 -rotate-45" : "w-full")
            }
          ></span>
        </button>
        <div className="flex items-center gap-4">
          <div className="block">
            <Link to="/dashboard" className="nav-link font-semibold">
              {userData.username}
            </Link>
          </div>
          <ButtonLeave />
        </div>
      </div>
    </header>
  );
}
Header.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};
export default Header;

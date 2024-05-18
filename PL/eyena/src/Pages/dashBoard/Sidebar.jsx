import { useContext, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/authContext";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { logoutUser, userData } = useContext(AuthContext);
  const { pathname } = useLocation();
  const sidebar = useRef(null);
  const trigger = useRef(null);
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-10 flex h-screen w-72 flex-col overflow-y-hidden border-r-2 border-neutral-300 bg-neutral-100 px-4 py-6 duration-300 ease-linear lg:fixed lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <span
        ref={trigger}
        className="absolute right-2 top-9 h-8 w-8 cursor-pointer lg:hidden"
        onClick={() => setSidebarOpen(false)}
      >
        <svg
          className="fill-current"
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
            fill=""
          />
        </svg>
      </span>
      <Link
        to="/"
        className="mb-8 flex w-fit items-center justify-center gap-x-2 bg-neutral-100"
      >
        <div className="h-9 w-9 rounded-full bg-black"></div>
        <span className="text-4xl font-bold">Eyena</span>
      </Link>
      <div className="mb-2 border-b-2 border-neutral-400 px-3 py-[6px] font-fredoka text-3xl font-semibold text-neutral-800">
        MENU
      </div>
      <div className="flex flex-col gap-y-2">
        <Link
          to="/dashboard/profile"
          className={`flex flex-row items-center gap-x-2 rounded-md px-3 py-[6px] font-fredoka text-xl  font-medium text-neutral-950 transition-all duration-200 hover:bg-neutral-200  ${pathname.includes("profile") ? "bg-neutral-200" : ""}`}
        >
          <svg
            className="h-8 w-8 fill-neutral-800"
            viewBox="0 0 22 22"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z"
              fill=""
            ></path>
            <path
              d="M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156ZM4.53748 19.8687H17.4969V17.0844C17.4969 14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.53748Z"
              fill=""
            ></path>
          </svg>
          Profile
        </Link>
        {userData.userType === "Administrator" && (
          <>
            <Link
              to="/dashboard/products"
              className={`flex flex-row items-center gap-x-2 rounded-md px-3 py-[6px] font-fredoka text-xl  font-medium text-neutral-950 transition-all duration-200 hover:bg-neutral-200 ${pathname.includes("products") ? "bg-neutral-200" : ""}`}
            >
              <svg
                className="h-8 w-8 fill-neutral-800"
                viewBox="0 0 22 22"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.5 0H1.5C0.675 0 0 0.675 0 1.5V20.5C0 21.325 0.675 22 1.5 22H20.5C21.325 22 22 21.325 22 20.5V1.5C22 0.675 21.325 0 20.5 0ZM20 20H2V2H20V20ZM11 3.5C11.825 3.5 12.5 4.175 12.5 5C12.5 5.825 11.825 6.5 11 6.5C10.175 6.5 9.5 5.825 9.5 5C9.5 4.175 10.175 3.5 11 3.5ZM17 18H5V16H17V18ZM17 14H5V12H17V14ZM17 10H5V8H17V10Z"
                  fill=""
                ></path>
              </svg>
              Products
            </Link>
            <Link
              to="/dashboard/users"
              className={`flex flex-row items-center gap-x-2 rounded-md px-3 py-[6px] font-fredoka text-xl  font-medium text-neutral-950 transition-all duration-200 hover:bg-neutral-200 ${pathname.includes("users") ? "bg-neutral-200" : ""}`}
            >
              <svg
                className="h-8 w-8 fill-neutral-800"
                viewBox="0 0 22 22"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.5 0H1.5C0.675 0 0 0.675 0 1.5V20.5C0 21.325 0.675 22 1.5 22H20.5C21.325 22 22 21.325 22 20.5V1.5C22 0.675 21.325 0 20.5 0ZM20 20H2V2H20V20ZM11 3.5C11.825 3.5 12.5 4.175 12.5 5C12.5 5.825 11.825 6.5 11 6.5C10.175 6.5 9.5 5.825 9.5 5C9.5 4.175 10.175 3.5 11 3.5ZM17 18H5V16H17V18ZM17 14H5V12H17V14ZM17 10H5V8H17V10Z"
                  fill=""
                ></path>
              </svg>
              Users
            </Link>
          </>
        )}
      </div>
      <button
        onClick={logoutUser}
        className="mt-auto justify-self-end rounded-lg px-4 py-2 font-fredoka text-xl font-medium hover:bg-neutral-200"
      >
        Log Out
      </button>
    </aside>
  );
}
Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};
export default Sidebar;

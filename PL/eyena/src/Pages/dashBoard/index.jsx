import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Outlet, useNavigate } from "react-router-dom";
import { SEO } from "../../components/SEO";
import Sidebar from "./Sidebar";
import Header from "./Header";
export let Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/signin");
    }
  }, [navigate, userData]);

  return (
    <div>
      {userData && (
        <div>
          <SEO
            title={`Eyena - ${userData.username}`}
            description={`${userData.username} dashboard`}
          />
          <div className="flex min-h-screen overflow-hidden lg:ml-72">
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            <div className=" flex min-h-screen max-w-screen-2xl flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              <main className="flex h-full p-4 flex-1">
                <Outlet />
              </main>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

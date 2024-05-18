import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import { Navbar } from "../components/navbar";
import { JoinPage } from "../pages/join";
import { JoinContextProvider } from "../contexts/joinContext";
import { SigninPage } from "../pages/signin";
import { HomePage } from "../pages/home";
import { ProductPage } from "../pages/product";
import { ExplorePage } from "../pages/explore";
import { Dashboard } from "../pages/dashBoard";
import { CheckOut } from "../pages/checkOut";
import { Delivering } from "../pages/delivering";
import { Profile } from "../pages/dashBoard/profile";
import Products from "../Pages/dashBoard/Products";
import Users from "../Pages/dashBoard/Users";

const NavLayout = () => {
  return (
    <div className="h-screen w-full max-w-screen-2xl mx-auto">
      <Navbar />
      <Outlet />
    </div>
  );
};

export const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NavLayout />}>
          <Route index element={<HomePage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="product/:name" element={<ProductPage />} />
          <Route path="checkOut" element={<CheckOut />} />
          <Route path="delivering" element={<Delivering />} />
        </Route>
        <Route
          path="/join"
          element={
            <JoinContextProvider>
              <JoinPage />
            </JoinContextProvider>
          }
        />
        <Route path="signin" element={<SigninPage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate replace to={"profile"} />} />
          <Route path="profile" element={<Profile />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
};

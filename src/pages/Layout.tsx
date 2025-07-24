import { Outlet } from "react-router-dom";
import CustomNavbar from "../components/CustomNavbar";
import CustomFooter from "../components/CustomFooter";

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <CustomNavbar />
      <main className="flex-grow-1 bg-main">
        <Outlet />
      </main>
      <CustomFooter />
    </div>
  );
};

export default Layout;


import MainNavbar from "./MainNavbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-gray-800 shadow-md">
        <MainNavbar />
      </header>
      <main className="top-30 fixed inset-x-20 shadow-md">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

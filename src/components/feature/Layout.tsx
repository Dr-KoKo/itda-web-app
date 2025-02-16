import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <h1>This is Layout!</h1>
      <Outlet />
    </>
  );
};

export default Layout;

import { useAuth } from "react-oidc-context";
import MainNavbar from "./MainNavbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const auth = useAuth();

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

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

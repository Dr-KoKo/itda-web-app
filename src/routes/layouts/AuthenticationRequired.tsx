import { withAuthenticationRequired } from "react-oidc-context";
import { Outlet } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export default withAuthenticationRequired(Outlet, {
  OnRedirecting: () => <div>Redirecting to the login page...</div>,
});

import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Routes";
import { AuthProvider } from "react-oidc-context";
import { AUTH_URL } from "./constants/application";

const oidcConfig = {
  authority: AUTH_URL.AUTHORITY,
  client_id: AUTH_URL.CLIENT_ID,
  redirect_uri: AUTH_URL.REDIRECT_URI,
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

const App = () => {
  return (
    <>
      <AuthProvider {...oidcConfig}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;

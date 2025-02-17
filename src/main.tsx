import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { AuthProvider } from "react-oidc-context";
import { AUTH_URL } from "./constants/application.ts";

const oidcConfig = {
  authority: AUTH_URL.AUTHORITY,
  client_id: AUTH_URL.CLIENT_ID,
  redirect_uri: AUTH_URL.REDIRECT_URI,
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </StrictMode>,
);

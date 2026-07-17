import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { ThemeProvider } from "@material-tailwind/react";
import { HelmetProvider } from "react-helmet-async";
import { OidcProvider } from "@axa-fr/react-oidc";
import Authenticating from "./callbacks/Authenticating";
import AuthenticationError from "./callbacks/AuthenticationError";
import Loading from "./callbacks/Loading";
import SessionLost from "./callbacks/SessionLost";
import configuration, { SSOEnabled } from "./configuration";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      {SSOEnabled ? (
        <OidcProvider
          configuration={configuration}
          authenticatingComponent={Authenticating}
          authenticatingErrorComponent={AuthenticationError}
          loadingComponent={Loading}
          sessionLostComponent={SessionLost}
        >
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </OidcProvider>
      ) : (
        <ThemeProvider>
          <App />
        </ThemeProvider>
      )}
    </HelmetProvider>
  </React.StrictMode>,
);

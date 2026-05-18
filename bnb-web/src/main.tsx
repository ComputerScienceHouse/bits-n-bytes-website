import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import App from './App'
import { ThemeProvider } from '@material-tailwind/react'
import { HelmetProvider } from 'react-helmet-async'
import configuration, { SSOEnabled } from './configuration'
import { OidcProvider, OidcSecure } from '@axa-fr/react-oidc'
import Authenticating from './callbacks/Authenticating'
import AuthenticationError from './callbacks/AuthenticationError'
import Loading from './callbacks/Loading'
import SessionLost from './callbacks/SessionLost'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
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
        
    </StrictMode>
  )
import { Auth0Provider } from "@auth0/auth0-react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"

createRoot(document.getElementById("root") as HTMLElement).render(
  <Auth0Provider
    domain="dev-a4f84osjtf6lx7y2.us.auth0.com"
    clientId="gJBgYkpN97GUgSJgfcdLu0TULQxCxYXF"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
)

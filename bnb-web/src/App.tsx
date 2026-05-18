import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Button } from "./components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import { navigationMenuTriggerStyle } from "./components/ui/navigation-menu";
import Home from "./home";
import AboutPage from "./About";
import AdminPage from "./admin/Dashboard";
import InventoryPage from "./admin/Inventory";
import RegistrationPage from "./admin/Registration";
import { OidcSecure } from "@axa-fr/react-oidc";
import AppNav from "./AppNav";

export default function App() {
    return (
        <BrowserRouter>
        <AppNav/>
        <main className="bg-gradient-to-b from-background/50 to-background/50">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/admin" element={<OidcSecure><AdminPage/></OidcSecure>}/>
            <Route path="/admin/inventory" element={<OidcSecure><InventoryPage/></OidcSecure>}></Route>
            <Route path="/admin/registration" element={<OidcSecure><RegistrationPage/></OidcSecure>}></Route>
        </Routes>
        </main>
        </BrowserRouter>
    )
}
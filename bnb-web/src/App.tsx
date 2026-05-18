import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Button } from "./components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import { navigationMenuTriggerStyle } from "./components/ui/navigation-menu";
import Home from "./home";
import AboutPage from "./About";
import AdminPage from "./admin/Dashboard";
import InventoryPage from "./admin/Inventory";
import RegistrationPage from "./admin/Registration";

export default function App() {
    return (
        <BrowserRouter>
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--foreground)] bg-background/80 backdrop-blur-sm">
          <div className="flex items-center justify-between h-16 px-4 max-w-7xl mx-auto">
            {/* Home Button */}
            <Button variant="ghost" className="hover:bg-primary/10">
                {/* <Home className="h-5 w-5" /> */}
                <Link to='/'>Bits &apos;n Bytes</Link>
            </Button>

            {/* Navigation Links */}
            <NavigationMenu>
              <NavigationMenuList className="group flex flex-1 list-none items-center justify-center space-x-1 flex-row">
                <NavigationMenuItem>
                  <Link to={"/"} className={navigationMenuTriggerStyle()}>Home</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to={"/about"} className={navigationMenuTriggerStyle()}>About</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to={"/admin"} className={navigationMenuTriggerStyle()}>Admin</Link>
                </NavigationMenuItem>
                {/* <NavigationMenuItem>
                    <Link to={"/funding"} className={navigationMenuTriggerStyle()}>Funding</Link>
                </NavigationMenuItem> */}
                {/* <NavigationMenuItem>
                  <Link to={"/contact"} className={navigationMenuTriggerStyle()}>Contact</Link>
                </NavigationMenuItem> */}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </header>
        <main className="bg-gradient-to-b from-background/50 to-background/50">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path="/admin/inventory" element={<InventoryPage/>}></Route>
            <Route path="/admin/registration" element={<RegistrationPage/>}></Route>
        </Routes>
        </main>
        </BrowserRouter>
    )
}
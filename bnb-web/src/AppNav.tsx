import { Button } from "./components/ui/button"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import { Link } from "react-router-dom";
import { navigationMenuTriggerStyle } from "./components/ui/navigation-menu";
import UserInfo from "./UserInfo"
import { SSOEnabled } from "./configuration";
import { getUseOidcAccessToken, getUseOidcHook, NoSSOProfilePicture, NoSSOUserInfo } from "./SSODisabledDefaults";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function AppNav() {
  const {logout} = getUseOidcHook()();
    const {accessTokenPayload} = getUseOidcAccessToken()();
    const userInfo = SSOEnabled
        ? (accessTokenPayload as UserInfo)
        : NoSSOUserInfo;
    return (
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
                {userInfo && <NavigationMenuItem className="flex gap-x-1">
                    <img
                    className="rounded-full"
                    src={
                        SSOEnabled
                        ? `https://profiles.csh.rit.edu/image/${userInfo.preferred_username}`
                        : NoSSOProfilePicture
                    }
                    alt=""
                    aria-hidden={true}
                    width={32}
                    height={32}
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="flex gap-x-1">
                            <div className="flex my-auto">
                              <span  style={{fontFamily:'monospace'}}>{userInfo.preferred_username}</span>
                              <ChevronDown className="w-6 h-6"/>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onSelect={() => logout(null)}>Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                </NavigationMenuItem>}
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
    )
}
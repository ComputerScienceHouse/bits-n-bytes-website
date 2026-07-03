import {
  getUseOidcAccessToken,
  getUseOidcHook,
  NoSSOProfilePicture,
  NoSSOUserInfo,
} from "@/SSODisabledDefaults";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import UserInfo from "@/UserInfo";
import { SSOEnabled } from "@/configuration";

export default function Profile() {
  const { logout } = getUseOidcHook()();
  const { accessTokenPayload } = getUseOidcAccessToken()();
  const userInfo = SSOEnabled ? (accessTokenPayload as UserInfo) : NoSSOUserInfo;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex font-mono text-sm gap-x-2 px-5">
          <img
            src={
              SSOEnabled
                ? `https://profiles.csh.rit.edu/image/${userInfo.preferred_username}`
                : NoSSOProfilePicture
            }
            alt="profile picture"
            className="w-6 h-6 rounded-full bg-accent"
          />
          <span className="my-auto">{userInfo.preferred_username}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => logout(null)} className="hover:bg-muted!">
            <span className="text-magenta">Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

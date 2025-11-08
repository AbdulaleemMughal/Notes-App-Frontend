import { Loader2, LogOut, Moon, Sun, UserPen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useTheme } from "next-themes";

export const UserDropdown = () => {
  const { logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
          ></AvatarImage>
          <AvatarFallback>User Image</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <UserPen /> Edit Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => e.preventDefault()}
          onClick={() => handleLogout()}
        >
          {loading ? <Loader2 className="animate-spin" /> : <LogOut />} Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

import { NotebookPen, Search } from "lucide-react";
import { Button } from "./ui/button";
import { UserDropdown } from "./UserDropdown";
import { Input } from "./ui/input";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";

export const Header = () => {
  const isUserLoggedIn = useSelector((store: RootState) => store.user.user);

  return (
    <header className="py-3 px-16 bg-white border-b border-gray-200 dark:bg-neutral-800 dark:border-none max-sm:w-screen max-sm:px-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span>
            <NotebookPen size={45} color="#8f32ec" />
          </span>
          <h3 className="text-2xl text-[#8f32ec] font-semibold max-sm:text-xl">
            Quick Notes
          </h3>
        </div>
        {isUserLoggedIn && (
          <div className="flex items-center space-x-3 max-sm:space-x-0">
            <div className="flex w-full max-w-sm items-center gap-2 max-sm:hidden">
              <Input type="search" placeholder="Search" />
              <Button
                type="submit"
                variant="outline"
                size="icon"
                className="cursor-pointer"
              >
                <Search />
              </Button>
            </div>
            <UserDropdown img={isUserLoggedIn.image} />
          </div>
        )}
      </div>
    </header>
  );
};

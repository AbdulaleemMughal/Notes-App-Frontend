import { Moon, NotebookPen, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { UserDropdown } from "./UserDropdown";
import { Tooltip, TooltipTrigger, TooltipContent} from '@/components/ui/tooltip'

export const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="py-3 px-5 bg-white border-b border-gray-200 dark:bg-neutral-800">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span>
            <NotebookPen size={45} color="#8f32ec" />
          </span>
          <h3 className="text-2xl text-[#8f32ec] font-semibold">Quick Notes</h3>
        </div>
        <div className="flex items-center space-x-3">
            <Tooltip>
                <TooltipTrigger>
                    <Button
            variant="outline"
            size="icon"
            className="rounded-full cursor-pointer"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Moon /> : <Sun />}
          </Button>
                </TooltipTrigger>
                <TooltipContent className="text-[14px]">
                    {theme === 'dark' ? "Light Mode" : "Dark Mode"}
                </TooltipContent>
            </Tooltip>
          
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

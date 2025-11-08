import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Badge } from "./ui/badge";
import { Grid2x2, List } from 'lucide-react';

const layouts = [
    {
        id: 1,
        label: "Grid",
        value: 'grid',
        icon: Grid2x2
    },
    {
        id: 2,
        label: "List",
        value: 'list',
        icon: List 
    },
]

export const LayoutDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge
          variant="outline"
          className="py-1 px-4 text-[15px] cursor-pointer transition-all duration-150 hover:bg-[#ff6608]"
        >
          Grid
          <Grid2x2 />
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {
            layouts.map((layout) => {
                const Icon = layout.icon;
                return (
                <DropdownMenuItem key={layout.id} className="cursor-pointer hover:bg-accent flex justify-between items-center">{layout.label} <Icon /></DropdownMenuItem>
            )
            })
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

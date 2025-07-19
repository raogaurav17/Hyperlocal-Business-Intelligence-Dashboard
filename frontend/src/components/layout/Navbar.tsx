import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ToggleTheme from "./ToggleTheme";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="text-xl font-semibold tracking-tight">Hyperlocal Admin</div>
      <div className="flex-1 flex justify-center px-4">
        <Input
          className="w-full max-w-md rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
          placeholder="Search..."
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="rounded-full p-0 w-10 h-10">
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="mt-2">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ToggleTheme />
    </header>
  );
}

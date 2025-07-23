import React from "react";
import { Home, BarChart, Map, Settings, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
  active: string;
  setActive: (name: string) => void;
}

const navLinks = [
  { name: "Sales", icon: Home },
  // { name: "QueryUser", icon: BarChart },
  { name: "Heatmap", icon: Map },
  { name: "Analytics", icon: BarChart },
  { name: "Insights", icon: BarChart },
  { name: "Settings", icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ className, active, setActive }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-[110] bg-white dark:bg-gray-900 rounded-full p-2 shadow border border-gray-200 dark:border-gray-800"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6 text-primary" />
      </button>

      {/* Mobile overlay + sidebar */}
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "absolute top-[4.5rem] left-0 z-[110] w-64 h-[calc(100vh-4.5rem)] bg-white dark:bg-gray-900 shadow-xl border-r border-gray-200 dark:border-gray-800 p-4 flex flex-col gap-2",
              className
            )}
          >
            {/* Sidebar content */}
            <div className="uppercase text-xs text-gray-400 font-semibold mb-2 px-1 tracking-widest">
              Main Menu
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
            const isActive = link.name === active;
            return (
              <button
                key={link.name}
                type="button"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium text-left w-full",
                  isActive
                    ? "bg-primary/20 text-primary dark:bg-primary/20 shadow"
                    : "bg-blue-100 text-blue-900 hover:bg-blue-200 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800"

                )}
                aria-current={isActive ? "page" : undefined}
                onClick={() => {
                  setActive(link.name);
                  setOpen(false);
                }}
              >
                <link.icon className={cn("w-5 h-5", isActive ? "text-primary" : "")}/>
                <span>{link.name}</span>
              </button>
            );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Desktop sidebar (sticky at left) */}
      <aside
        className={cn(
          "hidden md:flex md:fixed md:top-[4.5rem] md:left-0 z-[100] w-[20vw] h-[calc(100vh-4.5rem)] flex-col gap-2 p-4 border-r border-gray-200 dark:border-gray-800 bg-gradient-to-b from-white/90 to-gray-100 dark:from-gray-900/90 dark:to-gray-950 shadow-xl",
          className
        )}
      >
        <div className="flex items-center justify-between mb-10 relative">
            <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary/90 flex items-center justify-center text-white font-bold text-xl shadow">
                <Home className="w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Admin
            </span>
            </div>
            
        </div>
        <div className="uppercase text-xs text-gray-400 font-semibold mb-2 px-1 tracking-widest">
          Main Menu
        </div>
        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = link.name === active;
            return (
              <button
                key={link.name}
                type="button"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium text-left w-full",
                  isActive
                    ? "bg-blue-900 text-white dark:bg-blue-200 dark:text-blue-900 shadow"
                    : "bg-blue-100 text-blue-900 hover:bg-blue-200 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800"
                )}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setActive(link.name)}
              >
                <link.icon className={cn("w-5 h-5", isActive ? "" : "")}/>
                <span>{link.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

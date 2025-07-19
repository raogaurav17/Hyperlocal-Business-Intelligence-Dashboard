import {Sun, Moon } from "lucide-react";
import * as React from "react"; 


const ToggleTheme = () => {

const [dark, setDark] = React.useState(() =>
    typeof window !== "undefined"
        ? document.documentElement.classList.contains("dark")
        : false
    );

    const toggleTheme = () => {
        const html = document.documentElement;
        if (html.classList.contains("dark")) {
        html.classList.remove("dark");
        setDark(false);
        localStorage.setItem("theme", "light");
        } else {
        html.classList.add("dark");
        setDark(true);
        localStorage.setItem("theme", "dark");
        }
    };

    React.useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved === "dark") {
        document.documentElement.classList.add("dark");
        setDark(true);
        } else if (saved === "light") {
        document.documentElement.classList.remove("dark");
        setDark(false);
        }
    }, []);
    return (
        <button
            onClick={toggleTheme}
            className="absolute right-0 top-0 md:static md:ml-auto p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200 shadow"
            aria-label="Toggle theme"
            >
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
    )
}

export default ToggleTheme
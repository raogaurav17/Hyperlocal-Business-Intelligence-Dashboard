

import "./App.css";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import Dashboard from "@/pages/Dashboard";

export default function App() {
  const NAVBAR_HEIGHT = "4.5rem";
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />
       <div className="flex flex-1 min-h-0" style={{ paddingTop: NAVBAR_HEIGHT }}>
        <Sidebar className="h-full" />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto md:ml-64">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

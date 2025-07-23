import "./App.css";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { useState } from "react";

import QueryUser from "./pages/QueryUser";
import Heatmap from "@/pages/Heatmap";
import Analytics from "@/pages/Analytics";
import Insights from "@/pages/Insights";
import Settings from "@/pages/Settings";
import SalesData from "./pages/SalesData";

export default function App() {
  //variablle to track which state is active in the sidebar
  const [active, setActive] = useState("QueryUser");

  const NAVBAR_HEIGHT = "4.5rem";
  // Render the correct page based on sidebar selection
  function renderPage() {
    switch (active) {
      case "QueryUser":
        return <QueryUser />;
      case "Sales":
        return <SalesData />;
      case "Heatmap":
        return <Heatmap />;
      case "Analytics":
        return <Analytics />;
      case "Insights":
        return <Insights />;
      case "Settings":
        return <Settings />;
      default:
        return <QueryUser />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />
      <div className="flex flex-1 min-h-0" style={{ paddingTop: NAVBAR_HEIGHT }}>
        <Sidebar className="h-full" active={active} setActive={setActive} />
        <main className="w-[80vw] flex-1 p-4 md:p-8 md:ml-64">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

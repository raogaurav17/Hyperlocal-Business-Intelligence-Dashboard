import "./App.css";
import Navbar from "@/components/layout/Navbar";
import Dashboard from "./pages/Dashboard";
import Menu from "./components/layout/Menu";

export default function App() {
  // Render the correct page based on sidebar selection
  document.documentElement.classList.add("dark");
  return (
    <div className="dark min-h-screen bg-gray-950 text-white flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-16">
        <main className="flex-1 p-4 md:p-8">
          <h1 className="text-4xl font-extrabold mb-2">Dashboard Overview</h1>
          <p className="text-lg text-gray-400 mb-6">Comprehensive business intelligence at your fingertips</p>
          <Menu />
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

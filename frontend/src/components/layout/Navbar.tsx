

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 flex items-center px-6 z-50 shadow" style={{background: "var(--color-background)", color: "var(--color-foreground)"}}>
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg" style={{color: "var(--color-primary)"}}>Hyperlocal BI</span>
      </div>
      <div className="ml-auto flex items-center gap-4">
      </div>
    </nav>
  );
}

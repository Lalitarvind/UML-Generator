'use client';

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
// import { Sun, Moon } from "lucide-react"
// import { useTheme } from "@/components/theme-provider"

// function ModeToggle() {
//   const { theme, setTheme } = useTheme()
//   const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

//   return (
//     <Button variant="ghost" size="icon" onClick={() => setTheme(isDark ? "light" : "dark")}>
//       {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
//       <span className="sr-only">Toggle theme</span>
//     </Button>
//   )
// }

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur border-b">
      <div className="container flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight">
          Auto-UML
        </Link>

        {/* Navigation links */}
        <div className="flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/generate" className="hover:text-primary transition-colors">
            Generate
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* <ModeToggle /> */}
          <Button variant="outline" size="sm" className="ml-2">
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
}

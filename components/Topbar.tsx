"use client";

import { Button } from "@/components/ui/button";
import { Menu, User, Building2 } from "lucide-react";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-blue-50 via-white to-orange-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="flex h-16 items-center px-4 gap-4">
        {/* Hamburger menu button (mobile only) */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Spacer for mobile */}
        <div className="flex-1 lg:flex-initial" />

        {/* App title - centered */}
        <div className="flex items-center gap-3 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 shadow-lg">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Sri Sumeru Reality
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Construction Management System</p>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* User icon button */}
        <Button variant="ghost" size="icon" className="hover:bg-blue-50 transition-colors">
          <User className="h-5 w-5" />
          <span className="sr-only">User menu</span>
        </Button>
      </div>
    </header>
  );
}


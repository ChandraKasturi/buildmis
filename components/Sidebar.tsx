"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  TrendingUp,
  DollarSign,
  Activity,
  Shield,
  FolderKanban,
  Settings,
  ChevronDown,
  ChevronRight,
  Wallet,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  submenu?: {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [isReportsExpanded, setIsReportsExpanded] = useState(true);
  const pathname = usePathname();

  // Theme colors for different routes
  const getThemeColors = (href: string) => {
    if (href === "/") return {
      bg: "bg-blue-100 hover:bg-blue-50",
      text: "text-blue-700",
      icon: "text-blue-600",
      border: "border-l-4 border-blue-500"
    };
    if (href === "/reports/portfolio") return {
      bg: "bg-blue-100 hover:bg-blue-50",
      text: "text-blue-700",
      icon: "text-blue-600",
      border: "border-l-4 border-blue-500"
    };
    if (href === "/reports/budget") return {
      bg: "bg-purple-100 hover:bg-purple-50",
      text: "text-purple-700",
      icon: "text-purple-600",
      border: "border-l-4 border-purple-500"
    };
    if (href === "/reports/receivables") return {
      bg: "bg-green-100 hover:bg-green-50",
      text: "text-green-700",
      icon: "text-green-600",
      border: "border-l-4 border-green-500"
    };
    if (href === "/reports/progress") return {
      bg: "bg-orange-100 hover:bg-orange-50",
      text: "text-orange-700",
      icon: "text-orange-600",
      border: "border-l-4 border-orange-500"
    };
    if (href === "/reports/safety") return {
      bg: "bg-red-100 hover:bg-red-50",
      text: "text-red-700",
      icon: "text-red-600",
      border: "border-l-4 border-red-500"
    };
    if (href === "/reports/cash") return {
      bg: "bg-emerald-100 hover:bg-emerald-50",
      text: "text-emerald-700",
      icon: "text-emerald-600",
      border: "border-l-4 border-emerald-500"
    };
    if (href === "/projects") return {
      bg: "bg-teal-100 hover:bg-teal-50",
      text: "text-teal-700",
      icon: "text-teal-600",
      border: "border-l-4 border-teal-500"
    };
    if (href === "/settings") return {
      bg: "bg-gray-100 hover:bg-gray-50",
      text: "text-gray-700",
      icon: "text-gray-600",
      border: "border-l-4 border-gray-500"
    };
    return {
      bg: "hover:bg-gray-50",
      text: "text-gray-700",
      icon: "text-gray-500",
      border: ""
    };
  };

  const navItems: NavItem[] = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    {
      name: "Reports",
      icon: FileText,
      submenu: [
        { name: "Portfolio Summary", href: "/reports/portfolio", icon: Briefcase },
        { name: "Budget vs Actual", href: "/reports/budget", icon: TrendingUp },
        { name: "Receivables & Collections", href: "/reports/receivables", icon: DollarSign },
        { name: "Project Progress", href: "/reports/progress", icon: Activity },
        { name: "Safety & Compliance", href: "/reports/safety", icon: Shield },
        { name: "Cash & Bank Position", href: "/reports/cash", icon: Wallet },
      ],
    },
    { name: "Projects", href: "/projects", icon: FolderKanban },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 border-r bg-gradient-to-b from-gray-50 to-white transition-transform duration-300 lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo/Brand area */}
          <div className="flex h-16 items-center border-b px-6 bg-gradient-to-r from-blue-600 to-purple-600">
            <LayoutDashboard className="h-6 w-6 text-white" />
            <span className="ml-2 text-lg font-semibold text-white">MIS</span>
          </div>

          {/* Navigation items */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {navItems.map((item) => {
                if (item.submenu) {
                  // Reports section with submenu
                  return (
                    <div key={item.name}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setIsReportsExpanded(!isReportsExpanded)}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                        {isReportsExpanded ? (
                          <ChevronDown className="ml-auto h-4 w-4" />
                        ) : (
                          <ChevronRight className="ml-auto h-4 w-4" />
                        )}
                      </Button>
                      {isReportsExpanded && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.submenu.map((subItem) => {
                            const isActive = pathname === subItem.href;
                            const themeColors = getThemeColors(subItem.href);
                            return (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={handleLinkClick}
                              >
                                <Button
                                  variant="ghost"
                                  className={cn(
                                    "w-full justify-start transition-all duration-200 relative",
                                    isActive 
                                      ? `${themeColors.bg} ${themeColors.text} ${themeColors.border} font-medium shadow-sm`
                                      : `${themeColors.bg.split(' ')[1]} text-gray-600 hover:text-gray-900`
                                  )}
                                >
                                  <subItem.icon className={cn(
                                    "mr-2 h-4 w-4",
                                    isActive ? themeColors.icon : "text-gray-500"
                                  )} />
                                  {subItem.name}
                                </Button>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                } else {
                  // Regular navigation item
                  const isActive = pathname === item.href;
                  const themeColors = getThemeColors(item.href!);
                  return (
                    <Link
                      key={item.name}
                      href={item.href!}
                      onClick={handleLinkClick}
                    >
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start transition-all duration-200 relative",
                          isActive 
                            ? `${themeColors.bg} ${themeColors.text} ${themeColors.border} font-medium shadow-sm`
                            : `${themeColors.bg.split(' ')[1]} text-gray-600 hover:text-gray-900`
                        )}
                      >
                        <item.icon className={cn(
                          "mr-2 h-4 w-4",
                          isActive ? themeColors.icon : "text-gray-500"
                        )} />
                        {item.name}
                      </Button>
                    </Link>
                  );
                }
              })}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t p-4 bg-gradient-to-r from-gray-100 to-gray-50">
            <p className="text-xs text-gray-500 text-center font-medium">
              Construction MIS v1.0
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}


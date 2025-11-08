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
          "fixed left-0 top-0 z-50 h-full w-64 border-r bg-background transition-transform duration-300 lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo/Brand area */}
          <div className="flex h-16 items-center border-b px-6">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <span className="ml-2 text-lg font-semibold">MIS</span>
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
                            return (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={handleLinkClick}
                              >
                                <Button
                                  variant={isActive ? "secondary" : "ghost"}
                                  className={cn(
                                    "w-full justify-start",
                                    isActive && "bg-secondary font-medium"
                                  )}
                                >
                                  <subItem.icon className="mr-2 h-4 w-4" />
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
                  return (
                    <Link
                      key={item.name}
                      href={item.href!}
                      onClick={handleLinkClick}
                    >
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start",
                          isActive && "bg-secondary font-medium"
                        )}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </Button>
                    </Link>
                  );
                }
              })}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t p-4">
            <p className="text-xs text-muted-foreground text-center">
              Construction MIS v1.0
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}


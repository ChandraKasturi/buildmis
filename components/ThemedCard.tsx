import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ThemedCardProps {
  children: React.ReactNode;
  theme?: "portfolio" | "budget" | "receivables" | "progress" | "safety" | "cash" | "default";
  className?: string;
}

const themeStyles = {
  portfolio: {
    gradient: "from-blue-100 via-blue-50 to-white",
    border: "from-blue-400 via-blue-300 to-cyan-300",
    borderColor: "border-blue-200/50",
    shadow: "hover:shadow-blue-200/50",
  },
  budget: {
    gradient: "from-purple-100 via-purple-50 to-white",
    border: "from-purple-500 via-purple-400 to-fuchsia-400",
    borderColor: "border-purple-200/50",
    shadow: "hover:shadow-purple-200/50",
  },
  receivables: {
    gradient: "from-green-100 via-green-50 to-white",
    border: "from-green-400 via-green-300 to-emerald-300",
    borderColor: "border-green-200/50",
    shadow: "hover:shadow-green-200/50",
  },
  progress: {
    gradient: "from-orange-100 via-orange-50 to-white",
    border: "from-orange-400 via-orange-300 to-amber-300",
    borderColor: "border-orange-200/50",
    shadow: "hover:shadow-orange-200/50",
  },
  safety: {
    gradient: "from-red-100 via-red-50 to-white",
    border: "from-red-400 via-red-300 to-rose-300",
    borderColor: "border-red-200/50",
    shadow: "hover:shadow-red-200/50",
  },
  cash: {
    gradient: "from-emerald-100 via-emerald-50 to-white",
    border: "from-emerald-400 via-teal-300 to-cyan-300",
    borderColor: "border-emerald-200/50",
    shadow: "hover:shadow-emerald-200/50",
  },
  default: {
    gradient: "from-gray-100 via-gray-50 to-white",
    border: "from-gray-300 via-gray-200 to-slate-200",
    borderColor: "border-gray-200/50",
    shadow: "hover:shadow-gray-200/50",
  },
};

export function ThemedCard({ children, theme = "default", className }: ThemedCardProps) {
  const styles = themeStyles[theme];

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        "border-2 bg-white",
        styles.borderColor,
        "before:absolute before:inset-0 before:rounded-lg before:p-[2px] before:-z-10",
        "before:bg-gradient-to-br",
        `before:${styles.border}`,
        "before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        className
      )}
    >
      {children}
    </Card>
  );
}


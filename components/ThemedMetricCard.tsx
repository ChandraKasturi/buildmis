import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemedMetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  theme?: "portfolio" | "budget" | "receivables" | "progress" | "safety" | "cash" | "default";
  trend?: {
    value: number;
    isPositive: boolean;
  };
  valueColor?: string;
  className?: string;
}

const themeStyles = {
  portfolio: {
    border: "from-blue-400 via-blue-300 to-cyan-300",
    iconBg: "bg-gradient-to-br from-blue-50 to-cyan-50",
    iconColor: "text-blue-600",
  },
  budget: {
    border: "from-purple-500 via-purple-400 to-fuchsia-400",
    iconBg: "bg-gradient-to-br from-purple-50 to-fuchsia-50",
    iconColor: "text-purple-600",
  },
  receivables: {
    border: "from-green-400 via-green-300 to-emerald-300",
    iconBg: "bg-gradient-to-br from-green-50 to-emerald-50",
    iconColor: "text-green-600",
  },
  progress: {
    border: "from-orange-400 via-orange-300 to-amber-300",
    iconBg: "bg-gradient-to-br from-orange-50 to-amber-50",
    iconColor: "text-orange-600",
  },
  safety: {
    border: "from-red-400 via-red-300 to-rose-300",
    iconBg: "bg-gradient-to-br from-red-50 to-rose-50",
    iconColor: "text-red-600",
  },
  cash: {
    border: "from-emerald-400 via-teal-300 to-cyan-300",
    iconBg: "bg-gradient-to-br from-emerald-50 to-teal-50",
    iconColor: "text-emerald-600",
  },
  default: {
    border: "from-blue-200 via-purple-200 to-pink-200",
    iconBg: "bg-gradient-to-br from-blue-50 to-purple-50",
    iconColor: "text-blue-600",
  },
};

export function ThemedMetricCard({
  title,
  value,
  description,
  icon: Icon,
  theme = "default",
  trend,
  valueColor,
  className,
}: ThemedMetricCardProps) {
  const styles = themeStyles[theme];

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1",
      "border-2 bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50/50",
      "before:absolute before:inset-0 before:rounded-lg before:p-[2px] before:-z-10",
      "before:bg-gradient-to-br",
      `before:${styles.border}`,
      "before:opacity-50 hover:before:opacity-100 before:transition-opacity",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
        <div className={cn("p-2 rounded-lg", styles.iconBg)}>
          <Icon className={cn("h-4 w-4", styles.iconColor)} />
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", valueColor || "text-gray-900")}>{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <span
              className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                trend.isPositive 
                  ? "bg-green-100 text-green-700" 
                  : "bg-red-100 text-red-700"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-muted-foreground ml-2">
              vs last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

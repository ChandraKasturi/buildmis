"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Target,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Import mock data
import budgetData from "@/data/mock/budget.json";
import projectsData from "@/data/mock/projects.json";

export default function BudgetReportPage() {
  // Format currency
  const formatCurrency = (value: number) => {
    return `₹${(value / 10000000).toFixed(1)}Cr`;
  };

  const formatCurrencyDetailed = (value: number) => {
    return `₹${(value / 10000000).toFixed(2)}Cr`;
  };

  // Get summary data
  const summary = budgetData.summary;

  // Prepare chart data
  const varianceChartData = budgetData.budgetData.map((project) => ({
    name: project.projectCode,
    "Expected Cost": project.expectedCost / 10000000,
    "Actual Cost": project.actualCostToDate / 10000000,
    "Variance": project.budgetVariance / 10000000,
  }));

  // Variance percentage chart
  const variancePercentData = budgetData.budgetData.map((project) => ({
    name: project.projectCode,
    "Variance %": project.budgetVariancePercent,
  }));

  // Budget status pie chart
  const budgetStatusData = [
    {
      name: "Under Budget",
      value: summary.projectsUnderBudget,
      color: "#10b981",
    },
    {
      name: "Over Budget",
      value: summary.projectsOverBudget,
      color: "#ef4444",
    },
  ];

  // Cost breakdown data
  const costBreakdownData = [
    {
      name: "Actual Cost",
      value: summary.totalActualCost,
      color: "#3b82f6",
    },
    {
      name: "Committed Cost",
      value: summary.totalCommittedCost,
      color: "#f59e0b",
    },
    {
      name: "Remaining Budget",
      value: summary.totalVariance > 0 ? summary.totalVariance : 0,
      color: "#10b981",
    },
  ];

  // Get status badge variant and color
  const getStatusInfo = (status: string) => {
    if (status === "Over Budget") {
      return {
        variant: "destructive" as const,
        color: "text-red-600",
        icon: AlertTriangle,
      };
    }
    return {
      variant: "default" as const,
      color: "text-green-600",
      icon: CheckCircle2,
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Budget vs Actual
        </h1>
        <p className="text-muted-foreground">
          Cost control and variance analysis
        </p>
      </div>

      {/* Alert for Over Budget Projects */}
      {summary.projectsOverBudget > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Budget Overrun Alert</AlertTitle>
          <AlertDescription>
            {summary.projectsOverBudget} project(s) are currently over budget.
            Immediate review and corrective action required.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expected Cost
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(summary.totalExpectedCost)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Baseline budget
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Actual Cost to Date
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(summary.totalActualCost)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {((summary.totalActualCost / summary.totalExpectedCost) * 100).toFixed(1)}% of budget
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Budget Variance
            </CardTitle>
            {summary.totalVariance >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                summary.totalVariance >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatCurrency(Math.abs(summary.totalVariance))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {summary.totalVariance >= 0 ? "Under budget" : "Over budget"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Variance
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary.averageVariancePercent.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Average across projects
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Committed Cost
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(summary.totalCommittedCost)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Approved but unpaid
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Projects Under Budget
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {summary.projectsUnderBudget}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              On track projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Projects Over Budget
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {summary.projectsOverBudget}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Require attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Budget vs Actual Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={varianceChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Amount (Cr)", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value) => `₹${Number(value).toFixed(1)}Cr`} />
                <Legend />
                <Bar dataKey="Expected Cost" fill="#94a3b8" />
                <Bar dataKey="Actual Cost" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Variance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={varianceChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Variance (Cr)", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value) => `₹${Number(value).toFixed(1)}Cr`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Variance"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Variance Percentage by Project</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={variancePercentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Variance %", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
                <Bar dataKey="Variance %" fill="#10b981">
                  {variancePercentData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry["Variance %"] < 0 ? "#ef4444" : "#10b981"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={135}>
                <PieChart>
                  <Pie
                    data={budgetStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {budgetStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={135}>
                <PieChart>
                  <Pie
                    data={costBreakdownData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry: any) =>
                      `${entry.name}: ${(entry.percent * 100).toFixed(0)}%`
                    }
                    outerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {costBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Project-wise Budget Table */}
      <Card>
        <CardHeader>
          <CardTitle>Project-wise Budget Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead className="text-right">Expected Cost</TableHead>
                  <TableHead className="text-right">Actual Cost</TableHead>
                  <TableHead className="text-right">Committed</TableHead>
                  <TableHead className="text-right">Variance (₹)</TableHead>
                  <TableHead className="text-right">Variance (%)</TableHead>
                  <TableHead className="text-right">Revenue vs Cost</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budgetData.budgetData.map((project) => {
                  const statusInfo = getStatusInfo(project.status);
                  const StatusIcon = statusInfo.icon;
                  const projectInfo = projectsData.projects.find(
                    (p) => p.projectCode === project.projectCode
                  );

                  return (
                    <TableRow
                      key={project.projectCode}
                      className={
                        project.status === "Over Budget"
                          ? "bg-red-50 dark:bg-red-950/20"
                          : ""
                      }
                    >
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{project.projectName}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-muted-foreground">
                              {project.projectCode}
                            </p>
                            {projectInfo && (
                              <Badge variant="outline" className="text-xs">
                                {projectInfo.completionPercentage}% Complete
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(project.expectedCost)}
                      </TableCell>
                      <TableCell className="text-right text-blue-600 font-medium">
                        {formatCurrency(project.actualCostToDate)}
                      </TableCell>
                      <TableCell className="text-right text-orange-600">
                        {formatCurrency(project.committedCost)}
                      </TableCell>
                      <TableCell
                        className={`text-right font-medium ${
                          project.budgetVariance >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {formatCurrency(Math.abs(project.budgetVariance))}
                      </TableCell>
                      <TableCell
                        className={`text-right font-medium ${
                          project.budgetVariancePercent >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {project.budgetVariancePercent >= 0 ? "+" : ""}
                        {project.budgetVariancePercent.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-right">
                        {project.revenueVsCostPercent.toFixed(1)}%
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <StatusIcon className={`h-4 w-4 ${statusInfo.color}`} />
                          <Badge variant={statusInfo.variant}>
                            {project.status}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}

                {/* Total Row */}
                <TableRow className="bg-muted/50 font-semibold">
                  <TableCell>TOTAL</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(summary.totalExpectedCost)}
                  </TableCell>
                  <TableCell className="text-right text-blue-600">
                    {formatCurrency(summary.totalActualCost)}
                  </TableCell>
                  <TableCell className="text-right text-orange-600">
                    {formatCurrency(summary.totalCommittedCost)}
                  </TableCell>
                  <TableCell
                    className={`text-right ${
                      summary.totalVariance >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {formatCurrency(Math.abs(summary.totalVariance))}
                  </TableCell>
                  <TableCell
                    className={`text-right ${
                      summary.averageVariancePercent >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {summary.averageVariancePercent >= 0 ? "+" : ""}
                    {summary.averageVariancePercent.toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-right">-</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {summary.projectsUnderBudget} Under / {summary.projectsOverBudget} Over
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {summary.totalVariance >= 0 ? (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Portfolio Under Budget</p>
                  <p className="text-sm text-muted-foreground">
                    Overall portfolio is {formatCurrency(summary.totalVariance)} under
                    budget ({summary.averageVariancePercent.toFixed(1)}% variance).
                    Good cost control across projects.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Portfolio Over Budget</p>
                  <p className="text-sm text-muted-foreground">
                    Overall portfolio is {formatCurrency(Math.abs(summary.totalVariance))}{" "}
                    over budget. Immediate cost control measures needed.
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <Activity className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Cost Utilization</p>
                <p className="text-sm text-muted-foreground">
                  {((summary.totalActualCost / summary.totalExpectedCost) * 100).toFixed(1)}%
                  of budget utilized. {formatCurrency(summary.totalCommittedCost)} committed
                  for upcoming payments.
                </p>
              </div>
            </div>

            {summary.projectsOverBudget > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Action Required</p>
                  <p className="text-sm text-muted-foreground">
                    {summary.projectsOverBudget} project(s) are over budget. Review cost
                    drivers and implement corrective measures.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

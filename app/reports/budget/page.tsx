"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedMetricCard } from "@/components/ThemedMetricCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Target,
  ChevronDown,
  ChevronRight,
  Activity,
  AlertTriangle,
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Import mock data
import budgetData from "@/data/mock/budget.json";

export default function BudgetReportPage() {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    new Set()
  );

  // Format currency
  const formatCurrency = (value: number) => {
    return `₹${(value / 10000000).toFixed(1)}Cr`;
  };

  const formatCurrencyDetailed = (value: number) => {
    return `₹${(value / 10000000).toFixed(2)}Cr`;
  };

  // Get summary data
  const summary = budgetData.summary;
  const projects = budgetData.budgetData;

  // Calculate additional metrics
  const averageVariancePercent = summary.averageVariancePercent;
  const totalCommittedCost = summary.totalCommittedCost;

  // Toggle project expansion
  const toggleProject = (projectCode: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectCode)) {
      newExpanded.delete(projectCode);
    } else {
      newExpanded.add(projectCode);
    }
    setExpandedProjects(newExpanded);
  };

  // Prepare chart data
  const chartData = projects.map((project) => ({
    name: project.projectCode,
    "Expected Cost": project.expectedCost / 10000000,
    "Actual Cost": project.actualCostToDate / 10000000,
    "Committed Cost": project.committedCost / 10000000,
    "Variance": project.budgetVariance / 10000000,
  }));

  // Budget status pie chart data
  const budgetStatusData = [
    { name: "Under Budget", value: summary.projectsUnderBudget, color: "#10b981" },
    { name: "Over Budget", value: summary.projectsOverBudget, color: "#ef4444" },
  ];

  // Cost breakdown pie chart data
  const costBreakdownData = [
    { name: "Actual Cost", value: summary.totalActualCost, color: "#a855f7" },
    { name: "Committed Cost", value: summary.totalCommittedCost, color: "#e879f9" },
    { name: "Remaining Budget", value: summary.totalExpectedCost - summary.totalActualCost - summary.totalCommittedCost, color: "#d946ef" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Budget vs Actual</h1>
        <p className="text-muted-foreground">
          Budget variance analysis and cost control overview
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ThemedMetricCard
          title="Total Expected Cost"
          value={formatCurrency(summary.totalExpectedCost)}
          description="Baseline budget"
          icon={Target}
          theme="budget"
        />

        <ThemedMetricCard
          title="Actual Cost to Date"
          value={formatCurrency(summary.totalActualCost)}
          description={`${((summary.totalActualCost / summary.totalExpectedCost) * 100).toFixed(1)}% of budget`}
          icon={DollarSign}
          theme="budget"
          valueColor="text-purple-600"
        />

        <ThemedMetricCard
          title="Budget Variance"
          value={formatCurrency(Math.abs(summary.totalVariance))}
          description={summary.totalVariance >= 0 ? "Under budget" : "Over budget"}
          icon={summary.totalVariance >= 0 ? TrendingUp : TrendingDown}
          theme="budget"
          valueColor={summary.totalVariance >= 0 ? "text-green-600" : "text-red-600"}
        />

        <ThemedMetricCard
          title="Avg Variance"
          value={`${averageVariancePercent.toFixed(1)}%`}
          description="Average across projects"
          icon={Activity}
          theme="budget"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <ThemedMetricCard
          title="Committed Cost"
          value={formatCurrency(totalCommittedCost)}
          description="Outstanding commitments"
          icon={AlertTriangle}
          theme="budget"
          valueColor="text-orange-600"
        />

        <ThemedMetricCard
          title="Projects Over Budget"
          value={summary.projectsOverBudget}
          description="Requiring attention"
          icon={AlertTriangle}
          theme="budget"
          valueColor="text-red-600"
        />

        <ThemedMetricCard
          title="Projects Under Budget"
          value={summary.projectsUnderBudget}
          description="On track"
          icon={TrendingUp}
          theme="budget"
          valueColor="text-green-600"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <ThemedCard theme="budget">
          <CardHeader>
            <CardTitle>Budget vs Actual Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <defs>
                  <linearGradient id="colorExpected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#9333ea" stopOpacity={0.7}/>
                  </linearGradient>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e879f9" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#d946ef" stopOpacity={0.7}/>
                  </linearGradient>
                  <linearGradient id="colorCommitted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d946ef" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#c026d3" stopOpacity={0.7}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis label={{ value: "Amount (Cr)", angle: -90, position: "insideLeft" }} stroke="#6b7280" />
                <Tooltip 
                  formatter={(value) => `₹${Number(value).toFixed(1)}Cr`}
                  contentStyle={{ borderRadius: '8px', border: '2px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                />
                <Legend />
                <Bar dataKey="Expected Cost" fill="url(#colorExpected)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Actual Cost" fill="url(#colorActual)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Committed Cost" fill="url(#colorCommitted)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </ThemedCard>

        <div className="grid gap-4">
          <ThemedCard theme="budget">
            <CardHeader>
              <CardTitle>Budget Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={135}>
                <PieChart>
                  <defs>
                    <radialGradient id="underBudgetGradient">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#9333ea" stopOpacity={0.8}/>
                    </radialGradient>
                    <radialGradient id="overBudgetGradient">
                      <stop offset="0%" stopColor="#e879f9" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#d946ef" stopOpacity={0.8}/>
                    </radialGradient>
                    <filter id="shadow">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                    </filter>
                  </defs>
                  <Pie
                    data={budgetStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry: any) =>
                      `${entry.name}: ${entry.value}`
                    }
                    outerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={2}
                  >
                    {budgetStatusData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 0 ? "url(#underBudgetGradient)" : "url(#overBudgetGradient)"}
                        filter="url(#shadow)"
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '2px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </ThemedCard>

          <ThemedCard theme="budget">
            <CardHeader>
              <CardTitle>Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={135}>
                <PieChart>
                  <defs>
                    <radialGradient id="actualCostGradient">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#9333ea" stopOpacity={0.8}/>
                    </radialGradient>
                    <radialGradient id="committedCostGradient">
                      <stop offset="0%" stopColor="#e879f9" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#d946ef" stopOpacity={0.8}/>
                    </radialGradient>
                    <radialGradient id="remainingBudgetGradient">
                      <stop offset="0%" stopColor="#d946ef" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#c026d3" stopOpacity={0.8}/>
                    </radialGradient>
                  </defs>
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
                    stroke="#fff"
                    strokeWidth={2}
                  >
                    {costBreakdownData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 0 ? "url(#actualCostGradient)" : index === 1 ? "url(#committedCostGradient)" : "url(#remainingBudgetGradient)"}
                        filter="url(#shadow)"
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={{ borderRadius: '8px', border: '2px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </ThemedCard>
        </div>
      </div>

      {/* Project-wise Budget Table with Drill-down */}
      <ThemedCard theme="budget">
        <CardHeader>
          <CardTitle>Project-wise Budget Analysis</CardTitle>
          <p className="text-sm text-muted-foreground">
            Click on any row to view detailed breakdown
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead className="text-right">Expected Cost</TableHead>
                  <TableHead className="text-right">Actual Cost</TableHead>
                  <TableHead className="text-right">Committed Cost</TableHead>
                  <TableHead className="text-right">Variance</TableHead>
                  <TableHead className="text-right">Variance %</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => {
                  const isExpanded = expandedProjects.has(project.projectCode);

                  return (
                    <>
                      {/* Main Row */}
                      <TableRow
                        key={project.projectCode}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => toggleProject(project.projectCode)}
                      >
                        <TableCell>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">{project.projectName}</p>
                            <p className="text-xs text-muted-foreground">
                              {project.projectCode}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(project.expectedCost)}
                        </TableCell>
                        <TableCell className="text-right text-purple-600 font-medium">
                          {formatCurrency(project.actualCostToDate)}
                        </TableCell>
                        <TableCell className="text-right text-orange-600">
                          {formatCurrency(project.committedCost)}
                        </TableCell>
                        <TableCell className={`text-right font-medium ${
                          project.budgetVariance >= 0 ? "text-green-600" : "text-red-600"
                        }`}>
                          {formatCurrency(Math.abs(project.budgetVariance))}
                        </TableCell>
                        <TableCell className={`text-right font-medium ${
                          project.budgetVariancePercent >= 0 ? "text-green-600" : "text-red-600"
                        }`}>
                          {project.budgetVariancePercent.toFixed(1)}%
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant={project.status === "Under Budget" ? "default" : "destructive"}
                            className="text-xs"
                          >
                            {project.status}
                          </Badge>
                        </TableCell>
                      </TableRow>

                      {/* Expanded Details Row */}
                      {isExpanded && (
                        <TableRow>
                          <TableCell colSpan={8} className="bg-muted/30">
                            <div className="p-4 space-y-4">
                              <div className="grid gap-4 md:grid-cols-2">
                                {/* Left Column - Budget Analysis */}
                                <div className="space-y-3">
                                  <h4 className="font-semibold text-sm">
                                    Budget Analysis
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Budget Utilization:
                                      </span>
                                      <span className="font-medium">
                                        {((project.actualCostToDate / project.expectedCost) * 100).toFixed(1)}%
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Revenue vs Cost:
                                      </span>
                                      <span className="font-medium">
                                        {project.revenueVsCostPercent.toFixed(1)}%
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Remaining Budget:
                                      </span>
                                      <span className="font-medium">
                                        {formatCurrency(project.expectedCost - project.actualCostToDate - project.committedCost)}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Right Column - Cost Breakdown */}
                                <div className="space-y-3">
                                  <h4 className="font-semibold text-sm">
                                    Cost Breakdown
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Actual Spend:
                                      </span>
                                      <span className="font-medium text-purple-600">
                                        {formatCurrencyDetailed(project.actualCostToDate)}
                                      </span>
                                    </div>
                                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-purple-600 transition-all"
                                        style={{ width: `${(project.actualCostToDate / project.expectedCost) * 100}%` }}
                                      />
                                    </div>
                                    <div className="flex justify-between mt-3">
                                      <span className="text-muted-foreground">
                                        Committed:
                                      </span>
                                      <span className="font-medium text-orange-600">
                                        {formatCurrencyDetailed(project.committedCost)}
                                      </span>
                                    </div>
                                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-orange-600 transition-all"
                                        style={{
                                          width: `${(project.committedCost / project.expectedCost) * 100}%`,
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Detailed Budget Metrics */}
                              <div className="border-t pt-3">
                                <h4 className="font-semibold text-sm mb-3">
                                  Detailed Budget Metrics
                                </h4>
                                <div className="grid gap-3 md:grid-cols-4 text-sm">
                                  <div className="space-y-1">
                                    <p className="text-muted-foreground text-xs">
                                      Expected Cost
                                    </p>
                                    <p className="font-semibold">
                                      {formatCurrencyDetailed(project.expectedCost)}
                                    </p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-muted-foreground text-xs">
                                      Actual Cost
                                    </p>
                                    <p className="font-semibold text-purple-600">
                                      {formatCurrencyDetailed(project.actualCostToDate)}
                                    </p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-muted-foreground text-xs">
                                      Budget Variance
                                    </p>
                                    <p className={`font-semibold ${
                                      project.budgetVariance >= 0 ? "text-green-600" : "text-red-600"
                                    }`}>
                                      {formatCurrencyDetailed(project.budgetVariance)}
                                    </p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-muted-foreground text-xs">
                                      Variance %
                                    </p>
                                    <p className={`font-semibold ${
                                      project.budgetVariancePercent >= 0 ? "text-green-600" : "text-red-600"
                                    }`}>
                                      {project.budgetVariancePercent.toFixed(1)}%
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  );
                })}

                {/* Total Row */}
                <TableRow className="bg-muted/50 font-semibold">
                  <TableCell></TableCell>
                  <TableCell>TOTAL</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(summary.totalExpectedCost)}
                  </TableCell>
                  <TableCell className="text-right text-purple-600">
                    {formatCurrency(summary.totalActualCost)}
                  </TableCell>
                  <TableCell className="text-right text-orange-600">
                    {formatCurrency(summary.totalCommittedCost)}
                  </TableCell>
                  <TableCell className={`text-right ${
                    summary.totalVariance >= 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    {formatCurrency(Math.abs(summary.totalVariance))}
                  </TableCell>
                  <TableCell className={`text-right ${
                    summary.averageVariancePercent >= 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    {summary.averageVariancePercent.toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="text-xs">
                      {summary.projectsUnderBudget}U / {summary.projectsOverBudget}O
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </ThemedCard>
    </div>
  );
}
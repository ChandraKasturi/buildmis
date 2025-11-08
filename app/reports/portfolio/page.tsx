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
  Briefcase,
  ChevronDown,
  ChevronRight,
  Receipt,
  Wallet,
  AlertCircle,
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
import projectsData from "@/data/mock/projects.json";

export default function PortfolioReportPage() {
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

  // Calculate portfolio totals
  const totalProjectValue = projectsData.projects.reduce(
    (sum, p) => sum + p.financial.projectValue,
    0
  );
  const totalExpectedCost = projectsData.projects.reduce(
    (sum, p) => sum + p.financial.expectedCost,
    0
  );
  const totalBilled = projectsData.projects.reduce(
    (sum, p) => sum + p.financial.billedAmount,
    0
  );
  const totalReceived = projectsData.projects.reduce(
    (sum, p) => sum + p.financial.receivedAmount,
    0
  );
  const totalBalanceToBeBilled = projectsData.projects.reduce(
    (sum, p) => sum + p.financial.balanceToBeBilled,
    0
  );
  const totalBalanceToBeReceived = projectsData.projects.reduce(
    (sum, p) => sum + p.financial.balanceToBeReceived,
    0
  );

  const billingPercentage = (totalBilled / totalProjectValue) * 100;
  const collectionPercentage = (totalReceived / totalProjectValue) * 100;
  const expectedMargin = totalProjectValue - totalExpectedCost;
  const marginPercentage = (expectedMargin / totalProjectValue) * 100;

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
  const chartData = projectsData.projects.map((project) => ({
    name: project.projectCode,
    "Project Value": project.financial.projectValue / 10000000,
    "Expected Cost": project.financial.expectedCost / 10000000,
    "Billed": project.financial.billedAmount / 10000000,
    "Received": project.financial.receivedAmount / 10000000,
  }));

  // Billing status pie chart data
  const billingStatusData = [
    { name: "Billed", value: totalBilled, color: "#10b981" },
    {
      name: "To be Billed",
      value: totalBalanceToBeBilled,
      color: "#f59e0b",
    },
  ];

  // Collection status pie chart data
  const collectionStatusData = [
    { name: "Received", value: totalReceived, color: "#10b981" },
    {
      name: "To be Received",
      value: totalBalanceToBeReceived,
      color: "#f59e0b",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Portfolio Summary</h1>
        <p className="text-muted-foreground">
          Financial overview of all projects
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ThemedMetricCard
          title="Total Project Value"
          value={formatCurrency(totalProjectValue)}
          description="Expected income from all projects"
          icon={Briefcase}
          theme="portfolio"
        />

        <ThemedMetricCard
          title="Total Billed"
          value={formatCurrency(totalBilled)}
          description={`${billingPercentage.toFixed(1)}% of project value`}
          icon={Receipt}
          theme="portfolio"
          valueColor="text-green-600"
        />

        <ThemedMetricCard
          title="Total Received"
          value={formatCurrency(totalReceived)}
          description={`${collectionPercentage.toFixed(1)}% collection rate`}
          icon={Wallet}
          theme="portfolio"
          valueColor="text-green-600"
        />

        <ThemedMetricCard
          title="Expected Margin"
          value={formatCurrency(expectedMargin)}
          description={`${marginPercentage.toFixed(1)}% margin`}
          icon={TrendingUp}
          theme="portfolio"
          valueColor="text-blue-600"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <ThemedMetricCard
          title="Balance to be Billed"
          value={formatCurrency(totalBalanceToBeBilled)}
          description="Pending invoices"
          icon={AlertCircle}
          theme="portfolio"
          valueColor="text-orange-600"
        />

        <ThemedMetricCard
          title="Balance to be Received"
          value={formatCurrency(totalBalanceToBeReceived)}
          description="Outstanding receivables"
          icon={DollarSign}
          theme="portfolio"
          valueColor="text-orange-600"
        />

        <ThemedMetricCard
          title="Total Expected Cost"
          value={formatCurrency(totalExpectedCost)}
          description="Budgeted total cost"
          icon={TrendingDown}
          theme="portfolio"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <ThemedCard theme="portfolio">
          <CardHeader>
            <CardTitle>Project-wise Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.7}/>
                  </linearGradient>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#dc2626" stopOpacity={0.7}/>
                  </linearGradient>
                  <linearGradient id="colorBilled" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.7}/>
                  </linearGradient>
                  <linearGradient id="colorReceived" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#059669" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#047857" stopOpacity={0.7}/>
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
                <Bar dataKey="Project Value" fill="url(#colorValue)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Expected Cost" fill="url(#colorCost)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Billed" fill="url(#colorBilled)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Received" fill="url(#colorReceived)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </ThemedCard>

        <div className="grid gap-4">
          <ThemedCard theme="portfolio">
            <CardHeader>
              <CardTitle>Billing Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={135}>
                <PieChart>
                  <defs>
                    <radialGradient id="billedGradient">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#059669" stopOpacity={0.8}/>
                    </radialGradient>
                    <radialGradient id="toBeBilledGradient">
                      <stop offset="0%" stopColor="#f97316" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#ea580c" stopOpacity={0.8}/>
                    </radialGradient>
                    <filter id="shadow">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                    </filter>
                  </defs>
                  <Pie
                    data={billingStatusData}
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
                    {billingStatusData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 0 ? "url(#billedGradient)" : "url(#toBeBilledGradient)"}
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

          <ThemedCard theme="portfolio">
            <CardHeader>
              <CardTitle>Collection Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={135}>
                <PieChart>
                  <defs>
                    <radialGradient id="receivedGradient">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#16a34a" stopOpacity={0.8}/>
                    </radialGradient>
                    <radialGradient id="toBeReceivedGradient">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#d97706" stopOpacity={0.8}/>
                    </radialGradient>
                  </defs>
                  <Pie
                    data={collectionStatusData}
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
                    {collectionStatusData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 0 ? "url(#receivedGradient)" : "url(#toBeReceivedGradient)"}
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

      {/* Project-wise Financial Table with Drill-down */}
      <ThemedCard theme="portfolio">
        <CardHeader>
          <CardTitle>Project-wise Financial Details</CardTitle>
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
                  <TableHead className="text-right">Project Value</TableHead>
                  <TableHead className="text-right">Expected Cost</TableHead>
                  <TableHead className="text-right">Billed</TableHead>
                  <TableHead className="text-right">Received</TableHead>
                  <TableHead className="text-right">Balance (Billing)</TableHead>
                  <TableHead className="text-right">Balance (Collection)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectsData.projects.map((project) => {
                  const isExpanded = expandedProjects.has(project.projectCode);
                  const billingPercent =
                    (project.financial.billedAmount /
                      project.financial.projectValue) *
                    100;
                  const collectionPercent =
                    (project.financial.receivedAmount /
                      project.financial.projectValue) *
                    100;

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
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-muted-foreground">
                                {project.projectCode}
                              </p>
                              <Badge variant="outline" className="text-xs">
                                {project.currentStage}
                              </Badge>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(project.financial.projectValue)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(project.financial.expectedCost)}
                        </TableCell>
                        <TableCell className="text-right text-green-600 font-medium">
                          {formatCurrency(project.financial.billedAmount)}
                        </TableCell>
                        <TableCell className="text-right text-green-600 font-medium">
                          {formatCurrency(project.financial.receivedAmount)}
                        </TableCell>
                        <TableCell className="text-right text-orange-600">
                          {formatCurrency(project.financial.balanceToBeBilled)}
                        </TableCell>
                        <TableCell className="text-right text-orange-600">
                          {formatCurrency(project.financial.balanceToBeReceived)}
                        </TableCell>
                      </TableRow>

                      {/* Expanded Details Row */}
                      {isExpanded && (
                        <TableRow>
                          <TableCell colSpan={8} className="bg-muted/30">
                            <div className="p-4 space-y-4">
                              <div className="grid gap-4 md:grid-cols-2">
                                {/* Left Column - Project Details */}
                                <div className="space-y-3">
                                  <h4 className="font-semibold text-sm">
                                    Project Information
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Type:
                                      </span>
                                      <span className="font-medium">
                                        {project.projectType}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Location:
                                      </span>
                                      <span className="font-medium">
                                        {project.location.city},{" "}
                                        {project.location.state}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Project Manager:
                                      </span>
                                      <span className="font-medium">
                                        {project.projectManager}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Completion:
                                      </span>
                                      <span className="font-medium">
                                        {project.completionPercentage}%
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Right Column - Financial Breakdown */}
                                <div className="space-y-3">
                                  <h4 className="font-semibold text-sm">
                                    Financial Breakdown
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Billing Progress:
                                      </span>
                                      <span className="font-medium text-green-600">
                                        {billingPercent.toFixed(1)}%
                                      </span>
                                    </div>
                                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-green-600 transition-all"
                                        style={{ width: `${billingPercent}%` }}
                                      />
                                    </div>
                                    <div className="flex justify-between mt-3">
                                      <span className="text-muted-foreground">
                                        Collection Progress:
                                      </span>
                                      <span className="font-medium text-green-600">
                                        {collectionPercent.toFixed(1)}%
                                      </span>
                                    </div>
                                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-green-600 transition-all"
                                        style={{
                                          width: `${collectionPercent}%`,
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Detailed Financial Metrics */}
                              <div className="border-t pt-3">
                                <h4 className="font-semibold text-sm mb-3">
                                  Detailed Financial Metrics
                                </h4>
                                <div className="grid gap-3 md:grid-cols-4 text-sm">
                                  <div className="space-y-1">
                                    <p className="text-muted-foreground text-xs">
                                      Project Value
                                    </p>
                                    <p className="font-semibold">
                                      {formatCurrencyDetailed(
                                        project.financial.projectValue
                                      )}
                                    </p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-muted-foreground text-xs">
                                      Expected Cost
                                    </p>
                                    <p className="font-semibold">
                                      {formatCurrencyDetailed(
                                        project.financial.expectedCost
                                      )}
                                    </p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-muted-foreground text-xs">
                                      Expected Margin
                                    </p>
                                    <p className="font-semibold text-blue-600">
                                      {formatCurrencyDetailed(
                                        project.financial.projectValue -
                                          project.financial.expectedCost
                                      )}
                                    </p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-muted-foreground text-xs">
                                      Margin %
                                    </p>
                                    <p className="font-semibold text-blue-600">
                                      {(
                                        ((project.financial.projectValue -
                                          project.financial.expectedCost) /
                                          project.financial.projectValue) *
                                        100
                                      ).toFixed(1)}
                                      %
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
                    {formatCurrency(totalProjectValue)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(totalExpectedCost)}
                  </TableCell>
                  <TableCell className="text-right text-green-600">
                    {formatCurrency(totalBilled)}
                  </TableCell>
                  <TableCell className="text-right text-green-600">
                    {formatCurrency(totalReceived)}
                  </TableCell>
                  <TableCell className="text-right text-orange-600">
                    {formatCurrency(totalBalanceToBeBilled)}
                  </TableCell>
                  <TableCell className="text-right text-orange-600">
                    {formatCurrency(totalBalanceToBeReceived)}
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

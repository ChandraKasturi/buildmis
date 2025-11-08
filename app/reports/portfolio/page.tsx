"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Project Value
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalProjectValue)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Expected income from all projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Billed
            </CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalBilled)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {billingPercentage.toFixed(1)}% of project value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Received
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalReceived)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {collectionPercentage.toFixed(1)}% collection rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Expected Margin
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(expectedMargin)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {marginPercentage.toFixed(1)}% margin
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Balance to be Billed
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(totalBalanceToBeBilled)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Pending invoices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Balance to be Received
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(totalBalanceToBeReceived)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Outstanding receivables
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expected Cost
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalExpectedCost)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Budgeted total cost
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project-wise Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Amount (Cr)", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value) => `₹${Number(value).toFixed(1)}Cr`} />
                <Legend />
                <Bar dataKey="Project Value" fill="#3b82f6" />
                <Bar dataKey="Expected Cost" fill="#ef4444" />
                <Bar dataKey="Billed" fill="#10b981" />
                <Bar dataKey="Received" fill="#059669" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={135}>
                <PieChart>
                  <Pie
                    data={billingStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {billingStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Collection Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={135}>
                <PieChart>
                  <Pie
                    data={collectionStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {collectionStatusData.map((entry, index) => (
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

      {/* Project-wise Financial Table with Drill-down */}
      <Card>
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
      </Card>
    </div>
  );
}

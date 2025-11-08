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
  Receipt,
  Wallet,
  AlertCircle,
  Clock,
  CheckCircle2,
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
  LineChart,
  Line,
} from "recharts";

// Import mock data
import receivablesData from "@/data/mock/receivables.json";
import projectsData from "@/data/mock/projects.json";

export default function ReceivablesReportPage() {
  // Format currency
  const formatCurrency = (value: number) => {
    return `₹${(value / 10000000).toFixed(1)}Cr`;
  };

  // Get summary data
  const summary = receivablesData.summary;

  // Prepare chart data
  const collectionChartData = receivablesData.receivablesData.map((project) => ({
    name: project.projectCode,
    "Billed": project.totalBilled / 10000000,
    "Received": project.totalReceived / 10000000,
    "Balance": project.balanceReceivable / 10000000,
  }));

  // Collection stage breakdown
  const stageData = receivablesData.receivablesData.map((project) => ({
    name: project.projectCode,
    "Booking": project.collectionByStage.booking / 10000000,
    "Agreement": project.collectionByStage.agreement / 10000000,
    "Sale Deed": project.collectionByStage.saleDeed / 10000000,
  }));

  // Collection status pie
  const collectionStatusData = [
    { name: "Received", value: summary.totalReceived, color: "#10b981" },
    { name: "Balance", value: summary.totalBalanceReceivable, color: "#f59e0b" },
  ];

  // Overdue analysis
  const overdueData = receivablesData.receivablesData
    .filter((p) => p.overdueAmount > 0)
    .map((project) => ({
      name: project.projectCode,
      "Overdue": project.overdueAmount / 10000000,
      "Aging Days": project.agingDays,
    }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Receivables & Collections
        </h1>
        <p className="text-muted-foreground">
          Track billing and collection status
        </p>
      </div>

      {/* Alert for Overdue */}
      {summary.totalOverdue > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Overdue Receivables Alert</AlertTitle>
          <AlertDescription>
            {formatCurrency(summary.totalOverdue)} is overdue across projects.
            Average aging: {summary.averageAgingDays} days. Follow-up required.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Project Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(summary.totalProjectValue)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Expected total income
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Billed</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(summary.totalBilled)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {((summary.totalBilled / summary.totalProjectValue) * 100).toFixed(1)}% of
              project value
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
              {formatCurrency(summary.totalReceived)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {summary.overallCollectionPercent.toFixed(1)}% collection rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Balance Receivable
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(summary.totalBalanceReceivable)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Outstanding amount
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overdue Amount
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(summary.totalOverdue)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Requires immediate follow-up
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Aging
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary.averageAgingDays} days
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Average receivable aging
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Collection Efficiency
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {summary.overallCollectionPercent.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Overall collection rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Billing vs Collection Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={collectionChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Amount (Cr)", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value) => `₹${Number(value).toFixed(1)}Cr`} />
                <Legend />
                <Bar dataKey="Billed" fill="#3b82f6" />
                <Bar dataKey="Received" fill="#10b981" />
                <Bar dataKey="Balance" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Collection by Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Amount (Cr)", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value) => `₹${Number(value).toFixed(1)}Cr`} />
                <Legend />
                <Bar dataKey="Booking" stackId="a" fill="#8b5cf6" />
                <Bar dataKey="Agreement" stackId="a" fill="#3b82f6" />
                <Bar dataKey="Sale Deed" stackId="a" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Collection Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={collectionStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) =>
                    `${entry.name}: ${(entry.percent * 100).toFixed(1)}%`
                  }
                  outerRadius={80}
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

        {overdueData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Overdue Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={overdueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis
                    yAxisId="left"
                    label={{ value: "Amount (Cr)", angle: -90, position: "insideLeft" }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{ value: "Days", angle: 90, position: "insideRight" }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="Overdue" fill="#ef4444" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="Aging Days"
                    stroke="#f59e0b"
                    strokeWidth={2}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Project-wise Receivables Table */}
      <Card>
        <CardHeader>
          <CardTitle>Project-wise Receivables Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead className="text-right">Project Value</TableHead>
                  <TableHead className="text-right">Billed</TableHead>
                  <TableHead className="text-right">Received</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead className="text-right">Collection %</TableHead>
                  <TableHead className="text-right">Overdue</TableHead>
                  <TableHead className="text-right">Aging (Days)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {receivablesData.receivablesData.map((project) => {
                  const projectInfo = projectsData.projects.find(
                    (p) => p.projectCode === project.projectCode
                  );

                  return (
                    <TableRow
                      key={project.projectCode}
                      className={
                        project.overdueAmount > 0
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
                                {projectInfo.currentStage}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(project.projectValue)}
                      </TableCell>
                      <TableCell className="text-right text-blue-600 font-medium">
                        {formatCurrency(project.totalBilled)}
                      </TableCell>
                      <TableCell className="text-right text-green-600 font-medium">
                        {formatCurrency(project.totalReceived)}
                      </TableCell>
                      <TableCell className="text-right text-orange-600 font-medium">
                        {formatCurrency(project.balanceReceivable)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-600 transition-all"
                              style={{
                                width: `${project.collectionPercent}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-green-600">
                            {project.collectionPercent.toFixed(1)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell
                        className={`text-right font-medium ${
                          project.overdueAmount > 0
                            ? "text-red-600"
                            : "text-muted-foreground"
                        }`}
                      >
                        {project.overdueAmount > 0
                          ? formatCurrency(project.overdueAmount)
                          : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        {project.agingDays > 0 ? (
                          <Badge
                            variant={
                              project.agingDays > 45
                                ? "destructive"
                                : project.agingDays > 30
                                ? "default"
                                : "outline"
                            }
                          >
                            {project.agingDays} days
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}

                {/* Total Row */}
                <TableRow className="bg-muted/50 font-semibold">
                  <TableCell>TOTAL</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(summary.totalProjectValue)}
                  </TableCell>
                  <TableCell className="text-right text-blue-600">
                    {formatCurrency(summary.totalBilled)}
                  </TableCell>
                  <TableCell className="text-right text-green-600">
                    {formatCurrency(summary.totalReceived)}
                  </TableCell>
                  <TableCell className="text-right text-orange-600">
                    {formatCurrency(summary.totalBalanceReceivable)}
                  </TableCell>
                  <TableCell className="text-right text-green-600">
                    {summary.overallCollectionPercent.toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-right text-red-600">
                    {formatCurrency(summary.totalOverdue)}
                  </TableCell>
                  <TableCell className="text-right">
                    Avg: {summary.averageAgingDays} days
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Collection Stage Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Collection by Stage Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead className="text-right">Booking Stage</TableHead>
                  <TableHead className="text-right">Agreement Stage</TableHead>
                  <TableHead className="text-right">Sale Deed Stage</TableHead>
                  <TableHead className="text-right">Total Received</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {receivablesData.receivablesData.map((project) => (
                  <TableRow key={project.projectCode}>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{project.projectName}</p>
                        <p className="text-xs text-muted-foreground">
                          {project.projectCode}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-purple-600 font-medium">
                      {formatCurrency(project.collectionByStage.booking)}
                    </TableCell>
                    <TableCell className="text-right text-blue-600 font-medium">
                      {formatCurrency(project.collectionByStage.agreement)}
                    </TableCell>
                    <TableCell className="text-right text-green-600 font-medium">
                      {formatCurrency(project.collectionByStage.saleDeed)}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(project.totalReceived)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Strong Collection Rate</p>
                <p className="text-sm text-muted-foreground">
                  Overall collection rate of {summary.overallCollectionPercent.toFixed(1)}%
                  with {formatCurrency(summary.totalReceived)} collected from{" "}
                  {formatCurrency(summary.totalBilled)} billed.
                </p>
              </div>
            </div>

            {summary.totalOverdue > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Overdue Receivables</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(summary.totalOverdue)} is overdue with average aging
                    of {summary.averageAgingDays} days. Immediate follow-up recommended.
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Billing Progress</p>
                <p className="text-sm text-muted-foreground">
                  {((summary.totalBilled / summary.totalProjectValue) * 100).toFixed(1)}%
                  of project value has been billed. {formatCurrency(summary.totalProjectValue - summary.totalBilled)} remaining to bill.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

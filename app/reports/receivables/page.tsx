"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedMetricCard } from "@/components/ThemedMetricCard";
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
        <ThemedMetricCard
          title="Total Project Value"
          value={formatCurrency(summary.totalProjectValue)}
          description="Expected total income"
          icon={DollarSign}
          theme="receivables"
        />

        <ThemedMetricCard
          title="Total Billed"
          value={formatCurrency(summary.totalBilled)}
          description={`${((summary.totalBilled / summary.totalProjectValue) * 100).toFixed(1)}% of project value`}
          icon={Receipt}
          theme="receivables"
          valueColor="text-blue-600"
        />

        <ThemedMetricCard
          title="Total Received"
          value={formatCurrency(summary.totalReceived)}
          description={`${summary.overallCollectionPercent.toFixed(1)}% collection rate`}
          icon={Wallet}
          theme="receivables"
          valueColor="text-green-600"
        />

        <ThemedMetricCard
          title="Balance Receivable"
          value={formatCurrency(summary.totalBalanceReceivable)}
          description="Outstanding amount"
          icon={TrendingUp}
          theme="receivables"
          valueColor="text-orange-600"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <ThemedMetricCard
          title="Overdue Amount"
          value={formatCurrency(summary.totalOverdue)}
          description="Requires immediate follow-up"
          icon={AlertCircle}
          theme="receivables"
          valueColor="text-red-600"
        />

        <ThemedMetricCard
          title="Average Aging"
          value={`${summary.averageAgingDays} days`}
          description="Average receivable aging"
          icon={Clock}
          theme="receivables"
        />

        <ThemedMetricCard
          title="Collection Efficiency"
          value={`${summary.overallCollectionPercent.toFixed(1)}%`}
          description="Overall collection rate"
          icon={CheckCircle2}
          theme="receivables"
          valueColor="text-green-600"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <ThemedCard theme="receivables">
          <CardHeader>
            <CardTitle>Billing vs Collection Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={collectionChartData}>
                <defs>
                  <linearGradient id="billedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="receivedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#d97706" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Amount (Cr)", angle: -90, position: "insideLeft" }} />
                <Tooltip 
                  formatter={(value) => `₹${Number(value).toFixed(1)}Cr`}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="Billed" fill="url(#billedGradient)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Received" fill="url(#receivedGradient)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Balance" fill="url(#balanceGradient)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </ThemedCard>

        <ThemedCard theme="receivables">
          <CardHeader>
            <CardTitle>Collection by Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stageData}>
                <defs>
                  <linearGradient id="bookingGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="agreementGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="saleDeedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Amount (Cr)", angle: -90, position: "insideLeft" }} />
                <Tooltip 
                  formatter={(value) => `₹${Number(value).toFixed(1)}Cr`}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="Booking" stackId="a" fill="url(#bookingGradient)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Agreement" stackId="a" fill="url(#agreementGradient)" />
                <Bar dataKey="Sale Deed" stackId="a" fill="url(#saleDeedGradient)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </ThemedCard>
      </div>

      {/* Additional Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <ThemedCard theme="receivables">
          <CardHeader>
            <CardTitle>Collection Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <defs>
                  <radialGradient id="receivedPieGradient" cx="30%" cy="30%">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={1} />
                  </radialGradient>
                  <radialGradient id="balancePieGradient" cx="30%" cy="30%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={1} />
                  </radialGradient>
                  <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3"/>
                  </filter>
                </defs>
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
                  stroke="#fff"
                  strokeWidth={2}
                >
                  {collectionStatusData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === 0 ? "url(#receivedPieGradient)" : "url(#balancePieGradient)"}
                      filter="url(#shadow)"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </ThemedCard>

        {overdueData.length > 0 && (
          <ThemedCard theme="receivables">
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
          </ThemedCard>
        )}
      </div>

      {/* Project-wise Receivables Table */}
      <ThemedCard theme="receivables">
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
      </ThemedCard>

      {/* Collection Stage Breakdown */}
      <ThemedCard theme="receivables">
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
      </ThemedCard>

      {/* Key Insights */}
      <ThemedCard theme="receivables">
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
      </ThemedCard>
    </div>
  );
}

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
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Activity,
  TrendingUp,
  FileCheck,
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

// Import mock data
import safetyData from "@/data/mock/safety.json";

export default function SafetyReportPage() {
  // Get summary data
  const summary = safetyData.summary;

  // Prepare chart data
  const incidentChartData = safetyData.safetyData.map((project) => ({
    name: project.projectCode,
    "Minor": project.incidents.minor,
    "Major": project.incidents.major,
    "Fatal": project.incidents.fatal,
    "Near Miss": project.incidents.nearMiss,
  }));

  // Compliance chart data
  const complianceChartData = safetyData.safetyData.map((project) => ({
    name: project.projectCode,
    "Compliance %": project.compliance.compliancePercent,
    "Safety Score": project.safetyScore,
  }));

  // Incident status pie
  const incidentStatusData = [
    { name: "Closed", value: summary.totalClosed, color: "#10b981" },
    { name: "Open", value: summary.totalOpen, color: "#ef4444" },
  ];

  // Incident severity pie
  const severityData = [
    { name: "Minor", value: summary.totalMinor, color: "#fbbf24" },
    { name: "Major", value: summary.totalMajor, color: "#f97316" },
    { name: "Fatal", value: summary.totalFatal, color: "#dc2626" },
    { name: "Near Miss", value: summary.totalNearMiss, color: "#3b82f6" },
  ];

  // Get safety score color
  const getSafetyScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  // Get compliance color
  const getComplianceColor = (percent: number) => {
    if (percent >= 90) return "text-green-600";
    if (percent >= 75) return "text-blue-600";
    if (percent >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Safety & Compliance
        </h1>
        <p className="text-muted-foreground">
          Monitor safety incidents and compliance status
        </p>
      </div>

      {/* Alert for Open Incidents */}
      {summary.totalOpen > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Open Safety Incidents</AlertTitle>
          <AlertDescription>
            {summary.totalOpen} safety incident(s) are currently open and require
            closure. Immediate attention needed.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Incidents
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalIncidents}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Incidents</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {summary.totalOpen}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Require closure
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Safety Score
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {summary.averageSafetyScore.toFixed(1)}/100
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Overall safety rating
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Compliance
            </CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {summary.averageCompliancePercent.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Compliance rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Minor</CardTitle>
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {summary.totalMinor}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Minor incidents
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Major</CardTitle>
            <div className="h-3 w-3 rounded-full bg-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {summary.totalMajor}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Major incidents
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fatal</CardTitle>
            <div className="h-3 w-3 rounded-full bg-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {summary.totalFatal}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Fatal incidents
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Near Miss</CardTitle>
            <div className="h-3 w-3 rounded-full bg-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {summary.totalNearMiss}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Near miss events
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Incidents by Severity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={incidentChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Count", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Minor" stackId="a" fill="#fbbf24" />
                <Bar dataKey="Major" stackId="a" fill="#f97316" />
                <Bar dataKey="Fatal" stackId="a" fill="#dc2626" />
                <Bar dataKey="Near Miss" stackId="a" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Safety Score & Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={complianceChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Score / %", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Safety Score" fill="#3b82f6" />
                <Bar dataKey="Compliance %" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Incident Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={incidentStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) =>
                    `${entry.name}: ${(entry.percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {incidentStatusData.map((entry, index) => (
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
            <CardTitle>Severity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.name}: ${entry.value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Project-wise Safety Table */}
      <Card>
        <CardHeader>
          <CardTitle>Project-wise Safety Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead className="text-right">Total Incidents</TableHead>
                  <TableHead className="text-right">Open</TableHead>
                  <TableHead className="text-right">Closed</TableHead>
                  <TableHead className="text-right">Compliance %</TableHead>
                  <TableHead className="text-right">Safety Score</TableHead>
                  <TableHead>Last Incident</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {safetyData.safetyData.map((project) => (
                  <TableRow
                    key={project.projectCode}
                    className={
                      project.incidents.open > 0
                        ? "bg-red-50 dark:bg-red-950/20"
                        : ""
                    }
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{project.projectName}</p>
                        <p className="text-xs text-muted-foreground">
                          {project.projectCode}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {project.incidents.total}
                    </TableCell>
                    <TableCell className="text-right">
                      {project.incidents.open > 0 ? (
                        <Badge variant="destructive">
                          {project.incidents.open}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right text-green-600 font-medium">
                      {project.incidents.closed}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-600 transition-all"
                            style={{
                              width: `${project.compliance.compliancePercent}%`,
                            }}
                          />
                        </div>
                        <span
                          className={`text-sm font-medium ${getComplianceColor(
                            project.compliance.compliancePercent
                          )}`}
                        >
                          {project.compliance.compliancePercent.toFixed(1)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`text-sm font-medium ${getSafetyScoreColor(
                          project.safetyScore
                        )}`}
                      >
                        {project.safetyScore}/100
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {project.lastIncidentDate}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Categories */}
      {safetyData.safetyData.map((project) => (
        <Card key={project.projectCode}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{project.projectName}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {project.projectCode} - Compliance Status
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Safety Score</p>
                  <p
                    className={`text-lg font-bold ${getSafetyScoreColor(
                      project.safetyScore
                    )}`}
                  >
                    {project.safetyScore}/100
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Compliance</p>
                  <p
                    className={`text-lg font-bold ${getComplianceColor(
                      project.compliance.compliancePercent
                    )}`}
                  >
                    {project.compliance.compliancePercent.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {project.categories.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{category.category}</p>
                    <p className="text-xs text-muted-foreground">
                      Last: {category.lastInspection}
                    </p>
                  </div>
                  <Badge
                    variant={
                      category.status === "Complied"
                        ? "default"
                        : category.status === "Partial"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {category.status}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Incident Breakdown */}
            <div className="mt-6 pt-6 border-t">
              <h4 className="text-sm font-semibold mb-3">Incident Breakdown</h4>
              <div className="grid gap-3 md:grid-cols-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                  <span className="text-sm font-medium">Minor</span>
                  <span className="text-lg font-bold text-yellow-600">
                    {project.incidents.minor}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                  <span className="text-sm font-medium">Major</span>
                  <span className="text-lg font-bold text-orange-600">
                    {project.incidents.major}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-950/20">
                  <span className="text-sm font-medium">Fatal</span>
                  <span className="text-lg font-bold text-red-600">
                    {project.incidents.fatal}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <span className="text-sm font-medium">Near Miss</span>
                  <span className="text-lg font-bold text-blue-600">
                    {project.incidents.nearMiss}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Overall Safety Performance</p>
                <p className="text-sm text-muted-foreground">
                  Average safety score of {summary.averageSafetyScore.toFixed(1)}/100
                  with {summary.averageCompliancePercent.toFixed(1)}% compliance rate
                  across all projects.
                </p>
              </div>
            </div>

            {summary.totalOpen > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Open Incidents</p>
                  <p className="text-sm text-muted-foreground">
                    {summary.totalOpen} incident(s) are currently open. Ensure proper
                    investigation, corrective actions, and timely closure.
                  </p>
                </div>
              </div>
            )}

            {summary.projectsFullCompliance > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Full Compliance</p>
                  <p className="text-sm text-muted-foreground">
                    {summary.projectsFullCompliance} project(s) have achieved 100%
                    compliance. Excellent safety management.
                  </p>
                </div>
              </div>
            )}

            {summary.totalFatal === 0 && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Zero Fatalities</p>
                  <p className="text-sm text-muted-foreground">
                    No fatal incidents reported. Continue maintaining high safety
                    standards and preventive measures.
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

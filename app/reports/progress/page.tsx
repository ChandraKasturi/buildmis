"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemedCard } from "@/components/ThemedCard";
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
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Target,
  Calendar,
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from "recharts";
import { format } from "date-fns";

// Import mock data
import progressData from "@/data/mock/progress.json";

export default function ProgressReportPage() {
  // Get summary data
  const summary = progressData.summary;

  // Prepare chart data
  const progressChartData = progressData.progressData.map((project) => ({
    name: project.projectCode,
    "Planned": project.plannedCompletion,
    "Actual": project.overallCompletion,
    "Variance": project.variance,
  }));

  // Stage completion data
  const stageData = progressData.progressData.map((project) => {
    const avgStageCompletion =
      project.stages.reduce((sum, stage) => sum + stage.actualProgress, 0) /
      project.stages.length;
    return {
      name: project.projectCode,
      "Average Stage Completion": avgStageCompletion,
    };
  });

  // Status distribution
  const statusCounts = {
    onSchedule: summary.projectsOnSchedule,
    behindSchedule: summary.projectsBehindSchedule,
    aheadOfSchedule: summary.projectsAheadOfSchedule,
    completed: summary.projectsCompleted,
  };

  // Get status info
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "Behind Schedule":
        return {
          variant: "destructive" as const,
          color: "text-red-600",
          icon: AlertTriangle,
        };
      case "Ahead of Schedule":
        return {
          variant: "default" as const,
          color: "text-green-600",
          icon: TrendingUp,
        };
      case "On Schedule":
        return {
          variant: "secondary" as const,
          color: "text-blue-600",
          icon: CheckCircle2,
        };
      case "Completed":
        return {
          variant: "default" as const,
          color: "text-green-600",
          icon: CheckCircle2,
        };
      default:
        return {
          variant: "outline" as const,
          color: "text-muted-foreground",
          icon: Activity,
        };
    }
  };

  // Get completion color
  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 50) return "text-blue-600";
    if (percentage >= 30) return "text-yellow-600";
    return "text-orange-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Project Progress</h1>
        <p className="text-muted-foreground">
          Track execution status and milestones
        </p>
      </div>

      {/* Alert for Behind Schedule */}
      {summary.projectsBehindSchedule > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Schedule Delay Alert</AlertTitle>
          <AlertDescription>
            {summary.projectsBehindSchedule} project(s) are behind schedule.
            Review and corrective action required.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ThemedCard theme="progress">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Completion
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.averageCompletion}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all projects
            </p>
          </CardContent>
        </ThemedCard>

        <ThemedCard theme="progress">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Schedule</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {summary.projectsOnSchedule}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Projects on track
            </p>
          </CardContent>
        </ThemedCard>

        <ThemedCard theme="progress">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Behind Schedule
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {summary.projectsBehindSchedule}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Require attention
            </p>
          </CardContent>
        </ThemedCard>

        <ThemedCard theme="progress">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {summary.projectsCompleted}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Successfully done
            </p>
          </CardContent>
        </ThemedCard>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <ThemedCard theme="progress">
          <CardHeader>
            <CardTitle>Planned vs Actual Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={progressChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Completion %", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Bar dataKey="Planned" fill="#94a3b8" />
                <Bar dataKey="Actual" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </ThemedCard>

        <ThemedCard theme="progress">
          <CardHeader>
            <CardTitle>Variance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={progressChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Variance %", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar dataKey="Variance" fill="#10b981">
                  {progressChartData.map((entry, index) => (
                    <Bar
                      key={`cell-${index}`}
                      fill={entry.Variance < 0 ? "#ef4444" : "#10b981"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </ThemedCard>
      </div>

      {/* Project-wise Progress Table */}
      <ThemedCard theme="progress">
        <CardHeader>
          <CardTitle>Project-wise Progress Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead className="text-right">Planned %</TableHead>
                  <TableHead className="text-right">Actual %</TableHead>
                  <TableHead className="text-right">Variance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {progressData.progressData.map((project) => {
                  const statusInfo = getStatusInfo(project.status);
                  const StatusIcon = statusInfo.icon;

                  return (
                    <TableRow
                      key={project.projectCode}
                      className={
                        project.status === "Behind Schedule"
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
                        {project.plannedCompletion}%
                      </TableCell>
                      <TableCell className="text-right font-medium text-blue-600">
                        {project.overallCompletion}%
                      </TableCell>
                      <TableCell
                        className={`text-right font-medium ${
                          project.variance >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {project.variance >= 0 ? "+" : ""}
                        {project.variance}%
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <StatusIcon className={`h-4 w-4 ${statusInfo.color}`} />
                          <Badge variant={statusInfo.variant}>{project.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{
                                width: `${project.overallCompletion}%`,
                              }}
                            />
                          </div>
                          <span
                            className={`text-sm font-medium ${getCompletionColor(
                              project.overallCompletion
                            )}`}
                          >
                            {project.overallCompletion}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </ThemedCard>

      {/* Stage-wise Progress */}
      {progressData.progressData.map((project) => (
        <ThemedCard key={project.projectCode} theme="progress">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{project.projectName}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {project.projectCode} - Stage-wise Progress
                </p>
              </div>
              <Badge variant={getStatusInfo(project.status).variant}>
                {project.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.stages.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{stage.stageName}</span>
                      <Badge variant="outline" className="text-xs">
                        {stage.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        Planned: {stage.plannedProgress}%
                      </span>
                      <span
                        className={`font-medium ${
                          stage.actualProgress >= stage.plannedProgress
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        Actual: {stage.actualProgress}%
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all"
                        style={{ width: `${stage.actualProgress}%` }}
                      />
                    </div>
                    <div
                      className="absolute top-0 h-3 w-0.5 bg-orange-500"
                      style={{ left: `${stage.plannedProgress}%` }}
                      title={`Planned: ${stage.plannedProgress}%`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Milestones */}
            {project.milestones && project.milestones.length > 0 && (
              <div className="mt-6 pt-6 border-t">
                <h4 className="text-sm font-semibold mb-3">Milestones</h4>
                <div className="space-y-3">
                  {project.milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        {milestone.actualDate ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        ) : (
                          <Clock className="h-5 w-5 text-orange-600" />
                        )}
                        <div>
                          <p className="text-sm font-medium">
                            {milestone.milestoneName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Planned: {milestone.plannedDate}
                            {milestone.actualDate &&
                              ` | Actual: ${milestone.actualDate}`}
                          </p>
                        </div>
                      </div>
                      {milestone.delayDays !== 0 && (
                        <Badge
                          variant={
                            milestone.delayDays > 0 ? "destructive" : "default"
                          }
                        >
                          {milestone.delayDays > 0 ? "+" : ""}
                          {milestone.delayDays} days
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </ThemedCard>
      ))}

      {/* Key Insights */}
      <ThemedCard theme="progress">
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <Activity className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Overall Progress</p>
                <p className="text-sm text-muted-foreground">
                  Average completion across all projects is {summary.averageCompletion}
                  %. {summary.projectsCompleted} project(s) completed successfully.
                </p>
              </div>
            </div>

            {summary.projectsBehindSchedule > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Schedule Delays</p>
                  <p className="text-sm text-muted-foreground">
                    {summary.projectsBehindSchedule} project(s) are behind schedule.
                    Review resource allocation and identify blockers.
                  </p>
                </div>
              </div>
            )}

            {summary.projectsAheadOfSchedule > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Ahead of Schedule</p>
                  <p className="text-sm text-muted-foreground">
                    {summary.projectsAheadOfSchedule} project(s) are ahead of schedule.
                    Excellent execution and resource management.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </ThemedCard>
    </div>
  );
}

import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  TrendingUp,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Briefcase,
  Building2,
  Shield,
} from "lucide-react";

// Import mock data
import projectsData from "@/data/mock/projects.json";
import budgetData from "@/data/mock/budget.json";
import receivablesData from "@/data/mock/receivables.json";
import progressData from "@/data/mock/progress.json";
import safetyData from "@/data/mock/safety.json";

export default function DashboardPage() {
  // Calculate aggregate KPIs
  const totalProjects = projectsData.projects.length;
  const activeProjects = projectsData.projects.filter(
    (p) => p.currentStage === "Execution"
  ).length;
  const completedProjects = projectsData.projects.filter(
    (p) => p.currentStage === "Completed"
  ).length;

  // Financial metrics
  const totalProjectValue = projectsData.projects.reduce(
    (sum, p) => sum + p.financial.projectValue,
    0
  );
  const totalBilled = receivablesData.summary.totalBilled;
  const totalReceived = receivablesData.summary.totalReceived;
  const collectionPercent = receivablesData.summary.overallCollectionPercent;

  // Budget metrics
  const totalBudgetVariance = budgetData.summary.totalVariance;
  const projectsOverBudget = budgetData.summary.projectsOverBudget;

  // Progress metrics
  const avgCompletion = progressData.summary.averageCompletion;
  const projectsBehindSchedule = progressData.summary.projectsBehindSchedule;

  // Safety metrics
  const totalIncidents = safetyData.summary.totalIncidents;
  const openIncidents = safetyData.summary.totalOpen;
  const avgSafetyScore = safetyData.summary.averageSafetyScore;
  const avgCompliance = safetyData.summary.averageCompliancePercent;

  // Format currency
  const formatCurrency = (value: number) => {
    return `₹${(value / 10000000).toFixed(1)}Cr`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of all projects and key metrics
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Projects"
          value={totalProjects}
          description={`${activeProjects} active, ${completedProjects} completed`}
          icon={Briefcase}
        />
        <MetricCard
          title="Project Value"
          value={formatCurrency(totalProjectValue)}
          description="Total portfolio value"
          icon={DollarSign}
        />
        <MetricCard
          title="Collection Rate"
          value={`${collectionPercent.toFixed(1)}%`}
          description={`${formatCurrency(totalReceived)} received`}
          icon={TrendingUp}
          trend={{ value: 5.2, isPositive: true }}
        />
        <MetricCard
          title="Avg Completion"
          value={`${avgCompletion}%`}
          description={`${projectsBehindSchedule} projects behind schedule`}
          icon={Activity}
          trend={{ value: 2.1, isPositive: false }}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Budget Variance"
          value={formatCurrency(totalBudgetVariance)}
          description={`${projectsOverBudget} project(s) over budget`}
          icon={AlertTriangle}
        />
        <MetricCard
          title="Safety Score"
          value={`${avgSafetyScore.toFixed(1)}/100`}
          description={`${openIncidents} open incidents`}
          icon={Shield}
          trend={{ value: 3.5, isPositive: true }}
        />
        <MetricCard
          title="Compliance"
          value={`${avgCompliance.toFixed(1)}%`}
          description="Average compliance rate"
          icon={CheckCircle2}
        />
        <MetricCard
          title="Total Incidents"
          value={totalIncidents}
          description={`${openIncidents} open, ${
            totalIncidents - openIncidents
          } closed`}
          icon={AlertTriangle}
        />
      </div>

      {/* Project Status Overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 bg-gradient-to-br from-white to-gray-50/50 before:absolute before:inset-0 before:rounded-lg before:p-[2px] before:-z-10 before:bg-gradient-to-br before:from-blue-200 before:via-purple-200 before:to-pink-200 before:opacity-50 hover:before:opacity-100 before:transition-opacity">
          <CardHeader>
            <CardTitle>Project Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectsData.projects.map((project) => (
                <div
                  key={project.projectCode}
                  className="flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {project.projectName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {project.projectCode} • {project.location.city}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        project.currentStage === "Completed"
                          ? "default"
                          : project.currentStage === "Execution"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {project.currentStage}
                    </Badge>
                    <span className="text-sm font-medium">
                      {project.completionPercentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 bg-gradient-to-br from-white to-gray-50/50 before:absolute before:inset-0 before:rounded-lg before:p-[2px] before:-z-10 before:bg-gradient-to-br before:from-blue-200 before:via-purple-200 before:to-pink-200 before:opacity-50 hover:before:opacity-100 before:transition-opacity">
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Total Project Value
                </span>
                <span className="text-sm font-medium">
                  {formatCurrency(totalProjectValue)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Total Billed
                </span>
                <span className="text-sm font-medium">
                  {formatCurrency(totalBilled)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Total Received
                </span>
                <span className="text-sm font-medium text-green-600">
                  {formatCurrency(totalReceived)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Balance Receivable
                </span>
                <span className="text-sm font-medium text-orange-600">
                  {formatCurrency(
                    receivablesData.summary.totalBalanceReceivable
                  )}
                </span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Budget Variance
                </span>
                <span
                  className={`text-sm font-medium ${
                    totalBudgetVariance >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {formatCurrency(totalBudgetVariance)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Expected Cost
                </span>
                <span className="text-sm font-medium">
                  {formatCurrency(budgetData.summary.totalExpectedCost)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 bg-gradient-to-br from-white to-gray-50/50 before:absolute before:inset-0 before:rounded-lg before:p-[2px] before:-z-10 before:bg-gradient-to-br before:from-blue-200 before:via-purple-200 before:to-pink-200 before:opacity-50 hover:before:opacity-100 before:transition-opacity">
        <CardHeader>
          <CardTitle>Key Alerts & Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {projectsOverBudget > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Budget Overrun Alert</p>
                  <p className="text-sm text-muted-foreground">
                    {projectsOverBudget} project(s) are over budget. Review
                    required.
                  </p>
                </div>
              </div>
            )}
            {projectsBehindSchedule > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                <Activity className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Schedule Delay</p>
                  <p className="text-sm text-muted-foreground">
                    {projectsBehindSchedule} project(s) are behind schedule.
                    Action needed.
                  </p>
                </div>
              </div>
            )}
            {openIncidents > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20">
                <Shield className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Open Safety Incidents</p>
                  <p className="text-sm text-muted-foreground">
                    {openIncidents} safety incident(s) require closure.
                  </p>
                </div>
              </div>
            )}
            {receivablesData.summary.totalOverdue > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <DollarSign className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Overdue Receivables</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(receivablesData.summary.totalOverdue)}{" "}
                    overdue. Follow-up required.
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


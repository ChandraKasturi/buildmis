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
  Building2,
  MapPin,
  User,
  DollarSign,
  TrendingUp,
  Calendar,
  Search,
  Filter,
} from "lucide-react";

// Import mock data
import projectsData from "@/data/mock/projects.json";

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  // Format currency
  const formatCurrency = (value: number) => {
    return `₹${(value / 10000000).toFixed(1)}Cr`;
  };

  // Filter projects
  const filteredProjects = projectsData.projects.filter((project) => {
    const matchesSearch =
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.projectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || project.currentStage === filterStatus;

    const matchesType =
      filterType === "all" || project.projectType === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Get unique statuses and types
  const statuses = Array.from(
    new Set(projectsData.projects.map((p) => p.currentStage))
  );
  const types = Array.from(
    new Set(projectsData.projects.map((p) => p.projectType))
  );

  // Calculate summary stats
  const totalProjects = projectsData.projects.length;
  const activeProjects = projectsData.projects.filter(
    (p) => p.currentStage === "Execution"
  ).length;
  const completedProjects = projectsData.projects.filter(
    (p) => p.currentStage === "Completed"
  ).length;
  const totalValue = projectsData.projects.reduce(
    (sum, p) => sum + p.financial.projectValue,
    0
  );

  // Get status badge variant
  const getStatusVariant = (
    status: string
  ): "default" | "secondary" | "outline" | "destructive" => {
    switch (status) {
      case "Completed":
        return "default";
      case "Execution":
        return "secondary";
      case "Planning":
        return "outline";
      default:
        return "outline";
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
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">
          Manage and view all construction projects
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              Across all locations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects}</div>
            <p className="text-xs text-muted-foreground">In execution phase</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedProjects}</div>
            <p className="text-xs text-muted-foreground">Successfully done</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
            <p className="text-xs text-muted-foreground">Portfolio value</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <select
                className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {(searchTerm || filterStatus !== "all" || filterType !== "all") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                  setFilterType("all");
                }}
              >
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            All Projects ({filteredProjects.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Completion</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <p className="text-muted-foreground">
                        No projects found matching your filters
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProjects.map((project) => (
                    <TableRow key={project.projectCode}>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{project.projectName}</p>
                          <p className="text-xs text-muted-foreground">
                            {project.projectCode}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{project.projectType}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">
                            {project.location.city}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {project.location.state}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">
                            {project.projectManager}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(project.currentStage)}>
                          {project.currentStage}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{
                                width: `${project.completionPercentage}%`,
                              }}
                            />
                          </div>
                          <span
                            className={`text-sm font-medium ${getCompletionColor(
                              project.completionPercentage
                            )}`}
                          >
                            {project.completionPercentage}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(project.financial.projectValue)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(project.financial.expectedCost)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Project Details Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.projectCode}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-base">
                    {project.projectName}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {project.projectCode}
                  </p>
                </div>
                <Badge variant={getStatusVariant(project.currentStage)}>
                  {project.currentStage}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Type and Location */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>{project.projectType}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {project.location.city}, {project.location.state}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{project.projectManager}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span
                    className={`font-medium ${getCompletionColor(
                      project.completionPercentage
                    )}`}
                  >
                    {project.completionPercentage}%
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${project.completionPercentage}%` }}
                  />
                </div>
              </div>

              {/* Financial */}
              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Project Value</span>
                  <span className="font-medium">
                    {formatCurrency(project.financial.projectValue)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Expected Cost</span>
                  <span className="font-medium">
                    {formatCurrency(project.financial.expectedCost)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Billed</span>
                  <span className="font-medium text-green-600">
                    {formatCurrency(project.financial.billedAmount)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

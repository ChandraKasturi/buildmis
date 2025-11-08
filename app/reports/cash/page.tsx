"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ThemedCard } from "@/components/ThemedCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "@/components/MetricCard";
import {
  Wallet,
  Building2,
  TrendingUp,
  IndianRupee,
  ChevronDown,
  ChevronRight,
  Banknote,
} from "lucide-react";
import cashData from "@/data/mock/cash.json";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from "@/lib/utils";
import { format } from 'date-fns';

export default function CashReportPage() {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

  // Indian number format function
  const formatIndianCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const toggleProjectExpansion = (projectCode: string) => {
    setExpandedProjects((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(projectCode)) {
        newSet.delete(projectCode);
      } else {
        newSet.add(projectCode);
      }
      return newSet;
    });
  };

  // Aggregate data for summary cards
  const totalCashInHand = cashData.summary.totalCashInHand;
  const totalBankBalance = cashData.summary.totalBankBalance;
  const totalLiquidFunds = cashData.summary.totalLiquidFunds;

  // Prepare chart data - aggregate closing balances by date across all accounts
  const getChartData = () => {
    const dateMap = new Map<string, any>();
    
    cashData.projects.forEach(project => {
      project.accounts.forEach(account => {
        account.transactions.forEach(txn => {
          if (!dateMap.has(txn.date)) {
            dateMap.set(txn.date, {
              date: txn.date,
              cashInHand: 0,
              hdfc: 0,
              icici: 0,
              sbi: 0,
            });
          }
          const entry = dateMap.get(txn.date);
          if (account.accountName === "Cash in Hand") {
            entry.cashInHand += txn.closingBalance;
          } else if (account.accountName.includes("HDFC")) {
            entry.hdfc += txn.closingBalance;
          } else if (account.accountName.includes("ICICI")) {
            entry.icici += txn.closingBalance;
          } else if (account.accountName.includes("State Bank")) {
            entry.sbi += txn.closingBalance;
          }
        });
      });
    });

    return Array.from(dateMap.values()).sort((a, b) => a.date.localeCompare(b.date));
  };

  const chartData = getChartData();

  // Get account icon
  const getAccountIcon = (accountName: string) => {
    if (accountName === "Cash in Hand") {
      return <Wallet className="h-4 w-4 text-green-600" />;
    }
    return <Building2 className="h-4 w-4 text-blue-600" />;
  };

  // Get account badge color
  const getAccountBadgeVariant = (accountType: string) => {
    return accountType === "Cash" ? "default" : "secondary";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cash & Bank Position</h1>
        <p className="text-muted-foreground">
          Daily cash flow and bank balances across all projects and accounts
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Total Cash in Hand"
          value={formatIndianCurrency(totalCashInHand)}
          description="Across all projects"
          icon={Wallet}
          valueColor="text-green-600"
        />
        <MetricCard
          title="Total Bank Balance"
          value={formatIndianCurrency(totalBankBalance)}
          description="All bank accounts combined"
          icon={Building2}
          valueColor="text-blue-600"
        />
        <MetricCard
          title="Total Liquid Funds"
          value={formatIndianCurrency(totalLiquidFunds)}
          description="Cash + Bank balances"
          icon={TrendingUp}
          valueColor="text-purple-600"
        />
      </div>

      {/* Account-wise Summary */}
      <ThemedCard theme="cash">
        <CardHeader>
          <CardTitle>Account-wise Current Balances</CardTitle>
          <CardDescription>Latest balance across all accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cashData.summary.accountsSummary.map((account, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getAccountIcon(account.accountName)}
                  <div>
                    <p className="text-sm font-medium">{account.accountName}</p>
                    {account.accountNumber && (
                      <p className="text-xs text-muted-foreground">A/C: {account.accountNumber}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{formatIndianCurrency(account.currentBalance)}</p>
                  <Badge variant={getAccountBadgeVariant(account.accountType)} className="mt-1">
                    {account.accountType}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </ThemedCard>

      {/* Trend Chart */}
      <ThemedCard theme="cash">
        <CardHeader>
          <CardTitle>7-Day Balance Trend</CardTitle>
          <CardDescription>Closing balance trend for the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => format(new Date(date), 'MMM dd')}
              />
              <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
              <Tooltip 
                formatter={(value: number) => formatIndianCurrency(value)}
                labelFormatter={(date) => format(new Date(date), 'MMM dd, yyyy')}
              />
              <Legend />
              <Line type="monotone" dataKey="cashInHand" stroke="#22c55e" name="Cash in Hand" strokeWidth={2} />
              <Line type="monotone" dataKey="hdfc" stroke="#3b82f6" name="HDFC Bank" strokeWidth={2} />
              <Line type="monotone" dataKey="icici" stroke="#f97316" name="ICICI Bank" strokeWidth={2} />
              <Line type="monotone" dataKey="sbi" stroke="#8b5cf6" name="SBI" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </ThemedCard>

      {/* Project-wise Cash Position */}
      <ThemedCard theme="cash">
        <CardHeader>
          <CardTitle>Project-wise Cash & Bank Position</CardTitle>
          <CardDescription>Click on a project to view detailed account transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cashData.projects.map((project) => (
              <div key={project.projectCode} className="border rounded-lg">
                {/* Project Header */}
                <div
                  onClick={() => toggleProjectExpansion(project.projectCode)}
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {expandedProjects.has(project.projectCode) ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-semibold">{project.projectName}</p>
                      <p className="text-sm text-muted-foreground">{project.projectCode}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total Balance</p>
                    <p className="text-lg font-bold">
                      {formatIndianCurrency(
                        project.accounts.reduce(
                          (sum, acc) => sum + acc.transactions[acc.transactions.length - 1].closingBalance,
                          0
                        )
                      )}
                    </p>
                  </div>
                </div>

                {/* Expanded Project Details */}
                {expandedProjects.has(project.projectCode) && (
                  <div className="border-t p-4 space-y-6 bg-muted/20">
                    {project.accounts.map((account, accIndex) => (
                      <div key={accIndex} className="space-y-3">
                        {/* Account Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getAccountIcon(account.accountName)}
                            <div>
                              <p className="font-medium">{account.accountName}</p>
                              {account.accountNumber && (
                                <p className="text-xs text-muted-foreground">
                                  Account: {account.accountNumber}
                                </p>
                              )}
                            </div>
                          </div>
                          <Badge variant={getAccountBadgeVariant(account.accountType)}>
                            {account.accountType}
                          </Badge>
                        </div>

                        {/* Transactions Table */}
                        <div className="overflow-x-auto rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-muted/50">
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Opening Balance</TableHead>
                                <TableHead className="text-right">Receipts</TableHead>
                                <TableHead className="text-right">Payments</TableHead>
                                <TableHead className="text-right">Closing Balance</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {account.transactions.map((txn, txnIndex) => (
                                <TableRow key={txnIndex}>
                                  <TableCell className="font-medium">
                                    {format(new Date(txn.date), 'dd MMM yyyy')}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {formatIndianCurrency(txn.openingBalance)}
                                  </TableCell>
                                  <TableCell className="text-right text-green-600">
                                    +{formatIndianCurrency(txn.receipts)}
                                  </TableCell>
                                  <TableCell className="text-right text-red-600">
                                    -{formatIndianCurrency(txn.payments)}
                                  </TableCell>
                                  <TableCell className="text-right font-semibold">
                                    {formatIndianCurrency(txn.closingBalance)}
                                  </TableCell>
                                </TableRow>
                              ))}
                              {/* Summary Row */}
                              <TableRow className="bg-muted/50 font-bold">
                                <TableCell>Total (7 days)</TableCell>
                                <TableCell className="text-right">-</TableCell>
                                <TableCell className="text-right text-green-600">
                                  +{formatIndianCurrency(
                                    account.transactions.reduce((sum, txn) => sum + txn.receipts, 0)
                                  )}
                                </TableCell>
                                <TableCell className="text-right text-red-600">
                                  -{formatIndianCurrency(
                                    account.transactions.reduce((sum, txn) => sum + txn.payments, 0)
                                  )}
                                </TableCell>
                                <TableCell className="text-right">
                                  {formatIndianCurrency(
                                    account.transactions[account.transactions.length - 1].closingBalance
                                  )}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </ThemedCard>

      {/* Key Insights */}
      <ThemedCard theme="cash">
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Total Liquid Position:</span> The organization currently holds{" "}
            <span className="text-purple-600 font-semibold">{formatIndianCurrency(totalLiquidFunds)}</span> in liquid funds across all projects.
          </p>
          <p>
            <span className="font-medium text-foreground">Cash Distribution:</span> Cash in hand accounts for{" "}
            <span className="text-green-600 font-semibold">
              {((totalCashInHand / totalLiquidFunds) * 100).toFixed(1)}%
            </span>{" "}
            while bank balances represent{" "}
            <span className="text-blue-600 font-semibold">
              {((totalBankBalance / totalLiquidFunds) * 100).toFixed(1)}%
            </span>{" "}
            of total funds.
          </p>
          <p>
            <span className="font-medium text-foreground">Bank Distribution:</span> HDFC Bank holds the highest balance at{" "}
            <span className="font-semibold">
              {formatIndianCurrency(
                cashData.summary.accountsSummary.find(a => a.accountName.includes("HDFC"))?.currentBalance || 0
              )}
            </span>
            , followed by ICICI Bank and SBI.
          </p>
        </CardContent>
      </ThemedCard>
    </div>
  );
}


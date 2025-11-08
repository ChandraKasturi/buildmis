/**
 * Receivables & Collections Report
 * Route: /reports/receivables
 * 
 * Purpose: Track invoices raised, payments received, and collection status
 * 
 * Components to add later:
 * - Receivables summary cards
 * - Project-wise receivable table
 * - Collection stage breakdown (Booking, Agreement, Sale Deed)
 * - Aging analysis chart
 * - Overdue invoices alert
 * 
 * Data source:
 * - data/mock/receivables.json
 * 
 * Key metrics:
 * - Total Billed Amount
 * - Total Received Amount
 * - Balance Receivable
 * - Collection % Realized
 * - Stage-wise collections
 * - Overdue amounts
 */

export default function ReceivablesReportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Receivables & Collections
        </h1>
        <p className="text-muted-foreground">
          Track billing and collection status
        </p>
      </div>

      {/* TODO: Add receivables summary cards */}
      {/* TODO: Add project-wise receivables table */}
      {/* TODO: Add collection stage breakdown */}
      {/* TODO: Add aging analysis chart */}
    </div>
  );
}


import { createFileRoute } from '@tanstack/react-router'

import { Sidebar } from '@/components/dashboard/Sidebar'
import { DashboardHeader } from '@/components/dashboard/Header'
import {
  SalesChartWidget,
  InvoiceSummaryWidget,
  RecentInvoicesWidget,
  UnInvoicedSalesWidget,
} from '@/components/dashboard/Widgets'
import { SalesGaugeWidget } from '@/components/dashboard/SalesGauge'
import { authMiddleware } from '@/lib/middleware'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
  server: {
	  middleware: [authMiddleware],
  },
})

function RouteComponent() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="md:ml-64">
        <DashboardHeader />

        <main className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
            <SalesChartWidget />
            <InvoiceSummaryWidget />
            <RecentInvoicesWidget />
            <UnInvoicedSalesWidget />
            <SalesGaugeWidget />
          </div>
        </main>
      </div>
    </div>
  )
}

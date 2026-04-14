'use client'

import { HugeiconsIcon } from '@hugeicons/react'
import {
	ExpandIcon,
	ArrowUpIcon,
	ArrowDownIcon,
	Settings01Icon,
	SendingOrderFreeIcons,
	Sent02Icon,
	Invoice01Icon,
	ChartUpIcon,
	ChartDownIcon,
} from '@hugeicons/core-free-icons'
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	LineChart,
	Line,
} from 'recharts'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const salesData = [
	{ month: 'Ene', sales: 2800000 },
	{ month: 'Feb', sales: 3100000 },
	{ month: 'Mar', sales: 2900000 },
	{ month: 'Abr', sales: 3400000 },
	{ month: 'May', sales: 3200000 },
	{ month: 'Jun', sales: 3100000 },
	{ month: 'Jul', sales: 2800000 },
	{ month: 'Ago', sales: 3500000 },
	{ month: 'Sep', sales: 3800000 },
	{ month: 'Oct', sales: 4100000 },
	{ month: 'Nov', sales: 4300000 },
	{ month: 'Dic', sales: 5200000 },
]

const invoiceSparkline = [
	{ day: 1, invoices: 2 },
	{ day: 5, invoices: 5 },
	{ day: 10, invoices: 8 },
	{ day: 15, invoices: 12 },
	{ day: 20, invoices: 16 },
	{ day: 25, invoices: 20 },
	{ day: 30, invoices: 23 },
]

const recentInvoices = [
	{
		id: 'FAC-0891',
		client: 'Distribuidora López',
		date: '31 Mar, 2:20 PM',
		amount: '₡320,000',
		status: 'Pagada',
		initial: 'D',
	},
	{
		id: 'FAC-0892',
		client: 'Café El Barista',
		date: '30 Mar, 10:15 AM',
		amount: '₡45,000',
		status: 'Pendiente',
		initial: 'C',
	},
	{
		id: 'FAC-0893',
		client: 'Ferretería Norte',
		date: '29 Mar, 4:30 PM',
		amount: '₡180,000',
		status: 'Pagada',
		initial: 'F',
	},
	{
		id: 'FAC-0894',
		client: 'María V.',
		date: '28 Mar, 11:00 AM',
		amount: '₡62,000',
		status: 'Vencida',
		initial: 'M',
	},
	{
		id: 'FAC-0895',
		client: 'Importaciones CR',
		date: '27 Mar, 9:45 AM',
		amount: '₡510,000',
		status: 'Pendiente',
		initial: 'I',
	},
]

const unInvoicedSales = [
	{ client: 'Supermercado Alfa', amount: '₡95,000', daysLeft: 5 },
	{ client: 'Taller Mecánico Ruiz', amount: '₡38,500', daysLeft: 2 },
	{ client: 'Ana Solís', amount: '₡12,000', daysLeft: 0 },
	{ client: 'Hotel Las Palmas', amount: '₡240,000', daysLeft: 7 },
	{ client: 'Bodega Central', amount: '₡67,000', daysLeft: -1 },
]

function formatCurrency(value: number): string {
	return new Intl.NumberFormat('es-CR', {
		style: 'currency',
		currency: 'CRC',
		maximumFractionDigits: 0,
	}).format(value)
}

const totalSales = salesData.reduce((acc, item) => acc + item.sales, 0)
const lastYearSales = totalSales * 0.85
const changePercent = ((totalSales - lastYearSales) / lastYearSales) * 100
const isPositive = changePercent > 0

export function SalesChartWidget() {
	return (
		<Card className="col-span-7 border bg-card p-5">
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base font-semibold">
						Ventas Mensuales
					</CardTitle>
					<div className="flex items-center gap-2">
						<Badge className="rounded-full px-2 py-1 text-xs bg-muted text-muted-foreground">
							Últimos 12 meses
						</Badge>
						<Button variant="ghost" size="icon-xs">
							<HugeiconsIcon icon={ExpandIcon} size={12} strokeWidth={2} />
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="mb-4 flex items-baseline gap-3">
					<span className="text-3xl font-bold tabular-nums">
						{formatCurrency(totalSales)}
					</span>
					<Badge
						className={`flex items-center gap-1 ${isPositive
								? 'bg-green-500/15 text-green-400'
								: 'bg-red-500/15 text-red-400'
							}`}
					>
						{isPositive ? (
							<HugeiconsIcon icon={ChartUpIcon} size={18} strokeWidth={2} />

						) : (
							<HugeiconsIcon icon={ChartDownIcon} size={18} strokeWidth={2} />

						)}
						{Math.abs(changePercent).toFixed(1)}%
					</Badge>
				</div>
				<div className="mb-4 flex gap-4">
					<Badge className="flex items-center gap-1 bg-muted text-muted-foreground">
						<HugeiconsIcon icon={ChartUpIcon} size={18} strokeWidth={2} />

						156 facturas emitidas
					</Badge>
					<Badge className="flex items-center gap-1 bg-muted text-muted-foreground">
						<HugeiconsIcon icon={ChartUpIcon} size={18} strokeWidth={2} />

						2,340 productos vendidos
					</Badge>
				</div>
				<div className="h-48">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart data={salesData}>
							<defs>
								<linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
									<stop offset="0%" stopColor="#8aa070" stopOpacity={0.1} />
									<stop offset="100%" stopColor="#8aa070" stopOpacity={0} />
								</linearGradient>
							</defs>
							<XAxis
								dataKey="month"
								axisLine={false}
								tickLine={false}
								tick={{ fill: '#6b7280', fontSize: 12 }}
							/>
							<YAxis hide />
							<Tooltip
								contentStyle={{
									backgroundColor: '#1a1a1a',
									border: '1px solid #333',
									borderRadius: '8px',
									fontSize: '12px',
								}}
								labelStyle={{ color: '#9ca3af' }}
								formatter={(value: unknown) => [
									formatCurrency(value as number),
									'Ventas',
								]}
							/>
							<Area
								type="monotone"
								dataKey="sales"
								stroke="#8aa070"
								strokeWidth={2}
								fill="url(#salesGradient)"
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
}

export function InvoiceSummaryWidget() {
	const totalInvoices = 4820000
	const invoiceChangePercent = 12

	return (
		<Card className="col-span-5 border bg-card p-5">
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base font-semibold">
						Facturas del Mes
					</CardTitle>
					<Button variant="ghost" size="icon-xs">
						<HugeiconsIcon icon={ExpandIcon} size={12} strokeWidth={2} />
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<div className="mb-4 flex items-baseline gap-3">
					<span className="text-3xl font-bold tabular-nums">
						{formatCurrency(totalInvoices)}
					</span>
					<Badge className="flex items-center gap-1 bg-green-500/15 text-green-400">
						<HugeiconsIcon icon={ChartUpIcon} size={18} strokeWidth={2} />+{invoiceChangePercent}% vs mes
						anterior
					</Badge>
				</div>
				<div className="mb-4 flex gap-4">
					<Badge className="bg-muted text-muted-foreground">23 emitidas</Badge>
					<Badge className="bg-muted text-muted-foreground">
						5 pendientes de pago
					</Badge>
				</div>
				<div className="h-20">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={invoiceSparkline}>
							<XAxis
								dataKey="day"
								axisLine={false}
								tickLine={false}
								tick={{ fill: '#6b7280', fontSize: 10 }}
								tickFormatter={(value) => `${value}`}
							/>
							<YAxis hide />
							<Tooltip
								contentStyle={{
									backgroundColor: '#1a1a1a',
									border: '1px solid #333',
									borderRadius: '8px',
									fontSize: '12px',
								}}
								labelStyle={{ color: '#9ca3af' }}
								formatter={(value: unknown) => [`${value} facturas`, 'Día']}
							/>
							<Line
								type="monotone"
								dataKey="invoices"
								stroke="#8aa070"
								strokeWidth={2}
								dot={false}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
}

export function RecentInvoicesWidget() {
	return (
		<Card className="col-span-7 border bg-card p-5">
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base font-semibold">
						Facturas Recientes
					</CardTitle>
					<div className="flex items-center gap-1">
						<Button variant="ghost" size="icon-xs">
							<HugeiconsIcon icon={ExpandIcon} size={12} strokeWidth={2} />
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-1">
					{recentInvoices.map((invoice) => (
						<div
							key={invoice.id}
							className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/50"
						>
							<div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
								<span className="text-xs font-bold text-muted-foreground">
									{invoice.initial}
								</span>
							</div>
							<div className="flex flex-1 flex-col">
								<span className="text-sm font-medium text-foreground">
									{invoice.client}
								</span>
								<span className="text-xs text-muted-foreground">
									{invoice.id} · {invoice.date}
								</span>
							</div>
							<div className="flex flex-col items-end">
								<span className="text-sm font-semibold text-foreground">
									{invoice.amount}
								</span>
								<Badge
									className={`text-xs ${invoice.status === 'Pagada'
											? 'bg-green-500/15 text-green-400'
											: invoice.status === 'Pendiente'
												? 'bg-yellow-500/15 text-yellow-400'
												: 'bg-red-500/15 text-red-400'
										}`}
								>
									{invoice.status}
								</Badge>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}

export function UnInvoicedSalesWidget() {
	const urgentCount = 3

	return (
		<Card className="col-span-5 border bg-card p-5">
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<div>
						<CardTitle className="text-base font-semibold">
							Ventas sin Facturar
						</CardTitle>
						<p className="text-xs text-muted-foreground">
							Requieren emisión de factura
						</p>
					</div>
					<Button variant="ghost" size="icon-xs">
						<HugeiconsIcon icon={ExpandIcon} size={12} strokeWidth={2} />
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<div className="mb-4 flex items-baseline gap-3">
					<span className="text-4xl font-bold tabular-nums">8</span>
					<Badge className="flex items-center gap-1 bg-red-500/15 text-red-400">
						<HugeiconsIcon icon={Invoice01Icon} size={12} strokeWidth={2} />

					</Badge>
				</div>
				<div className="space-y-2">
					{unInvoicedSales.map((sale) => (
						<div
							key={sale.client}
							className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2"
						>
							<div className="flex flex-col">
								<span className="text-sm font-medium text-foreground">
									{sale.client}
								</span>
								<span className="text-sm font-semibold text-foreground">
									{sale.amount}
								</span>
							</div>
							<Badge
								className={`text-xs ${sale.daysLeft <= 0
										? 'bg-red-500/15 text-red-400'
										: sale.daysLeft <= 2
											? 'bg-yellow-500/15 text-yellow-400'
											: 'bg-green-500/15 text-green-400'
									}`}
							>
								{sale.daysLeft <= 0
									? sale.daysLeft === 0
										? 'Vence hoy'
										: 'Vencido'
									: `Vence en ${sale.daysLeft}d`}
							</Badge>
						</div>
					))}
				</div>
				<Button variant="outline" size="sm" className="mt-4 w-full">
					<HugeiconsIcon icon={Sent02Icon} size={18} strokeWidth={2} />

					<span className="ml-2">Emitir todas las facturas</span>
				</Button>
			</CardContent>
		</Card>
	)
}

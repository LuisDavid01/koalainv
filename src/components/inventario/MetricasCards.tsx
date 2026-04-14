'use client'

import { HugeiconsIcon } from '@hugeicons/react'
import {
  PackageOpenIcon,
  AlertCircleIcon,
  ArchiveIcon,
  CoinsSwapIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
} from '@hugeicons/core-free-icons'

import { Card } from '@/components/ui/card'
import { mockProductos, type Metrica } from './data'

function MetricaCard({ metric }: { metric: Metrica }) {
  return (
    <Card className="flex flex-col rounded-xl border p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          {metric.label}
        </span>
        <HugeiconsIcon
          icon={metric.icon}
          size={16}
          strokeWidth={1.5}
          className="text-muted-foreground"
        />
      </div>
      <span
        className={`mt-2 text-2xl font-bold ${
          metric.variant === 'warning'
            ? 'text-yellow-400'
            : metric.variant === 'danger'
              ? 'text-red-400'
              : 'text-foreground'
        }`}
      >
        {metric.value}
      </span>
      <div className="mt-1 flex items-center gap-1">
        <HugeiconsIcon
          icon={metric.isPositive ? ArrowUpRightIcon : ArrowDownRightIcon}
          size={12}
          strokeWidth={1.5}
          className={metric.isPositive ? 'text-green-400' : 'text-red-400'}
        />
        <span
          className={`text-xs ${
            metric.isPositive ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {metric.change}
        </span>
      </div>
    </Card>
  )
}

const metricsIcons = {
  total: PackageOpenIcon,
  bajo: AlertCircleIcon,
  sin: ArchiveIcon,
  valor: CoinsSwapIcon,
}

export function MetricasCards() {
  const totalProductos = mockProductos.length
  const stockBajo = mockProductos.filter(
    (p) => p.stock > 0 && p.stock <= 3,
  ).length
  const sinStock = mockProductos.filter((p) => p.stock === 0).length
  const valorInventario = mockProductos.reduce(
    (acc, p) => acc + p.stock * p.precio,
    0,
  )

  const metrics: Metrica[] = [
    {
      label: 'Total Productos',
      value: totalProductos.toLocaleString('es-CR'),
      change: '+12 esta semana',
      isPositive: true,
      icon: metricsIcons.total,
    },
    {
      label: 'Stock Bajo',
      value: stockBajo.toString(),
      change: 'Requieren atención',
      isPositive: false,
      variant: 'warning',
      icon: metricsIcons.bajo,
    },
    {
      label: 'Sin Stock',
      value: sinStock.toString(),
      change: 'Agotados',
      isPositive: false,
      variant: 'danger',
      icon: metricsIcons.sin,
    },
    {
      label: 'Valor del Inventario',
      value: `₡${valorInventario.toLocaleString('es-CR')}`,
      change: '+3.2% vs mes anterior',
      isPositive: true,
      icon: metricsIcons.valor,
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {metrics.map((m, i) => (
        <MetricaCard key={i} metric={m} />
      ))}
    </div>
  )
}

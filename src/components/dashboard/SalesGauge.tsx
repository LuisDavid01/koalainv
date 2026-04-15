'use client'

import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowUpIcon, ExpandIcon } from '@hugeicons/core-free-icons'
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const goalData = [
  { name: 'Actual', value: 72, fill: '#8aa070' },
  { name: 'Meta', value: 100, fill: '#333333' },
]

export function SalesGaugeWidget() {
  const currentSales = 3200000
  const goal = 4500000
  const percent = (currentSales / goal) * 100
  const previousChange = 8

  return (
    <Card className="col-span-4 border bg-card p-5">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Meta de Ventas
          </CardTitle>
          <Button variant="ghost" size="icon-xs">
            <HugeiconsIcon icon={ExpandIcon} size={12} strokeWidth={2} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex items-baseline gap-3">
          <span className="text-3xl font-bold tabular-nums">
            ₡{currentSales.toLocaleString('es-CR')}
          </span>
          <Badge className="flex items-center gap-1 bg-green-500/15 text-green-400">
            <HugeiconsIcon icon={ArrowUpIcon} size={12} strokeWidth={2} /> +
            {previousChange}%
          </Badge>
        </div>
        <div className="relative mb-4 min-h-[128px]">
          <ResponsiveContainer width="100%" height={128}>
            <RadialBarChart
              innerRadius="70%"
              outerRadius="100%"
              barSize={12}
              startAngle={180}
              endAngle={0}
              data={goalData}
            >
              <RadialBar
                background={{ fill: '#2a2a2a' }}
                dataKey="value"
                cornerRadius={6}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value: unknown) => [
                  (value as number) === 72 ? `${percent.toFixed(0)}%` : '100%',
                  (value as number) === 72 ? 'Actual' : 'Meta',
                ]}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
            <span className="text-xl font-bold tabular-nums">
              {percent.toFixed(0)}%
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="size-2 rounded-full bg-primary" />
            <span className="text-muted-foreground">Actual</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="size-2 rounded-full bg-[#333333]" />
            <span className="text-muted-foreground">Meta del mes</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

'use client'

import { createFileRoute } from '@tanstack/react-router'

import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { LayoutTableIcon, PlusSignIcon } from '@hugeicons/core-free-icons'

import { DashboardHeader } from '@/components/dashboard/Header'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Button } from '@/components/ui/button'
import { MetricasCards } from '@/components/inventario/MetricasCards'
import { BarraAcciones } from '@/components/inventario/BarraAcciones'
import { TablaInventario } from '@/components/inventario/TablaInventario'
import { AgregarEditarModal } from '@/components/inventario/AgregarEditarModal'

interface Filtros {
  categoria: string | null
  estadoStock: string | null
  precioMin: string
  precioMax: string
}

export const Route = createFileRoute('/dashboard/inventario/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [search, setSearch] = useState('')
  const [filtros, setFiltros] = useState<Filtros>({
    categoria: 'Todos',
    estadoStock: 'Todos',
    precioMin: '',
    precioMax: '',
  })
  const [modalAgregarOpen, setModalAgregarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="md:ml-64">

        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-6">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Dashboard</span>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium text-foreground">Inventario</span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <HugeiconsIcon
                icon={LayoutTableIcon}
                size={16}
                strokeWidth={1.5}
                className="mr-1"
              />
              Gestionar Columnas
            </Button>
            <Button
              size="sm"
              className="bg-primary"
              onClick={() => setModalAgregarOpen(true)}
            >
              <HugeiconsIcon
                icon={PlusSignIcon}
                size={16}
                strokeWidth={1.5}
                className="mr-1"
              />
              + Agregar Producto
            </Button>
          </div>
        </header>

        <main className="p-6 space-y-4">
          <MetricasCards />

          <BarraAcciones
            search={search}
            onSearchChange={setSearch}
            filtros={filtros}
            onFiltrosChange={setFiltros}
          />

          <TablaInventario search={search} filtros={filtros} />
        </main>
      </div>
    </div>
  )
}

import { Sidebar } from '@/components/dashboard/Sidebar'
import { BarraAcciones } from '@/components/inventario/BarraAcciones'
import { MetricasCards } from '@/components/inventario/MetricasCards'
import { Button } from '@/components/ui/button'
import { LayoutTableIcon, PlusSignIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/dashboard/inventarios/')({
  component: RouteComponent,
})

function RouteComponent() {
	  const [search, setSearch] = useState('')
  const [modalAgregarOpen, setModalAgregarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="md:ml-64">

        <main className="p-6 space-y-4">

        </main>
      </div>
    </div>
  )

}

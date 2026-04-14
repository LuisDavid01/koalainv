'use client'

import { HugeiconsIcon } from '@hugeicons/react'

import { Button } from '@/components/ui/button'
import { Calendar01FreeIcons, Menu01FreeIcons, SlidersHorizontalFreeIcons } from '@hugeicons/core-free-icons'

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="md:hidden">
		 <HugeiconsIcon icon={Menu01FreeIcons} size={4} strokeWidth={2} />

        </Button>
        <Button variant="outline" size="sm">
		<HugeiconsIcon icon={Calendar01FreeIcons} size={4} strokeWidth={2} />
          <span className="ml-2">Este Mes</span>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
		<HugeiconsIcon icon={SlidersHorizontalFreeIcons} size={4} strokeWidth={2} />

          <span className="hidden sm:inline ml-2">Gestionar Widgets</span>
        </Button>
        <Button size="sm" className="bg-primary text-primary-foreground">
          <span className="mr-1">+</span>
          <span className="hidden sm:inline">Agregar Widget</span>
        </Button>
      </div>
    </header>
  )
}

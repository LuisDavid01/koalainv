import { HugeiconsIcon } from '@hugeicons/react'
import { AddIcon, ArchiveIcon } from '@hugeicons/core-free-icons'
import { Button } from '@/components/ui/button'

interface SinInventariosProps {
  onCrearInventario: () => void
}

export function SinInventarios({ onCrearInventario }: SinInventariosProps) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <HugeiconsIcon
            icon={ArchiveIcon}
            size={32}
            strokeWidth={1.5}
            className="text-muted-foreground"
          />
        </div>
        <h3 className="mb-2 text-lg font-semibold">No tienes inventarios</h3>
        <p className="mb-6 text-sm text-muted-foreground">
          Crea tu primer inventario para comenzar a gestionar tus productos
        </p>
        <Button className="bg-primary" onClick={onCrearInventario}>
          <HugeiconsIcon icon={AddIcon} size={16} className="mr-2" />
          Crear inventario
        </Button>
      </div>
    </div>
  )
}
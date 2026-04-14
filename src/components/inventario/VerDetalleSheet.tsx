'use client'

import { HugeiconsIcon } from '@hugeicons/react'
import {
  AddCircleIcon,
  RemoveCircleIcon,
  Settings01Icon,
} from '@hugeicons/core-free-icons'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { type Producto } from './data'

interface VerDetalleSheetProps {
  producto: Producto
  open: boolean
  onOpenChange: (open: boolean) => void
  onEditar: () => void
  onEliminar: () => void
}

const movimientos = [
  { tipo: 'entrada', cantidad: 10, fecha: '2024-01-10', icon: AddCircleIcon },
  { tipo: 'venta', cantidad: -2, fecha: '2024-01-09', icon: RemoveCircleIcon },
  { tipo: 'ajuste', cantidad: 5, fecha: '2024-01-08', icon: Settings01Icon},
]

export function VerDetalleSheet({
  producto,
  open,
  onOpenChange,
  onEditar,
  onEliminar,
}: VerDetalleSheetProps) {
  const stockColor =
    producto.stock > 10
      ? 'bg-green-400'
      : producto.stock >= 3
        ? 'bg-yellow-400'
        : 'bg-red-400'
  const stockLabel =
    producto.stock > 10
      ? 'En stock'
      : producto.stock >= 3
        ? 'Stock bajo'
        : 'Sin stock'

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-96">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">
            {producto.nombre}
          </SheetTitle>
          <div className="flex items-center gap-2">
            <span className={`size-2 rounded-full ${stockColor}`} />
            <span className="text-xs text-muted-foreground">{stockLabel}</span>
            <span className="text-xs text-muted-foreground">
              ({producto.stock} unidades)
            </span>
          </div>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          <div className="flex h-40 w-full items-center justify-center rounded-xl bg-muted">
            <Avatar className="size-20 rounded-xl">
              <AvatarFallback className="bg-muted text-2xl">
                {producto.nombre.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground">Stock</div>
              <div className="text-sm font-semibold">{producto.stock}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Precio</div>
              <div className="text-sm font-semibold">
                ₡{producto.precio.toLocaleString('es-CR')}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Categoría</div>
              <div className="text-sm font-semibold">{producto.categoria}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Marca</div>
              <div className="text-sm font-semibold">{producto.marca}</div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="text-sm font-semibold">Movimientos recientes</div>
            <div className="mt-2 space-y-2">
              {movimientos.map((m, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <HugeiconsIcon
                    icon={m.icon}
                    size={14}
                    strokeWidth={1.5}
                    className={
                      m.tipo === 'entrada'
                        ? 'text-green-400'
                        : m.tipo === 'venta'
                          ? 'text-red-400'
                          : 'text-yellow-400'
                    }
                  />
                  <span className="flex-1 capitalize">{m.tipo}</span>
                  <span
                    className={
                      m.cantidad > 0 ? 'text-green-400' : 'text-red-400'
                    }
                  >
                    {m.cantidad > 0 ? '+' : ''}
                    {m.cantidad}
                  </span>
                  <span className="text-muted-foreground">{m.fecha}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <Button className="w-full bg-primary" onClick={onEditar}>
            Editar Producto
          </Button>
          <Button variant="destructive" className="w-full" onClick={onEliminar}>
            Eliminar
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

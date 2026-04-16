import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { type PRODUCT_TYPE } from '@/server/db/schema'

interface VerDetalleSheetProps {
  producto: PRODUCT_TYPE
  open: boolean
  onOpenChange: (open: boolean) => void
  onEditar: () => void
  onEliminar: () => void
}

export function VerDetalleSheet({
  producto,
  open,
  onOpenChange,
  onEditar,
  onEliminar,
}: VerDetalleSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-96">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">
            {producto.name}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          <div className="flex h-40 w-full items-center justify-center rounded-xl bg-muted">
            <Avatar className="size-20 rounded-xl">
              <AvatarFallback className="bg-muted text-2xl">
                {producto.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground">Precio</div>
              <div className="text-sm font-semibold">
                ₡{producto.price.toLocaleString('es-CR')}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Categoría ID</div>
              <div className="text-sm font-semibold">
                {producto.categoryId ?? 'N/A'}
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground">Descripción</div>
            <div className="text-sm">{producto.description}</div>
          </div>

          <div className="border-t pt-4">
            <div className="text-xs text-muted-foreground">Creado</div>
            <div className="text-sm">
              {new Date(producto.createdAt).toLocaleDateString('es-CR')}
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

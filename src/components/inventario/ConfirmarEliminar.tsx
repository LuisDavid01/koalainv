'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { type Producto } from './data'

interface ConfirmarEliminarProps {
  producto: Producto
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ConfirmarEliminar({
  producto,
  open,
  onOpenChange,
}: ConfirmarEliminarProps) {
  const handleEliminar = () => {
    console.log('Eliminar producto:', producto.id)
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground">
            Esta acción es irreversible. El producto "{producto.nombre}" será
            eliminado permanentemente del inventario.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Button variant="outline">Cancelar</Button>
          </AlertDialogCancel>
          <AlertDialogAction>
            <Button className="bg-destructive" onClick={handleEliminar}>
              Eliminar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

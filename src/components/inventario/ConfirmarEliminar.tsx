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
import { type PRODUCT_TYPE } from '@/server/db/schema'

interface ConfirmarEliminarProps {
  producto: PRODUCT_TYPE
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isDeleting?: boolean
}

export function ConfirmarEliminar({
  producto,
  open,
  onOpenChange,
  onConfirm,
  isDeleting,
}: ConfirmarEliminarProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground">
            El producto &quot;{producto.name}&quot; será marcado como inactivo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Button variant="outline" disabled={isDeleting}>
              Cancelar
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction>
            <Button
              className="bg-destructive"
              onClick={onConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

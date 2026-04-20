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
import type { ProductoWithStock } from '@/server/queries.server'

interface ConfirmarEliminarProps {
	producto: ProductoWithStock
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
						El producto &quot;{producto.name}&quot; será marcado como inactivo en este inventario.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel
					>

						Cancelar
					</AlertDialogCancel>
					<AlertDialogAction
						variant="destructive"
						onClick={onConfirm}
						disabled={isDeleting}
					>

						{isDeleting ? 'Eliminando...' : 'Eliminar'}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

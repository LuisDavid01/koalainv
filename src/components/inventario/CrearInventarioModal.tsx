import { useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createInventario } from '@/server/actions/inventarios.functions'
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'

interface CrearInventarioModalProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	onSuccess?: () => void
}

const formSchema = z.object({
	name: z.string().min(1, 'El nombre es requerido'),
	organizationId: z.number().min(1),
	active: z.boolean(),
})

export function CrearInventarioModal({
	open,
	onOpenChange,
	onSuccess,
}: CrearInventarioModalProps) {
	const form = useForm({
		defaultValues: {
			name: '',
			organizationId: 1,
			active: true,
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			await createInventario({ data: value })
			onOpenChange(false)
			onSuccess?.()
		},
	})

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-lg">
				<form
					id="inventario-form"
					onSubmit={(e) => {
						e.preventDefault()
						form.handleSubmit()
					}}
				>
					<DialogHeader>
						<DialogTitle>Crear Inventario</DialogTitle>
					</DialogHeader>

					<div className="space-y-4 py-4">
						<form.Field
							name="name"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Nombre</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder="Nombre del inventario"
											className=""
											autoComplete="off"
											aria-invalid={isInvalid}
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								)
							}}
						/>
					</div>

					<DialogFooter>
						<div className="mt-4 flex gap-2">
							<Button variant="outline" onClick={() => onOpenChange(false)}>
								Cancelar
							</Button>
							<Button className="bg-primary" type="submit">
								Crear
							</Button>
						</div>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
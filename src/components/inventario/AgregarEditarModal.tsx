import { useState, useEffect } from 'react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import type { PRODUCT_TYPE } from '@/server/db/schema'
import {
	createProducto,
	updateProducto,
} from '@/server/actions/productos.functions'
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'

interface AgregarEditarModalProps {
	producto?: PRODUCT_TYPE | null
	isEditing?: boolean
	open: boolean
	onOpenChange: (open: boolean) => void
	onSuccess?: () => void
}

const formSchema = z.object({
	id: z.number().min(0),
	name: z.string().min(1),
	description: z.string().min(1),
	price: z.number().min(1),
	categoryId: z.number().min(1),
	organizationId: z.number().min(1),
})

export function AgregarEditarModal({
	producto,
	isEditing = false,
	open,
	onOpenChange,
	onSuccess,
}: AgregarEditarModalProps) {

	const form = useForm({
		defaultValues: {
			id: producto?.id ?? 0,
			organizationId: 1,
			name: producto?.name ?? "",
			description: producto?.description ?? "",
			price: producto?.price ?? 100,
			categoryId: producto?.categoryId ?? 1,
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			isEditing ? await updateProducto({ data: value }) :
				await createProducto({ data: value })
		},
	})






	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-lg">
				<form
					id="producto-form"
					onSubmit={(e) => {
						e.preventDefault()
						form.handleSubmit()
					}}
				>
					<DialogHeader>
						<DialogTitle>
							{isEditing ? 'Editar Producto' : 'Agregar Producto'}
						</DialogTitle>
					</DialogHeader>


					<div className="space-y-4 py-4">
						<FieldGroup className="space-y-2">
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
												placeholder="m@example.com"
												className=""
												aria-invalid={isInvalid}
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									)
								}}
							/>
						</FieldGroup>

						<FieldGroup className="space-y-2">
							<form.Field
								name="description"
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
												placeholder="m@example.com"
												className=""
												aria-invalid={isInvalid}
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									)
								}}
							/>
						</FieldGroup>
					</div>

					<FieldGroup className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<form.Field
								name="price"
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
												onChange={(e) => field.handleChange(e.target.valueAsNumber)}
												placeholder="2000"
												className=""
												aria-invalid={isInvalid}
												type='number'
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									)
								}}
							/>
						</div>

						<div className="space-y-2">
							<form.Field
								name="categoryId"
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
												onChange={(e) => field.handleChange(e.target.valueAsNumber)}
												placeholder="1"
												className=""
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
					</FieldGroup>

					<DialogFooter>
						<Button variant="outline" onClick={() => onOpenChange(false)}>
							Cancelar
						</Button>
						<Button
							className="bg-primary"
							type='submit'
						>
							{isEditing ? 'Actualizar' : 'Crear'}
						</Button>

					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog >
	)
}

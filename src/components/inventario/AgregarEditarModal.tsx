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
import type { ProductoWithStock } from '@/server/queries.server'
import {
	createProducto,
	updateProducto,
} from '@/server/actions/productos.functions'
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { Textarea } from '../ui/textarea'

interface AgregarEditarModalProps {
	data?: ProductoWithStock | null
	idInvetario: number
	isEditing?: boolean
	open: boolean
	onOpenChange: (open: boolean) => void
	onSuccess?: () => void
}

const formSchema = z.object({
	id: z.number().min(0),
	name: z.string().min(1, 'El nombre es requerido'),
	description: z.string().min(1, 'La descripción es requerida'),
	price: z.number().min(1, 'El precio es requerido'),
	categoryId: z.number().min(1, 'La categoría es requerida'),
	organizationId: z.number().min(1, 'El id de la organización es requerido'),
	stock: z.number().min(1, 'El stock es requerido'),
	inventoryId: z.number().min(1, 'El id de la inventario es requerido'),
	active: z.boolean(),
})

export function AgregarEditarModal({
	data,
	idInvetario,
	isEditing = false,
	open,
	onOpenChange,
	onSuccess,
}: AgregarEditarModalProps) {

	const form = useForm({
		defaultValues: {
			id: data?.id ?? 0,
			organizationId: 1,
			name: data?.name ?? "",
			description: data?.description ?? "",
			price: data?.price ?? 100,
			categoryId: data?.categoryId ?? 1,
			stock: data?.stock ?? 1,
			inventoryId: idInvetario,
			active: data?.active ?? true,
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			isEditing ? await updateProducto({ data: { id: value.id, product: value } }) :
				await createProducto({ data: value })
		} ,
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
												placeholder="Nombre del producto"
												className=""
												autoComplete='off'
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
											<FieldLabel htmlFor={field.name}>Descripción</FieldLabel>
											<Textarea
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="Descripción del producto"
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
											<FieldLabel htmlFor={field.name}>Precio</FieldLabel>
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
											<FieldLabel htmlFor={field.name}>Categoría</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.valueAsNumber)}
												defaultValue={field.state.value}
												placeholder="1"
												className=""
												type='number'
												aria-invalid={isInvalid}
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									)
								}}
							/>

							<div className="space-y-2">
							<form.Field
								name="stock"
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Cantidad de Inventario</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.valueAsNumber)}
												placeholder="10"
												defaultValue={field.state.value}
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

						</div>
					</FieldGroup>

					<DialogFooter >
					<div className=' mt-4'>
						<Button variant="outline" onClick={() => onOpenChange(false)}>
							Cancelar
						</Button>
						<Button
							className="bg-primary"
							type='submit'
						>
							{isEditing ? 'Actualizar' : 'Crear'}
						</Button>
					</div>

					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog >
	)
}

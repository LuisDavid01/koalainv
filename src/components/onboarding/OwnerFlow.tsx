import { useState, useReducer } from 'react'
import { cn } from '@/lib/utils'
import { useForm } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { OnboardingStepper } from './OnboardingStepper'
import * as z from 'zod'
import { toast } from 'sonner'
import { Link } from '@tanstack/react-router'
import { createUserOrganization } from '@/server/actions/organization.functions'
import { useOrganization } from '@/contexts/OrganizationContext'

type Stage = 'organization' | 'payment' | 'welcome'
type StageState = { stage: Stage; orgName: string }

function stageReducer(state: StageState, action: { type: 'NEXT' | 'SET_ORG'; payload?: string }): StageState {
	switch (action.type) {
		case 'SET_ORG':
			return { ...state, orgName: action.payload || '' }
		case 'NEXT':
			if (state.stage === 'organization') return { ...state, stage: 'payment' }
			if (state.stage === 'payment') return { ...state, stage: 'welcome' }
			return state
		default:
			return state
	}
}

const orgSchema = z.object({
	orgName: z
		.string()
		.min(2, 'El nombre debe tener al menos 2 caracteres.')
		.max(50, 'El nombre debe tener máximo 50 caracteres.'),
})

export function OwnerFlow() {
	const [state, dispatch] = useReducer(stageReducer, {
		stage: 'organization',
		orgName: '',
	})

	const currentStep = state.stage === 'organization' ? 0 : state.stage === 'payment' ? 1 : 2

	if (state.stage === 'welcome') {
		return (
			<div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
				<div className="space-y-2 text-center">
					<p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
						Bienvenido
					</p>
				</div>

				<div className="space-y-6 text-center">
					<h2 className="text-3xl font-bold tracking-tight">
						Tu organización<br />está lista
					</h2>
					<p className="text-muted-foreground">
						{state.orgName && <span className="font-medium text-foreground">{state.orgName}</span>}
					</p>
				</div>

				<Button className="w-full">
					<Link to="/dashboard">Ir al Dashboard</Link>
				</Button>

				<p className="text-xs text-muted-foreground text-center">
					Explora tu inventario, agrega productos y gestiona tu negocio.
				</p>
			</div>
		)
	}

	if (state.stage === 'payment') {
		const { setCurrentOrganization } = useOrganization()
		const queryClient = useQueryClient()

		return (
			<div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
				<OnboardingStepper currentStep={currentStep} />

				<div className="space-y-2 text-center">
					<p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
						Configuración
					</p>
				</div>

				<div className="space-y-4 rounded-lg border p-4">
					<h3 className="font-semibold">Resumen</h3>
					<div className="space-y-2 text-sm text-muted-foreground">
						<div className="flex justify-between">
							<span>Organización</span>
							<span className="font-medium text-foreground">{state.orgName}</span>
						</div>
						<div className="flex justify-between">
							<span>Plan</span>
							<span className="font-medium text-foreground">Básico</span>
						</div>
					</div>
				</div>

				<Button
					className="w-full"
					onClick={async () => {
						await createUserOrganization({ data: { name: state.orgName } })
						await queryClient.invalidateQueries({ queryKey: ['user-organizations'] })
						const orgs = queryClient.getQueryData<any[]>(['user-organizations'])
						if (orgs && orgs.length > 0) {
							setCurrentOrganization(orgs[0].organizationId)
						}
						toast.info('Redirigiendo...')
						dispatch({ type: 'NEXT' })
					}}
				>
					Continuar
				</Button>

				<p className="text-xs text-muted-foreground text-center">
					Puedes cambiar tu plan en cualquier momento.
				</p>
			</div>
		)
	}

	return (
		<div className="w-full max-w-sm space-y-8 animate-in fade-in duration-500">
			<OnboardingStepper currentStep={currentStep} />

			<OrganizationForm
				onSubmit={(name) => {
					dispatch({ type: 'SET_ORG', payload: name })
					dispatch({ type: 'NEXT' })
				}}
			/>
		</div>
	)
}

function OrganizationForm({ onSubmit }: { onSubmit: (name: string) => void }) {
	const form = useForm({
		defaultValues: {
			orgName: '',
		},
		validators: {
			onSubmit: orgSchema,
		},
		onSubmit: async ({ value }) => {
			await new Promise((resolve) => setTimeout(resolve, 300))
			onSubmit(value.orgName)
		},
	})

	return (
		<form
			className="space-y-6"
			onSubmit={(e) => {
				e.preventDefault()
				form.handleSubmit()
			}}
		>
			<div className="space-y-2 text-center">
				<p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
					Crea tu organización
				</p>
			</div>

			<FieldGroup>
				<form.Field
					name="orgName"
					children={(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Nombre de la organización</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="Mi Empresa"
									className="text-center"
									aria-invalid={isInvalid}
								/>
								{isInvalid && (
									<FieldError errors={field.state.meta.errors} />
								)}
							</Field>
						)
					}}
				/>

				<Field>
					<Button type="submit" className="w-full">
						Continuar
					</Button>
				</Field>
			</FieldGroup>
		</form>
	)
}

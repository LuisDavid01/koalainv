
import { cn } from "@/lib/utils"
import { useForm } from "@tanstack/react-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import * as z from "zod"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { redirect } from "@tanstack/react-router"

const formSchema = z.object({
	newPassword: z
		.string()
		.min(8, "Password must be at least 8 characters.")
		.max(32, "Password must be at most 32 characters."),
	passwordConfirm: z
		.string()
		.min(8, "Password must be at least 8 characters.")
		.max(32, "Password must be at most 32 characters."),

}).refine(
	(data) => data.newPassword === data.passwordConfirm, {
	message: "Las contraseñas no coinciden",
	path: ["passwordConfirm"],
})

export function ResetPasswordForm({
	className,
	...props
}: React.ComponentProps<"div">) {



	const form = useForm({
		defaultValues: {
			newPassword: "",
			passwordConfirm: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			const token = new URLSearchParams(window.location.search).get("token");

			if (!token) {
				toast.error("sesion expirada")
				return;
			}

			await authClient.resetPassword({
				newPassword: value.newPassword,
				token,
			},
				{
					onSuccess: () => {
						toast.success("Contraseña cambiada")
						redirect({
							to: "/login"
						})
					},
					onError: (ctx) => {
						if (ctx.error.status === 403) {
							toast.error("Porfavor, verifique su correo")
							return
						}
						toast.error(ctx.error.message)
					},
				}

			);

		},
	})


	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card className="overflow-hidden p-0">
				<CardContent className="">
					<form className="p-8 md:p-16"
						id="resetPassword-form"
						onSubmit={(e) => {
							e.preventDefault()
							form.handleSubmit()
						}}
					>
						<FieldGroup>
							<div className="flex flex-col items-center text-center">
								<h1 className="text-2xl font-bold">Restablecer contraseña de KoalaInv</h1>
							</div>

							<form.Field
								name="newPassword"
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Nueva contraseña</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												autoComplete="new-password"
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="enter the new newPassword"
												className=""
												aria-invalid={isInvalid}
												type="password"
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									)
								}}
							/>

							<form.Field
								name="passwordConfirm"
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Confirmar contraseña</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="confirme la contraseña"
												className=""
												aria-invalid={isInvalid}
												type="password"
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									)
								}}
							/>


							<Field>
								<Button type="submit">Restablecer contraseña</Button>
							</Field>
						</FieldGroup>
					</form>

				</CardContent>
			</Card>
			<FieldDescription className="px-6 text-center">
				By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
				and <a href="#">Privacy Policy</a>.
			</FieldDescription>
		</div>
	)
}

import CleanNavbar from '@/components/landing/CleanNavbar'
import { ResetPasswordForm } from '@/components/resetPassword-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/resetPassword')({
  component: RouteComponent,
})

function RouteComponent() {
	return (
		<>
		<CleanNavbar />
		<div className="flex flex-col items-center justify-center h-screen bg-background">
			<ResetPasswordForm />
		</div>
		</>

	)

}

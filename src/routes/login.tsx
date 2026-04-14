import CleanNavbar from '@/components/landing/CleanNavbar'
import { LoginForm } from '@/components/login-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<>
		<CleanNavbar />
		<div className="flex flex-col items-center justify-center h-screen bg-background">
			<LoginForm />
		</div>
		</>

	)
}

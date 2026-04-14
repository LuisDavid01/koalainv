import CleanNavbar from '@/components/landing/CleanNavbar'
import { SigninForm } from '@/components/signin-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<>
			<CleanNavbar />
			<div className="flex flex-col items-center justify-center h-screen bg-background">
				<SigninForm />
			</div>
		</>

	)
}

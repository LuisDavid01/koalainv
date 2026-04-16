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
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <LoginForm />
      </div>
    </>
  )
}

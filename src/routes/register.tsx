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
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <SigninForm />
      </div>
    </>
  )
}

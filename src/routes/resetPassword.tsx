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
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <ResetPasswordForm />
      </div>
    </>
  )
}

import { createFileRoute, redirect } from '@tanstack/react-router'
import { useOrganization } from '@/contexts/OrganizationContext'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/select-organization')({
  component: RouteComponent,
})

function RouteComponent() {
  const { organizations, currentOrganizationId, setCurrentOrganization, isLoading } = useOrganization()

  useEffect(() => {
    if (!isLoading && currentOrganizationId) {
      window.location.href = '/dashboard'
    }
  }, [isLoading, currentOrganizationId])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (organizations.length <= 1) {
    if (!currentOrganizationId && organizations.length === 1) {
      setCurrentOrganization(organizations[0].organizationId)
    }
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Selecciona una organización</h1>
          <p className="mt-2 text-muted-foreground">
            Elige la organización con la que deseas trabajar
          </p>
        </div>

        <div className="space-y-4">
          {organizations.map((org) => (
            <button
              key={org.organizationId}
              onClick={() => setCurrentOrganization(org.organizationId)}
              className="flex w-full items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted"
            >
              <div className="text-left">
                <div className="font-medium">{org.organizationName}</div>
                <div className="text-sm text-muted-foreground">{org.role}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
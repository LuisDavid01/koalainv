import { createContext, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { authClient } from '@/lib/auth-client'
import { getUserOrg } from '@/server/actions/organization.functions'

export type OrganizationContextType = {
  organizationId: number | null
  organizationName: string | null
  role: string | null
  isLoading: boolean
}

export const OrganizationContext = createContext<OrganizationContextType>({
  organizationId: null,
  organizationName: null,
  role: null,
  isLoading: true,
})

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const { data: session, } = authClient.useSession()

  const { data: userOrg, isLoading: isOrgLoading } = useQuery({
    queryKey: ['user-org'],
    queryFn: () => getUserOrg(),
    enabled: !!session,
  })

  const isLoading = isOrgLoading

  const value: OrganizationContextType = {
    organizationId: userOrg?.organizationId ?? null,
    organizationName: userOrg?.organizationName ?? null,
    role: userOrg?.role ?? null,
    isLoading,
  }

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  )
}

export function useOrganization() {
  const context = useContext(OrganizationContext)
  if (!context) {
    throw new Error('useOrganization must be used within OrganizationProvider')
  }
  return context
}

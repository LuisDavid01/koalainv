import { createContext, useContext, useState, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { authClient } from '@/lib/auth-client'
import { getUserOrganizations } from '@/server/actions/organization.functions'

export type Organization = {
  organizationId: number
  organizationName: string
  role: string
}

export type OrganizationContextType = {
  organizations: Organization[]
  currentOrganizationId: number | null
  setCurrentOrganization: (id: number) => void
  isLoading: boolean
  isAuthenticated: boolean
}

export const OrganizationContext = createContext<OrganizationContextType>({
  organizations: [],
  currentOrganizationId: null,
  setCurrentOrganization: () => {},
  isLoading: true,
  isAuthenticated: false,
})

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const [currentOrganizationId, setCurrentOrganizationId] = useState<number | null>(null)
  const queryClient = useQueryClient()

  const { data: session } = authClient.useSession()

  const { data: organizations = [], isLoading: isOrgsLoading } = useQuery({
    queryKey: ['user-organizations'],
    queryFn: () => getUserOrganizations(),
    enabled: !!session,
  })

  const isLoading =  isOrgsLoading
  const isAuthenticated = !!session

  useEffect(() => {
    if (!isLoading && organizations.length > 0 && currentOrganizationId === null) {
      setCurrentOrganizationId(organizations[0].organizationId)
    }
  }, [isLoading, organizations, currentOrganizationId])

  const setCurrentOrganization = (id: number) => {
    setCurrentOrganizationId(id)
    queryClient.invalidateQueries({ queryKey: ['productos'] })
    queryClient.invalidateQueries({ queryKey: ['inventarios'] })
  }

  const value: OrganizationContextType = {
    organizations,
    currentOrganizationId,
    setCurrentOrganization,
    isLoading,
    isAuthenticated,
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

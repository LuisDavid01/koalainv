import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/facturas/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/facturas/"!</div>
}

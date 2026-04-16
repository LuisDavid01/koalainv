import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/auditoria/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/Auditoria/"!</div>
}

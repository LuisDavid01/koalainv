import { createServerFn } from '@tanstack/react-start'
import { QUERIES } from '../queries.server'


type OrganizationMember = {
	id: number
	name: string
	role: string
}
export const getUserOrg = createServerFn({ method: 'GET' })
  .handler(async () => {
    return await QUERIES.getUserOrg()
  })



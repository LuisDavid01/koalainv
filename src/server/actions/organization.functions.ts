import { createServerFn } from '@tanstack/react-start'
import { QUERIES } from '../queries.server'
import { MUTATIONS } from '../mutations.server'


type OrganizationMember = {
	id: number
	name: string
	role: string
}
export const getUserOrg = createServerFn({ method: 'GET' })
	.handler(async () => {
		return await QUERIES.getUserOrg()
	})

export const createUserOrganization = createServerFn({ method: 'POST' })
	.inputValidator((data: { name: string }) => data)
	.handler(async ({ data }) => {
		return await MUTATIONS.createOrganization(data.name)
	})



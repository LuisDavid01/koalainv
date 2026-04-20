import { createServerFn } from "@tanstack/react-start"
import { QUERIES } from "../queries.server"
import { MUTATIONS } from "../mutations.server"

export const getInventarios = createServerFn({ method: 'GET' })
	.inputValidator((data: { id: number }) => data)
	.handler(async ({ data }) => {
		const inventarios = await QUERIES.getInventarioByOrgId(data.id)
		return inventarios
	})

export const createInventario = createServerFn({ method: 'POST' })
	.inputValidator((data: { name: string, organizationId: number }) => data)
	.handler(async ({ data }) => {
		return await MUTATIONS.createInventario(data.name, data.organizationId)
	})

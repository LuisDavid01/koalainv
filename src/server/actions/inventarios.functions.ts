import { createServerFn } from "@tanstack/react-start"
import { QUERIES } from "../queries.server"

export const getInventarios = createServerFn({ method: 'GET' })
	.inputValidator((data: { id: number }) => data)
	.handler(async ({ data }) => {
		const inventarios = await QUERIES.getInventarioByOrgId(data.id)
		return inventarios
	})

import { eq, like, and, gte, lte, sql, desc, asc, ilike } from 'drizzle-orm'
import { db } from './db'
import {
	inventoryTable,
	productTable,
	inventoryProductTable,
	categoryTable,
	organizationMember,
	organizationTable,
} from './db/schema'
import type { INVENTORY_TYPE, PRODUCT_TYPE } from './db/schema'
import { auth } from '@/lib/auth'
import {
	getRequest,
} from '@tanstack/react-start/server'
import { isCurrentUserOrgMember } from './roles.server'

export type ProductoWithStock = {
	id: number
	name: string
	price: number
	description: string
	active: boolean
	inventoryId: number
	stock: number
	categoryId: number
	categoryName?: string
	organizationId?: number
	organizationName?: string
	createdAt?: string
	updatedAt?: string
}

export type ProductoFilters = {
	inventoryId?: number
	organizationId?: number
	page?: number
	limit?: number
	search?: string
	categoria?: string
	estadoStock?: string
	precioMin?: number
	precioMax?: number
	sortBy?: string
	sortOrder?: 'asc' | 'desc'
}



export const QUERIES = {
	getProductosByInventoryId:
		async function(filters: ProductoFilters = {}) {
			try {
				const {
					inventoryId,
					page = 1,
					limit = 10,
					search,
					categoria,
					estadoStock,
					precioMin,
					precioMax,
					sortOrder = 'desc',
				} = filters

				const baseConditions: any[] = [
					eq(inventoryProductTable.active, true)
				]

				if (inventoryId) {
					baseConditions.push(eq(inventoryProductTable.inventoryId, inventoryId))
				}

				if (search) {
					baseConditions.push(ilike(productTable.name, `%${search}%`))
				}


				if (estadoStock) {
					if (estadoStock === 'Sin stock') {
						baseConditions.push(eq(inventoryProductTable.quantity, 0))
					} else if (estadoStock === 'Stock bajo') {
						baseConditions.push(and(
							gte(inventoryProductTable.quantity, 1),
							lte(inventoryProductTable.quantity, 10)
						))
					} else if (estadoStock === 'En stock') {
						baseConditions.push(gte(inventoryProductTable.quantity, 11))
					}
				}

				if (precioMin !== undefined) {
					baseConditions.push(gte(productTable.price, precioMin))
				}

				if (precioMax !== undefined) {
					baseConditions.push(lte(productTable.price, precioMax))
				}

				const offset = (page - 1) * limit

				let total: number = 0

				const [result] = await db
					.select({ 
						count: sql<number>`count(*)`,

					})
					.from(inventoryProductTable)
					.innerJoin(productTable, eq(inventoryProductTable.productId, productTable.id))
					.innerJoin(categoryTable, eq(productTable.categoryId, categoryTable.id))
					.where(and(...baseConditions))


				total = result.count ?? 0

				const productos = await db
					.select({
						id: productTable.id,
						name: productTable.name,
						price: productTable.price,
						description: productTable.description,
						active: productTable.active,
						inventoryId: inventoryTable.id,
						stock: inventoryProductTable.quantity,
						categoryId: categoryTable.id,
						categoryName: categoryTable.name,
					})
					.from(productTable)
					.innerJoin(inventoryProductTable, eq(inventoryProductTable.productId, productTable.id))
					.innerJoin(inventoryTable, eq(inventoryTable.id, inventoryProductTable.inventoryId))
					.innerJoin(categoryTable, eq(productTable.categoryId, categoryTable.id))
					.where(and(...baseConditions))
					.offset(offset)
					.limit(limit)

				const totalPages = Math.ceil(total / limit)

				return {
					data: productos,
					total,
					page,
					limit,
					totalPages,
				}
			} catch (error) {
				throw new Error(error as string)
			}
		},

	getProductoById: async function(id: number): Promise<PRODUCT_TYPE | null> {
		const [producto] = await db
			.select()
			.from(productTable)
			.where(and(eq(productTable.id, id), eq(productTable.active, true)))

		return producto ?? null
	},

	getInventarioByOrgId: async function(id: number): Promise<INVENTORY_TYPE[]> {


		const inventory = await db
			.select()
			.from(inventoryTable)
			.where(
				and(
					eq(inventoryTable.organizationId, id),
					eq(inventoryTable.active, true),
				),
			)

		return inventory ?? []
	},
	getUserOrganizations: async function() {
		const request = getRequest()

		const user = await auth.api.getSession({
			headers: request.headers,
		})

		if (!user?.session.id) {
			throw new Error('No session found')
		}

		const results = await db
			.select({
				organizationId: organizationTable.id,
				organizationName: organizationTable.name,
				role: organizationMember.role,
			})
			.from(organizationMember)
			.innerJoin(organizationTable, eq(organizationMember.organizationId, organizationTable.id))
			.where(and(
				eq(organizationMember.userId, user.user.id),
				eq(organizationMember.active, true)
			))

		return results

	},
	getUserOrg: async function() {
		const request = getRequest()

		const user = await auth.api.getSession({
			headers: request.headers,
		})

		if (!user?.session.id) {
			throw new Error('No session found')
		}

		const [result] = await db
			.select({
				organizationId: organizationTable.id,
				organizationName: organizationTable.name,
				role: organizationMember.role,
			})
			.from(organizationMember)
			.innerJoin(organizationTable, eq(organizationMember.organizationId, organizationTable.id))
			.where(eq(organizationMember.userId, user?.user.id))

		console.log(result)

		return result

	}
}

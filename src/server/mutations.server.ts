import { and, eq } from 'drizzle-orm'
import { db } from './db'
import { inventoryProductTable, inventoryTable, productTable, type INSERT_PRODUCT_TYPE, type PRODUCT_TYPE, type INVENTORY_TYPE, organizationTable, organizationMember, user } from './db/schema'
import type { ProductoWithStock } from './queries.server'
import { auth } from '@/lib/auth'
import {
	getRequest,
} from '@tanstack/react-start/server'

export const MUTATIONS = {
	createInventario: async function(name: string, organizationId: number): Promise<INVENTORY_TYPE> {
		const [inventario] = await db
			.insert(inventoryTable)
			.values({
				name,
				organizationId,
				active: true,
			})
			.returning()
		return inventario
	},

	createProducto: async function(data: ProductoWithStock) {
		try {
			const [producto] = await db
				.insert(productTable)
				.values({
					organizationId: 1,
					name: data.name,
					description: data.description,
					price: data.price,
					categoryId: data.categoryId,
				})
				.returning()

			console.log("id del producto", producto.id)
			console.log("id del inventario", data.inventoryId)

			const [inventoryProduct] = await db
				.insert(inventoryProductTable)
				.values({
					inventoryId: data.inventoryId,
					productId: producto.id,
					quantity: data.stock,
				}).returning()
			return inventoryProduct
		} catch (error) {
			console.log(error)
			throw new Error(error as string)
		}
	},

	updateProducto: async function(
		id: number,
		data: ProductoWithStock,
	) {
		const updateData: Record<string, unknown> = {}
		if (data.name) updateData.name = data.name
		if (data.description) updateData.description = data.description
		if (data.price) updateData.price = data.price
		if (data.categoryId) updateData.categoryId = data.categoryId

		const updateDataInv: Record<string, unknown> = {}
		if (data.stock) updateDataInv.quantity = data.stock
		if (data.active) updateDataInv.active = data.active
		console.log("updateDataInv", updateDataInv)
		console.log("updateData", updateData)
		try {
			await db
				.update(productTable)
				.set(updateData)
				.where(eq(productTable.id, id))
			await db
				.update(inventoryProductTable)
				.set(updateDataInv)
				.where(and(eq(inventoryProductTable.productId, id),
					eq(inventoryProductTable.inventoryId, data.inventoryId)))

			return true
		} catch (error) {
			console.log(error)
			throw new Error(error as string)

		}
	},

	softDeleteProductoInInventory: async function(idProducto: number, idInventario: number) {
		console.log("idProducto", idProducto)
		console.log("idInventario", idInventario)
		const [producto] = await db
			.update(inventoryProductTable)
			.set({ active: false })
			.where(
				and(
					eq(inventoryProductTable.productId, idProducto),
					eq(inventoryProductTable.inventoryId, idInventario)))
			.returning()
		return !!producto
	},

	createOrganization: async function(name: string) {
		const req = getRequest() 
		const currUser = await auth.api.getSession({ headers: req.headers })

		if (!currUser?.session.id) {
			throw new Error('No session found')
		}


		const result = await db
			.insert(organizationTable)
			.values({
				name,
				active: true,
			})
			.returning()
		await db
		.insert(organizationMember)
		.values({
			organizationId: result[0].id,
			userId: currUser?.user.id,
			role: 'owner',
			active: true,
		})
		console.log("organizacion creada ", name)

		await db.update(user)
		.set({
			isOnboarded: true,
		})
		.where(eq(user.id, currUser?.user.id))
		console.log("current user onboarded")
		return true
	},
}

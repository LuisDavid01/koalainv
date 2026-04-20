import { and, eq } from 'drizzle-orm'
import { db } from './db'
import { inventoryProductTable, inventoryTable, productTable, type INSERT_PRODUCT_TYPE, type PRODUCT_TYPE, type INVENTORY_TYPE } from './db/schema'
import type { ProductoWithStock } from './queries.server'

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
}

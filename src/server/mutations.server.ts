import { eq } from 'drizzle-orm'
import { db } from './db'
import { productTable, type INSERT_PRODUCT_TYPE, type PRODUCT_TYPE } from './db/schema'

export const MUTATIONS = {
  createProducto: async function (data:INSERT_PRODUCT_TYPE) {
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
    return producto
  },

  updateProducto: async function (
    id: number,
    data: {
      name?: string
      description?: string
      price?: number
      categoryId?: number
    },
  ) {
	  const updateData: Record<string, unknown> = {}
	  if (data.name) updateData.name = data.name
	  if (data.description) updateData.description = data.description
	  if (data.price) updateData.price = data.price
	  if (data.categoryId) updateData.categoryId = data.categoryId
	try {
    const [producto] = await db
      .update(productTable)
      .set(updateData)
      .where(eq(productTable.id, id))
      .returning()
    return producto
	} catch (error) {
		console.log(error)

	}
  },

  softDeleteProducto: async function (id: number) {
    const [producto] = await db
      .update(productTable)
      .set({ active: false })
      .where(eq(productTable.id, id))
      .returning()
    return !!producto
  },
}

import { eq } from 'drizzle-orm'
import { db } from './db'
import { productTable } from './db/schema'

export const MUTATIONS = {
  createProducto: async function (data: {
    name: string
    description: string
    price: number
    categoryId?: number
  }) {
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
    const [producto] = await db
      .update(productTable)
      .set(data)
      .where(eq(productTable.id, id))
      .returning()
    return producto
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

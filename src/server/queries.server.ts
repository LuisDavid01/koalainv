import { eq, like, and, gte, lte, sql, desc, asc } from 'drizzle-orm'
import { db } from './db'
import { productTable } from './db/schema'
import type { PRODUCT_TYPE } from './db/schema'

export type ProductoFilters = {
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

export type PaginatedResult<T> = {
  data: T[]
  total: number
  page: number
  totalPages: number
}

export const QUERIES = {
  getProductos: async function (
    filters: ProductoFilters = {},
  ): Promise<PaginatedResult<PRODUCT_TYPE>> {
    const {
      page = 1,
      limit = 10,
      search,
      estadoStock,
      precioMin,
      precioMax,
      sortOrder = 'desc',
    } = filters

    const conditions = [eq(productTable.active, true)]

    if (search) {
      conditions.push(like(productTable.name, `%${search}%`))
    }

    if (precioMin !== undefined) {
      conditions.push(gte(productTable.price, precioMin))
    }

    if (precioMax !== undefined) {
      conditions.push(lte(productTable.price, precioMax))
    }

    const offset = (page - 1) * limit

    const [countResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(productTable)
      .where(and(...conditions))

    const total = countResult?.count
    const totalPages = Math.ceil(total / limit)

    let productos
    if (sortOrder === 'asc') {
      productos = await db
        .select()
        .from(productTable)
        .where(and(...conditions))
        .orderBy(asc(productTable.id))
        .limit(limit)
        .offset(offset)
    } else {
      productos = await db
        .select()
        .from(productTable)
        .where(and(...conditions))
        .orderBy(desc(productTable.id))
        .limit(limit)
        .offset(offset)
    }

    return {
      data: productos,
      total,
      page,
      totalPages,
    }
  },

  getProductoById: async function (id: number): Promise<PRODUCT_TYPE | null> {
    const [producto] = await db
      .select()
      .from(productTable)
      .where(and(eq(productTable.id, id), eq(productTable.active, true)))

    return producto ?? null
  },
}

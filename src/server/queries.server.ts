import { eq, like, and, gte, lte, sql, desc, asc } from 'drizzle-orm'
import { db } from './db'
import {
  inventoryTable,
  productTable,
  inventoryProductTable,
} from './db/schema'
import type { INVENTORY_TYPE, PRODUCT_TYPE } from './db/schema'

export type ProductoFilters = {
  inventoryId?: number
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
      inventoryId,
      page = 1,
      limit = 10,
      search,
      estadoStock,
      precioMin,
      precioMax,
      sortOrder = 'desc',
    } = filters

    const baseConditions = [eq(productTable.active, true)]

    if (search) {
      baseConditions.push(like(productTable.name, `%${search}%`))
    }

    if (precioMin !== undefined) {
      baseConditions.push(gte(productTable.price, precioMin))
    }

    if (precioMax !== undefined) {
      baseConditions.push(lte(productTable.price, precioMax))
    }

    const offset = (page - 1) * limit

    let total: number = 0

    if (inventoryId) {
      const [countResult] = await db
        .select({ count: sql<number>`count(*)` })
        .from(productTable)
        .innerJoin(
          inventoryProductTable,
          eq(inventoryProductTable.productId, productTable.id),
        )
        .where(
          and(
            ...baseConditions,
            eq(inventoryProductTable.inventoryId, inventoryId),
          ),
        )

      total = countResult?.count ?? 0
    } else {
      const [countResult] = await db
        .select({ count: sql<number>`count(*)` })
        .from(productTable)
        .where(and(...baseConditions))

      total = countResult?.count ?? 0
    }

    const totalPages = Math.ceil(total / limit)

    let productos

    if (inventoryId) {
      if (sortOrder === 'asc') {
        productos = await db
          .select({
            id: productTable.id,
            organizationId: productTable.organizationId,
            name: productTable.name,
            description: productTable.description,
            price: productTable.price,
            categoryId: productTable.categoryId,
            active: productTable.active,
            createdAt: productTable.createdAt,
            updatedAt: productTable.updatedAt,
          })
          .from(productTable)
          .innerJoin(
            inventoryProductTable,
            eq(inventoryProductTable.productId, productTable.id),
          )
          .where(
            and(
              ...baseConditions,
              eq(inventoryProductTable.inventoryId, inventoryId),
            ),
          )
          .orderBy(asc(productTable.id))
          .limit(limit)
          .offset(offset)
      } else {
        productos = await db
          .select({
            id: productTable.id,
            organizationId: productTable.organizationId,
            name: productTable.name,
            description: productTable.description,
            price: productTable.price,
            categoryId: productTable.categoryId,
            active: productTable.active,
            createdAt: productTable.createdAt,
            updatedAt: productTable.updatedAt,
          })
          .from(productTable)
          .innerJoin(
            inventoryProductTable,
            eq(inventoryProductTable.productId, productTable.id),
          )
          .where(
            and(
              ...baseConditions,
              eq(inventoryProductTable.inventoryId, inventoryId),
            ),
          )
          .orderBy(desc(productTable.id))
          .limit(limit)
          .offset(offset)
      }
    } else {
      if (sortOrder === 'asc') {
        productos = await db
          .select()
          .from(productTable)
          .where(and(...baseConditions))
          .orderBy(asc(productTable.id))
          .limit(limit)
          .offset(offset)
      } else {
        productos = await db
          .select()
          .from(productTable)
          .where(and(...baseConditions))
          .orderBy(desc(productTable.id))
          .limit(limit)
          .offset(offset)
      }
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

  getInventarioByOrgId: async function (id: number): Promise<INVENTORY_TYPE[]> {
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
}

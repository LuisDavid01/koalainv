import { createServerFn } from '@tanstack/react-start'
import { QUERIES } from '../queries.server'
import { MUTATIONS } from '../mutations.server'
import type { INSERT_PRODUCT_TYPE, PRODUCT_TYPE } from '../db/schema'
import type { ProductoFilters } from '../queries.server'

export const getProductos = createServerFn({ method: 'GET' })
  .inputValidator((data: ProductoFilters) => data)
  .handler(async ({ data }) => {
    return await QUERIES.getProductos(data)
  })

export const getProducto = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    return await QUERIES.getProductoById(data.id)
  })

export const createProducto = createServerFn({ method: 'POST' })
  .inputValidator((data: INSERT_PRODUCT_TYPE) => data)
  .handler(async ({ data }) => {
    console.log('creando producto')
    return await MUTATIONS.createProducto(data)
  })

export const updateProducto = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: {
      id: number
      name?: string
      description?: string
      price?: number
      categoryId?: number
    }) => data,
  )
  .handler(async ({ data }) => {
    console.log(data.id)
    return await MUTATIONS.updateProducto(data.id, data)
  })

export const deleteProducto = createServerFn({ method: 'POST' })
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    return await MUTATIONS.softDeleteProducto(data.id)
  })

import { createServerFn } from '@tanstack/react-start'
import { QUERIES } from '../queries.server'
import { MUTATIONS } from '../mutations.server'
import type { ProductoFilters, ProductoWithStock } from '../queries.server'

export const getProductos = createServerFn({ method: 'GET' })
  .inputValidator((data: ProductoFilters) => data)
  .handler(async ({ data }) => {
    return await QUERIES.getProductosByInventoryId(data)
  })

export const getProducto = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    return await QUERIES.getProductoById(data.id)
  })

export const createProducto = createServerFn({ method: 'POST' })
  .inputValidator((data: ProductoWithStock) => data)
  .handler(async ({ data }) => {
    console.log('creando producto')
    return await MUTATIONS.createProducto(data)
  })

export const updateProducto = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: { product: ProductoWithStock, id: number}) => data,
  )
  .handler(async ({ data }) => {
    return await MUTATIONS.updateProducto(data.id, data.product)
  })

export const deleteProducto = createServerFn({ method: 'POST' })
  .inputValidator((data: { idProducto: number, idInventario: number }) => data)
  .handler(async ({ data }) => {
    return await MUTATIONS.softDeleteProductoInInventory(data.idProducto, data.idInventario)
  })

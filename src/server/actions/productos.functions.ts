import { createServerFn } from '@tanstack/react-start'
import { QUERIES } from '../queries.server'
import { MUTATIONS } from '../mutations.server'

export const getProductos = createServerFn({ method: 'GET' }).handler(
  async () => {
    return await QUERIES.getProductos({})
  },
)

export const getProducto = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    return await QUERIES.getProductoById(data.id)
  })

export const createProducto = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: {
      name: string
      description: string
      price: number
      categoryId?: number
    }) => data,
  )
  .handler(async ({ data }) => {
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
    return await MUTATIONS.updateProducto(data.id, data)
  })

export const deleteProducto = createServerFn({ method: 'POST' })
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    return await MUTATIONS.softDeleteProducto(data.id)
  })

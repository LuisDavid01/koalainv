'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import type { PRODUCT_TYPE } from '@/server/db/schema'
import {
  createProducto,
  updateProducto,
} from '@/server/actions/productos.functions'

interface AgregarEditarModalProps {
  producto?: PRODUCT_TYPE | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function AgregarEditarModal({
  producto,
  open,
  onOpenChange,
  onSuccess,
}: AgregarEditarModalProps) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEditing = !!producto

  useEffect(() => {
    if (producto) {
      setForm({
        name: producto.name,
        description: producto.description,
        price: producto.price.toString(),
        categoryId: producto.categoryId?.toString() || '',
      })
    } else {
      setForm({
        name: '',
        description: '',
        price: '',
        categoryId: '',
      })
    }
  }, [producto])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        categoryId: form.categoryId ? Number(form.categoryId) : undefined,
      }

      if (isEditing && producto) {
        await updateProducto({ data: { id: producto.id, ...payload } })
      } else {
        await createProducto({ data: payload })
      }

      onSuccess?.()
      onOpenChange(false)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Producto' : 'Agregar Producto'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del producto</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Nombre del producto"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              placeholder="Descripción del producto"
              className="min-h-[60px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Precio</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ₡
                </span>
                <Input
                  id="price"
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: e.target.value }))
                  }
                  placeholder="0"
                  className="pl-6"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryId">Categoría ID</Label>
              <Input
                id="categoryId"
                type="number"
                value={form.categoryId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, categoryId: e.target.value }))
                }
                placeholder="ID de categoría"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            className="bg-primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

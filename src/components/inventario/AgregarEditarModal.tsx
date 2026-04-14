import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { ImageUploadIcon } from '@hugeicons/core-free-icons'

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type Producto } from './data'

interface AgregarEditarModalProps {
  producto?: Producto | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AgregarEditarModal({
  producto,
  open,
  onOpenChange,
}: AgregarEditarModalProps) {
  const [form, setForm] = useState({
    nombre: producto?.nombre || '',
    sku: producto?.sku || '',
    categoria: producto?.categoria || null,
    marca: producto?.marca || '',
    stock: producto?.stock?.toString() || '',
    precio: producto?.precio?.toString() || '',
    color: producto?.color || '',
    descripcion: producto?.descripcion || '',
  })

  const isEditing = !!producto

  const handleSubmit = () => {
    console.log('Guardar producto:', form)
    onOpenChange(false)
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
            <Label htmlFor="nombre">Nombre del producto</Label>
            <Input
              id="nombre"
              value={form.nombre}
              onChange={(e) =>
                setForm((f) => ({ ...f, nombre: e.target.value }))
              }
              placeholder="Nombre del producto"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              value={form.sku}
              onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))}
              placeholder="Autogenerado si se deja vacío"
            />
            <span className="text-xs text-muted-foreground">
              Dejar vacío para auto-generar
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoría</Label>
              <Select
                value={form.categoria || ''}
                onValueChange={(v) => setForm((f) => ({ ...f, categoria: v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electrónica">Electrónica</SelectItem>
                  <SelectItem value="Accesorios">Accesorios</SelectItem>
                  <SelectItem value="Audio">Audio</SelectItem>
                  <SelectItem value="Almacenamiento">Almacenamiento</SelectItem>
                  <SelectItem value="Ropa">Ropa</SelectItem>
                  <SelectItem value="Alimentos">Alimentos</SelectItem>
                  <SelectItem value="Servicios">Servicios</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="marca">Marca</Label>
              <Input
                id="marca"
                value={form.marca}
                onChange={(e) =>
                  setForm((f) => ({ ...f, marca: e.target.value }))
                }
                placeholder="Marca"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stock">Stock inicial</Label>
              <Input
                id="stock"
                type="number"
                value={form.stock}
                onChange={(e) =>
                  setForm((f) => ({ ...f, stock: e.target.value }))
                }
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="precio">Precio unitario</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ₡
                </span>
                <Input
                  id="precio"
                  type="number"
                  value={form.precio}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, precio: e.target.value }))
                  }
                  placeholder="0"
                  className="pl-6"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <Input
              id="color"
              value={form.color}
              onChange={(e) =>
                setForm((f) => ({ ...f, color: e.target.value }))
              }
              placeholder="Color del producto"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <textarea
              id="descripcion"
              value={form.descripcion}
              onChange={(e) =>
                setForm((f) => ({ ...f, descripcion: e.target.value }))
              }
              placeholder="Descripción opcional..."
              className="min-h-[60px] w-full rounded-lg border border-transparent bg-input/50 px-3 py-2 text-sm outline-none focus-visible:border-ring"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Imagen</Label>
            <div className="flex h-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-4 text-center hover:border-primary/50">
              <HugeiconsIcon
                icon={ImageUploadIcon}
                size={24}
                strokeWidth={1.5}
                className="text-muted-foreground"
              />
              <span className="mt-1 text-xs text-muted-foreground">
                Arrastra una imagen o haz click
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-primary" onClick={handleSubmit}>
            Guardar Producto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

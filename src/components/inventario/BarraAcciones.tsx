import { useState, type Dispatch, type SetStateAction } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Search01Icon,
  FilterHorizontalIcon,
  Download04Icon,
  Upload04Icon,
  Delete02Icon,
  ArrowDown01Icon,
  Cancel01Icon,
} from '@hugeicons/core-free-icons'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Filtros {
  categoria: string | null
  estadoStock: string | null
  precioMin: string
  precioMax: string
}

interface BarraAccionesProps {
  search: string
  onSearchChange: (value: string) => void
  filtros: Filtros
  onFiltrosChange: (filtros: Filtros) => void
}

export function BarraAcciones({
  search,
  onSearchChange,
  filtros,
  onFiltrosChange,
}: BarraAccionesProps) {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [localFiltros, setLocalFiltros] = useState<Filtros>(filtros)

  const handleApplyFilters = () => {
    onFiltrosChange(localFiltros)
    setFiltersOpen(false)
  }

  const handleClearFilters = () => {
    const empty: Filtros = {
      categoria: 'Todos',
      estadoStock: 'Todos',
      precioMin: '',
      precioMax: '',
    }
    setLocalFiltros(empty)
    onFiltrosChange(empty)
    setFiltersOpen(false)
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="relative flex-1 max-w-64">
        <HugeiconsIcon
          icon={Search01Icon}
          size={16}
          strokeWidth={1.5}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          placeholder="Buscar productos…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-8"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={16} strokeWidth={1.5} />
          </button>
        )}
      </div>

      <div className="flex gap-2">
        <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
          <PopoverTrigger className={"inline-flex items-center"}>
              <HugeiconsIcon
                icon={FilterHorizontalIcon}
                size={16}
                strokeWidth={1.5}
                className="mr-1"
              />
              Filtrar
          </PopoverTrigger>
          <PopoverContent className="w-72" align="end">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Filtrar productos</span>
              <button
                onClick={handleClearFilters}
                className="text-xs text-primary hover:underline"
              >
                Limpiar
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground">Categoría</span>
                <Select
                  value={localFiltros.categoria}
                  onValueChange={(v) =>
                    setLocalFiltros((p) => ({ ...p, categoria: v }))
                  }
                >
                  <SelectTrigger size="sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="Electrónica">Electrónica</SelectItem>
                    <SelectItem value="Accesorios">Accesorios</SelectItem>
                    <SelectItem value="Audio">Audio</SelectItem>
                    <SelectItem value="Almacenamiento">
                      Almacenamiento
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground">
                  Estado de stock
                </span>
                <Select
                  value={localFiltros.estadoStock}
                  onValueChange={(v) =>
                    setLocalFiltros((p) => ({ ...p, estadoStock: v }))
                  }
                >
                  <SelectTrigger size="sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="En stock">En stock</SelectItem>
                    <SelectItem value="Stock bajo">Stock bajo</SelectItem>
                    <SelectItem value="Sin stock">Sin stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground">
                  Rango de precio
                </span>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <span className="text-xs text-muted-foreground">Min</span>
                    <Input
                      type="number"
                      className="h-8"
                      value={localFiltros.precioMin}
                      onChange={(e) =>
                        setLocalFiltros((p) => ({
                          ...p,
                          precioMin: e.target.value,
                        }))
                      }
                      placeholder="0"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-muted-foreground">Max</span>
                    <Input
                      type="number"
                      value={localFiltros.precioMax}
                      onChange={(e) =>
                        setLocalFiltros((p) => ({
                          ...p,
                          precioMax: e.target.value,
                        }))
                      }
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button
              onClick={handleApplyFilters}
              className="mt-4 w-full bg-primary"
            >
              Aplicar filtros
            </Button>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger className={"inline-flex items-center"}>
              Acciones
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                size={16}
                strokeWidth={1.5}
                className="ml-1"
              />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <HugeiconsIcon
                icon={Download04Icon}
                size={16}
                strokeWidth={1.5}
                className="mr-2"
              />
              Exportar CSV
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HugeiconsIcon
                icon={Upload04Icon}
                size={16}
                strokeWidth={1.5}
                className="mr-2"
              />
              Importar CSV
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <HugeiconsIcon
                icon={Delete02Icon}
                size={16}
                strokeWidth={1.5}
                className="mr-2"
              />
              Eliminar seleccionados
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

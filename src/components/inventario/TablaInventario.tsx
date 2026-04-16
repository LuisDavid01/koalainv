import { useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  SortByDown01Icon,
  SortByUp01Icon,
  EyeIcon,
  PencilEdit01Icon,
  Delete02Icon,
} from '@hugeicons/core-free-icons'

import { Checkbox } from '@/components/ui/checkbox'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { ConfirmarEliminar } from './ConfirmarEliminar'
import { VerDetalleSheet } from './VerDetalleSheet'
import { AgregarEditarModal } from './AgregarEditarModal'
import {
  getProductos,
  deleteProducto,
} from '@/server/actions/productos.functions'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { PRODUCT_TYPE } from '@/server/db/schema'

const columnHelper = createColumnHelper<PRODUCT_TYPE>()

interface TablaInventarioProps {
  inventoryId: number
  search: string
  filtros: {
    categoria: string | null
    estadoStock: string | null
    precioMin: string
    precioMax: string
  }
}

export function TablaInventario({
  inventoryId,
  search,
  filtros,
}: TablaInventarioProps) {
  const queryClient = useQueryClient()
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [productoVer, setProductoVer] = useState<PRODUCT_TYPE | null>(null)
  const [productoEditar, setProductoEditar] = useState<PRODUCT_TYPE | null>(
    null,
  )
  const [productoEliminar, setProductoEliminar] = useState<PRODUCT_TYPE | null>(
    null,
  )

  const { data, isLoading } = useQuery({
    queryKey: ['productos', inventoryId, search, filtros],
    queryFn: () =>
      getProductos({
        data: {
          inventoryId,
          search: search || undefined,
          precioMin: filtros.precioMin ? Number(filtros.precioMin) : undefined,
          precioMax: filtros.precioMax ? Number(filtros.precioMax) : undefined,
        },
      }),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteProducto({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] })
      setProductoEliminar(null)
    },
  })

  const productos = data?.data ?? []

  const columns = [
    columnHelper.display({
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      size: 10,
    }),
    columnHelper.accessor('name', {
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 text-xs font-medium uppercase text-muted-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Producto
          <HugeiconsIcon
            icon={
              column.getIsSorted() === 'asc'
                ? SortByDown01Icon
                : column.getIsSorted() === 'desc'
                  ? SortByUp01Icon
                  : SortByDown01Icon
            }
            size={14}
            strokeWidth={1.5}
          />
        </button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="size-9 rounded-lg">
            <AvatarFallback className="bg-muted text-xs">
              {row.original.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium text-foreground">
              {row.original.name}
            </div>
            <div className="text-xs text-muted-foreground">
              {row.original.description}
            </div>
          </div>
        </div>
      ),
      size: 250,
    }),
    columnHelper.accessor('price', {
      header: ({ column }) => (
        <button
          className="flex items-center justify-end gap-1 text-xs font-medium uppercase text-muted-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Precio
          <HugeiconsIcon
            icon={
              column.getIsSorted() === 'asc'
                ? SortByDown01Icon
                : column.getIsSorted() === 'desc'
                  ? SortByUp01Icon
                  : SortByDown01Icon
            }
            size={14}
            strokeWidth={1.5}
          />
        </button>
      ),
      cell: ({ getValue }) => (
        <span className="text-sm font-semibold text-foreground">
          ₡{getValue().toLocaleString('es-CR')}
        </span>
      ),
    }),
    columnHelper.display({
      id: 'acciones',
      header: () => (
        <span className="text-right text-xs font-medium uppercase text-muted-foreground">
          Acciones
        </span>
      ),
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => setProductoVer(row.original)}
          >
            <HugeiconsIcon
              icon={EyeIcon}
              size={16}
              strokeWidth={1.5}
              className="hover:text-primary"
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => setProductoEditar(row.original)}
          >
            <HugeiconsIcon
              icon={PencilEdit01Icon}
              size={16}
              strokeWidth={1.5}
              className="hover:text-primary"
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => setProductoEliminar(row.original)}
          >
            <HugeiconsIcon
              icon={Delete02Icon}
              size={16}
              strokeWidth={1.5}
              className="hover:text-destructive"
            />
          </Button>
        </div>
      ),
      size: 28,
    }),
  ]

  const table = useReactTable({
    data: productos,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => row.id.toString(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  const selectedCount = Object.keys(rowSelection).length
  const totalRows = data?.total ?? 0
  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const totalPages = data?.totalPages ?? 1
  const start = totalRows > 0 ? pageIndex * pageSize + 1 : 0
  const end = Math.min((pageIndex + 1) * pageSize, totalRows)

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    if (totalPages <= 5) {
      for (let i = 0; i < totalPages; i++) pages.push(i)
    } else {
      pages.push(0)
      if (currentPage > 2) pages.push('ellipsis')
      if (currentPage > 1 && currentPage < totalPages)
        pages.push(currentPage - 1)
      if (currentPage !== 1 && currentPage !== totalPages)
        pages.push(currentPage)
      if (currentPage < totalPages - 1) pages.push('ellipsis')
      pages.push(totalPages - 1)
    }
    return pages
  }

  return (
    <>
      <Card className="overflow-hidden rounded-xl border">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <span className="text-xs text-muted-foreground">
            {isLoading
              ? 'Cargando...'
              : `Mostrando ${start}–${end} de ${totalRows} productos`}
          </span>
          {selectedCount > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-primary">
                {selectedCount} seleccionados
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => table.toggleAllPageRowsSelected(false)}
              >
                Deseleccionar todo
              </Button>
            </div>
          )}
        </div>

        <Table>
          <TableHeader className="bg-muted/30">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Cargando productos...
                </TableCell>
              </TableRow>
            ) : productos.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay productos
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="transition-colors hover:bg-muted/40 data-[state=selected]:bg-primary/5"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between border-t px-4 py-3">
          <span className="text-xs text-muted-foreground">
            Mostrando {start}–{end} de {totalRows} productos
          </span>
          <Pagination>
            <PaginationContent>
              <PaginationPrevious
                onClick={() => {
                  table.previousPage()
                  setCurrentPage((c) => c - 1)
                }}
                disabled={!table.getCanPreviousPage()}
              />
              {getPageNumbers().map((page, i) =>
                page === 'ellipsis' ? (
                  <PaginationEllipsis key={`ellipsis-${i}`} />
                ) : (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={currentPage === page + 1}
                      onClick={() => {
                        table.setPageIndex(page)
                        setCurrentPage(page + 1)
                      }}
                    >
                      {page + 1}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
              <PaginationNext
                onClick={() => {
                  table.nextPage()
                  setCurrentPage((c) => c + 1)
                }}
                disabled={!table.getCanNextPage()}
              />
            </PaginationContent>
          </Pagination>
        </div>
      </Card>

      {productoVer && (
        <VerDetalleSheet
          producto={productoVer}
          open={!!productoVer}
          onOpenChange={(open) => !open && setProductoVer(null)}
          onEditar={() => {
            setProductoEditar(productoVer)
            setProductoVer(null)
          }}
          onEliminar={() => {
            setProductoEliminar(productoVer)
            setProductoVer(null)
          }}
        />
      )}

      {productoEditar && (
        <AgregarEditarModal
          producto={productoEditar}
          isEditing={true}
          open={!!productoEditar}
          onOpenChange={(open) => !open && setProductoEditar(null)}
        />
      )}

      {productoEliminar && (
        <ConfirmarEliminar
          producto={productoEliminar}
          open={!!productoEliminar}
          onOpenChange={(open) => !open && setProductoEliminar(null)}
          onConfirm={() => deleteMutation.mutate(productoEliminar.id)}
          isDeleting={deleteMutation.isPending}
        />
      )}
    </>
  )
}

import { useState, useEffect } from 'react'
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
	type SortingState,
	type PaginationState,
} from '@tanstack/react-table'
import { HugeiconsIcon } from '@hugeicons/react'
import {
	SortByDown01Icon,
	SortByUp01Icon,
	EyeIcon,
	PencilEdit01Icon,
	Delete02Icon,
} from '@hugeicons/core-free-icons'

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
import type { ProductoWithStock } from '@/server/queries.server'

const columnHelper = createColumnHelper<ProductoWithStock>()

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
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	})
	const [currentPage, setCurrentPage] = useState(1)
	const [productoVer, setProductoVer] = useState<ProductoWithStock | null>(null)
	const [productoEditar, setProductoEditar] = useState<ProductoWithStock | null>(
		null,
	)
	const [productoEliminar, setProductoEliminar] = useState<ProductoWithStock | null>(
		null,
	)

	const { data, isLoading } = useQuery({
		queryKey: ['productos', inventoryId, search, filtros, pagination],
		queryFn: () => {
			const productos = getProductos({
				data: {
					inventoryId,
					search: search || undefined,
					page: pagination.pageIndex + 1,
					limit: pagination.pageSize,
					categoria: filtros.categoria && filtros.categoria !== 'Todos' ? filtros.categoria : undefined,
					estadoStock: filtros.estadoStock && filtros.estadoStock !== 'Todos' ? filtros.estadoStock : undefined,
					precioMin: filtros.precioMin ? Number(filtros.precioMin) : undefined,
					precioMax: filtros.precioMax ? Number(filtros.precioMax) : undefined,
				},
			})
			return productos

		},
	})

	const deleteMutation = useMutation({
		mutationFn: ({ idProducto, idInventario }: { idProducto: number, idInventario: number }) =>
			deleteProducto({ data: { idProducto, idInventario } }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['productos'] })
			setProductoEliminar(null)
		},
	})

	const productos = data?.data ?? []

	const columns = [
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
			size: 200,
		}),
		columnHelper.accessor('categoryName', {
			header: () => (
				<span className="text-xs font-medium uppercase text-muted-foreground">
					Categoría
				</span>
			),
			cell: ({ getValue }) => (
				<span className="text-sm text-foreground">
					{getValue() || 'Sin categoría'}
				</span>
			),
		}),
		columnHelper.accessor('stock', {
			header: () => (
				<span className="text-xs font-medium uppercase text-muted-foreground">
					Cantidad
				</span>
			),
			cell: ({ getValue }) => (
				<span className="text-sm font-medium text-foreground">
					{getValue()}
				</span>
			),
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
			pagination,
		},
		pageCount: data?.totalPages ?? -1,
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		manualPagination: true,
		manualSorting: true,
		getRowId: (row) => row.id.toString(),
	})

	useEffect(() => {
		if (data?.page) {
			setCurrentPage(data.page)
		}
	}, [data?.page])

	useEffect(() => {
		setCurrentPage(1)
		setPagination(prev => ({ ...prev, pageIndex: 0 }))
	}, [search, filtros.categoria, filtros.estadoStock, filtros.precioMin, filtros.precioMax])



	return (
		<>
			<Card className="overflow-hidden rounded-xl border">
				<div className="flex items-center justify-between border-b px-4 py-3">
					<span className="text-xs text-muted-foreground">
						{isLoading
							? 'Cargando...'
							: `Mostrando ${data?.total}–${data?.limit} de ${data?.total ?? 0} productos`}
					</span>

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
					</span>
					<Pagination>
						<PaginationContent>
							<Button
								onClick={() => {
									const newPage = currentPage - 1
									setCurrentPage(newPage)
									setPagination(prev => ({ ...prev, pageIndex: prev.pageIndex - 1 }))
								}}
								disabled={currentPage === 1}
							>
								Prev
							</Button>
							{currentPage}

							<Button
								onClick={() => {
									const newPage = currentPage + 1
									setCurrentPage(newPage)
									setPagination(prev => ({ ...prev, pageIndex: prev.pageIndex + 1 }))
								}}
								disabled={currentPage === data?.totalPages}
							>
								Next
							</Button>
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
					data={productoEditar}
					idInvetario={inventoryId}
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
					onConfirm={() => deleteMutation.mutate({ idProducto: productoEliminar.id, idInventario: inventoryId })}
					isDeleting={deleteMutation.isPending}
				/>
			)}
		</>
	)
}

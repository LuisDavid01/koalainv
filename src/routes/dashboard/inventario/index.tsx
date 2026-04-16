import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { PlusSignIcon } from '@hugeicons/core-free-icons'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Button } from '@/components/ui/button'
import { MetricasCards } from '@/components/inventario/MetricasCards'
import { BarraAcciones } from '@/components/inventario/BarraAcciones'
import { TablaInventario } from '@/components/inventario/TablaInventario'
import { AgregarEditarModal } from '@/components/inventario/AgregarEditarModal'
import { useQuery } from '@tanstack/react-query'
import { getInventarios } from '@/server/actions/inventarios.functions'
import type { INVENTORY_TYPE } from '@/server/db/schema'
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

export const Route = createFileRoute('/dashboard/inventario/')({
	component: RouteComponent,
})

function RouteComponent() {
	const [search, setSearch] = useState('')
	const [filtros, setFiltros] = useState<Filtros>({
		categoria: 'Todos',
		estadoStock: 'Todos',
		precioMin: '',
		precioMax: '',
	})
	const [modalAgregarOpen, setModalAgregarOpen] = useState(false)
	const [inventarioId, setInventarioId] = useState(1)

	const { data, isLoading } = useQuery<INVENTORY_TYPE[]>({
		queryKey: ['inventarios', inventarioId],
		queryFn: () => getInventarios({ data: { id: inventarioId } }),
	})

	return (
		<div className="min-h-screen bg-background">
			<Sidebar />

			<div className="md:ml-64">
				<header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-6">
					<div className="flex items-center gap-2 text-sm">
						{isLoading ? (
							<span className="text-sm text-muted-foreground">Cargando...</span>
						) : data && data.length > 0 ? (
							<div className="flex items-center gap-2">
								<span className="text-sm font-medium">Inventario:</span>
								<Select
									value={String(inventarioId)}
									onValueChange={(v) => setInventarioId(Number(v))}
								>
									<SelectTrigger className="min-w-[120px]">
										<SelectValue>
											{data.find((inv) => inv.id === inventarioId)?.name ?? "Seleccionar"}
										</SelectValue>
									</SelectTrigger>

									<SelectContent>
										{data.map((inv) => (
											<SelectItem key={inv.id} value={String(inv.id)}>
												{inv.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

							</div>
						) : (
							<span className="text-sm text-muted-foreground">
								No hay inventarios disponibles
							</span>
						)}
					</div>

					<div className="flex items-center gap-2">
						<Button
							size="sm"
							className="bg-primary"
							onClick={() => setModalAgregarOpen(true)}
						>
							<HugeiconsIcon
								icon={PlusSignIcon}
								size={16}
								strokeWidth={1.5}
								className="mr-1"
							/>
							Agregar Producto
						</Button>
					</div>
				</header>

				<main className="p-6 space-y-4">
					<MetricasCards inventoryId={inventarioId} />

					<BarraAcciones
						search={search}
						onSearchChange={setSearch}
						filtros={filtros}
						onFiltrosChange={setFiltros}
					/>

					<TablaInventario
						inventoryId={inventarioId}
						search={search}
						filtros={filtros}
					/>

					<AgregarEditarModal
						open={modalAgregarOpen}
						onOpenChange={setModalAgregarOpen}
					/>
				</main>
			</div>
		</div>
	)
}

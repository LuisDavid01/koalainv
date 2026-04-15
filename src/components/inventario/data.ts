export interface Metrica {
  label: string
  value: string
  change: string
  isPositive: boolean
  variant?: 'default' | 'warning' | 'danger'
  icon: unknown
}

export const categorias = [
  'Todos',
  'Electrónica',
  'Ropa',
  'Alimentos',
  'Servicios',
  'Accesorios',
  'Audio',
  'Almacenamiento',
]
export const estadosStock = ['Todos', 'En stock', 'Stock bajo', 'Sin stock']

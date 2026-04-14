export interface Producto {
  id: string
  nombre: string
  sku: string
  categoria: string
  marca: string
  color: string
  stock: number
  precio: number
  imagen?: string
  descripcion?: string
}

export interface Metrica {
  label: string
  value: string
  change: string
  isPositive: boolean
  variant?: 'default' | 'warning' | 'danger'
  icon: any
}

export const mockProductos: Producto[] = [
  {
    id: '1',
    nombre: 'Laptop Lenovo IdeaPad',
    sku: 'SKU-00124',
    categoria: 'Electrónica',
    marca: 'Lenovo',
    color: 'Gris Plata',
    stock: 13,
    precio: 485000,
  },
  {
    id: '2',
    nombre: 'Mouse Logitech MX Master',
    sku: 'SKU-00125',
    categoria: 'Accesorios',
    marca: 'Logitech',
    color: 'Negro',
    stock: 27,
    precio: 42000,
  },
  {
    id: '3',
    nombre: 'Monitor LG 27" 4K',
    sku: 'SKU-00126',
    categoria: 'Electrónica',
    marca: 'LG',
    color: 'Negro',
    stock: 6,
    precio: 320000,
  },
  {
    id: '4',
    nombre: 'Teclado Mecánico Keychron',
    sku: 'SKU-00127',
    categoria: 'Accesorios',
    marca: 'Keychron',
    color: 'Blanco',
    stock: 8,
    precio: 89000,
  },
  {
    id: '5',
    nombre: 'Auriculares Sony WH-1000XM5',
    sku: 'SKU-00128',
    categoria: 'Audio',
    marca: 'Sony',
    color: 'Negro',
    stock: 2,
    precio: 195000,
  },
  {
    id: '6',
    nombre: 'SSD Samsung 1TB',
    sku: 'SKU-00129',
    categoria: 'Almacenamiento',
    marca: 'Samsung',
    color: 'N/A',
    stock: 34,
    precio: 67000,
  },
  {
    id: '7',
    nombre: 'Webcam Logitech C920',
    sku: 'SKU-00130',
    categoria: 'Accesorios',
    marca: 'Logitech',
    color: 'Negro',
    stock: 0,
    precio: 58000,
  },
  {
    id: '8',
    nombre: 'iPad Air M2',
    sku: 'SKU-00131',
    categoria: 'Electrónica',
    marca: 'Apple',
    color: 'Azul',
    stock: 5,
    precio: 610000,
  },
  {
    id: '9',
    nombre: 'Cable USB-C 2m',
    sku: 'SKU-00132',
    categoria: 'Accesorios',
    marca: 'Anker',
    color: 'Blanco',
    stock: 88,
    precio: 8500,
  },
  {
    id: '10',
    nombre: 'Hub USB 7 puertos',
    sku: 'SKU-00133',
    categoria: 'Accesorios',
    marca: 'Ugreen',
    color: 'Gris',
    stock: 1,
    precio: 24000,
  },
]

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

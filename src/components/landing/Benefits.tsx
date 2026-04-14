import { ShoppingCart, FileText, Package, Users, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: ShoppingCart,
    title: 'Control de ventas ilimitado',
    description:
      'Registra y gestiona todas tus ventas sin restricciones. Historial completo siempre disponible.',
  },
  {
    icon: FileText,
    title: 'Emisión de facturas',
    description:
      '200 facturas gratuitas al mes. Necesitas más? $10 por cada 100 adicionales. Sin sorpresas.',
  },
  {
    icon: Package,
    title: 'Inventario sin límites',
    description:
      'Agrega todos los productos que quieras. Alertas de stock bajo incluidas.',
  },
  {
    icon: Users,
    title: 'Workspace colaborativo',
    description: 'Invita hasta 10 personas. Roles y permisos personalizables.',
  },
  {
    icon: BarChart3,
    title: 'Dashboards personalizables',
    description:
      'Crea tus propias vistas con las métricas que más importan para tu negocio.',
  },
]

const stats = [
  { value: '200', label: 'Facturas gratis al mes' },
  { value: '10', label: 'Usuarios por workspace' },
  { value: '∞', label: 'Productos en inventario' },
  { value: '$0', label: 'Para empezar' },
]

export default function Benefits() {
  return (
    <section id="funciones" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="lg:pr-12">
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
              Todo lo que necesita tu negocio
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              koalaInv te ofrece todas las herramientas para gestionar tu
              negocio de manera eficiente. Desde facturación electrónica hasta
              control de inventario en tiempo real.
            </p>
            <Button className="bg-primary">Ver todos los planes</Button>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-muted/30 p-8">
            <div
              className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/20"
              style={{ filter: 'blur(60px)' }}
            />

            <div className="relative border-3 border-foreground rounded-lg bg-background p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 border-b border-border pb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/20" />
                  <div className="space-y-1">
                    <div className="h-3 w-24 rounded bg-muted-foreground/20" />
                    <div className="h-2 w-16 rounded bg-muted-foreground/10" />
                  </div>
                </div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 py-2">
                    <div className="h-4 w-4 rounded bg-primary/30" />
                    <div className="flex-1 space-y-1">
                      <div className="h-2 w-full rounded bg-muted-foreground/10" />
                    </div>
                    <div className="h-2 w-12 rounded bg-muted-foreground/10" />
                  </div>
                ))}
                <div className="flex gap-2 pt-4">
                  <div className="h-8 flex-1 rounded bg-primary/20" />
                  <div className="h-8 flex-1 rounded bg-muted-foreground/10" />
                  <div className="h-8 flex-1 rounded bg-muted-foreground/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center justify-center p-8 ${
              i % 2 === 0 ? 'bg-primary' : 'bg-accent'
            }`}
          >
            <span className="text-5xl font-bold text-white">{stat.value}</span>
            <span className="mt-2 text-sm font-medium text-white/90">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-2">
              <CardHeader>
                <feature.icon
                  className="mb-2 h-8 w-8 text-primary"
                  strokeWidth={1.5}
                />
                <CardTitle className="text-lg font-semibold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SketchIllustration from './SketchIllustration'

const benefits = [
  '200 facturas gratis al mes',
  'Inventario ilimitado',
  'Hasta 10 usuarios',
  'Soporte local en Costa Rica',
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-3">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Para PYMEs en Costa Rica
            </span>

            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-foreground lg:text-6xl">
              Controla tu inventario.
              <br />
              <span className="text-primary">Factura sin límites.</span>
            </h1>

            <p className="mb-8 max-w-xl text-lg text-muted-foreground">
              La solución integral para gestionar tu negocio. Lleva el control
              de tu inventario y emite facturas electrónicas desde un solo
              lugar.
            </p>

            <ul className="mb-8 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button size="lg">Empezar gratis</Button>
              <Button size="lg" variant="outline">
                Ver demo
              </Button>
            </div>
          </div>

          <div className="relative lg:col-span-2">
 

            <div className="relative border-3 border-foreground rounded-lg bg-background p-4">
              <SketchIllustration />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

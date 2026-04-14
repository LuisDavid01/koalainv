import { ShieldCheck, Clock, BarChart } from 'lucide-react'

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Cumplimiento legal garantizado',
    description:
      'La factura electrónica es obligatoria en Costa Rica. Nuestro sistema está alineado con los requisitos del Ministerio de Hacienda.',
  },
  {
    icon: Clock,
    title: 'Menos errores, más tiempo',
    description:
      'Elimina el doble registro entre facturación e inventario. Todo se actualiza automáticamente en un solo lugar.',
  },
  {
    icon: BarChart,
    title: 'Visibilidad total de tu negocio',
    description:
      'Saber qué vendiste, qué tienes y cuánto ganaste, en tiempo real, desde cualquier dispositivo.',
  },
]

export default function WhyCentralized() {
  return (
    <section className="bg-muted/50 py-16 lg:py-24">
      <div className="mx-auto mb-12 max-w-3xl px-4 text-center lg:px-8">
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
          ¿Por qué Costa Rica necesita esto ahora?
        </h2>
        <p className="text-lg text-muted-foreground">
          Con la obligación de factura electrónica y la necesidad de digitalizar
          las PYMEs, tener un sistema centralizado es indispensable para tu
          negocio.
        </p>
      </div>

      <div className="relative mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-3">
        <div className="absolute -top-16 -right-8 text-accent opacity-50 rotate-12">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>

        {benefits.map((benefit, i) => (
          <div
            key={benefit.title}
            className={`flex flex-col p-8 text-primary-foreground ${
              i === 0 ? 'bg-primary' : i === 1 ? 'bg-primary' : 'bg-primary'
            } ${i < benefits.length - 1 ? 'border-r border-white/20' : ''}`}
          >
            <benefit.icon
              className="mb-4 h-8 w-8 text-white"
              strokeWidth={1.5}
            />
            <h3 className="mb-3 text-lg font-semibold text-white">
              {benefit.title}
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

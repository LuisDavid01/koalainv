export default function Ticker() {
  const items = [
    'Más de 200 empresas en Costa Rica ya lo usan',
    'Sistema aprobado por Hacienda',
    'Soporte local',
    'Factura electrónica obligatoria',
  ]

  return (
    <div className="relative overflow-hidden  py-2.5">
      <div className="flex animate-ticker whitespace-nowrap">
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

const footerLinks = {
  Producto: [
    { href: '#funciones', label: 'Funciones' },
    { href: '#precios', label: 'Precios' },
    { href: '#blog', label: 'Blog' },
  ],
  Legal: [
    { href: '#', label: 'Términos de servicio' },
    { href: '#', label: 'Política de privacidad' },
    { href: '#', label: 'Licencias' },
  ],
  Soporte: [
    { href: '#', label: 'Centro de ayuda' },
    { href: '#', label: 'Contactános' },
    { href: '#', label: 'Estado del sistema' },
  ],
}

export default function FooterLanding() {
  return (
    <footer className="">
      <section className="mx-auto max-w-3xl px-4 py-16 text-center lg:px-8 lg:py-24">
        <h2 className="mb-4 text-4xl font-bold lg:text-5xl">
          Empieza gratis hoy.
        </h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Sin tarjeta de crédito. Sin complicaciones.
        </p>
        <Button size="lg" variant="secondary" className="">
          Crear mi cuenta gratis
        </Button>
        <p className="mt-6 text-xs text-muted-foreground opacity-60">
          ¿Tienes preguntas? Escríbenos a soporte@koalainv.com o al WhatsApp...
        </p>
      </section>

      <div className="mx-auto max-w-7xl border-t border-white/10 px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold text-white"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                K
              </span>
              koalaInv
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              La solución integral para gestionar tu negocio en Costa Rica.
            </p>
            <div className="mt-4 flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-white">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.587-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.296 1.371 6.733-.083-.013-.163-.021-.248-.021-.597 0-1.146.052-1.686.156-.858-2.902-3.413-5.033-6.256-5.033-4.737 0-8.571 3.834-8.571 8.571 0 .672.078 1.328.227 1.958-.713-.035-1.385-.218-1.971-.513v.052c0 4.043 2.873 7.402 6.692 8.167-.697.19-1.435.295-2.197.295-2.236 0-3.918-1.886-3.918-4.167 0-1.057.447-1.984 1.125-2.529-.837-.026-1.623-.267-2.307-.597v.054c0 1.938 1.368 3.547 3.181 3.908-.353.097-.726.152-1.11.152-.265 0-.524-.025-.775-.073.526 1.655 2.054 2.861 3.864 2.895 1.423.008 2.789-.577 3.693-1.373.904.643 1.984 1.015 3.147 1.015 6.627 0 10.254-5.514 10.254-10.254 0-.157-.003-.312-.009-.466.704-.509 1.314-1.145 1.797-1.868z" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-white">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.235 1.839 1.235 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.628-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .315.192.691.799.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-white">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.584.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-foreground">
            © 2026 koalaInv. Todos los derechos
            reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            Hecho en Costa Rica para Costa Rica.
          </p>
        </div>
      </div>
    </footer>
  )
}

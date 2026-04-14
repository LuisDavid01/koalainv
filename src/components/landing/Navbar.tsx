import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '#funciones', label: 'Funciones' },
  { href: '#precios', label: 'Precios' },
  { href: '#blog', label: 'Blog' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-foreground"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            K
          </span>
          koalaInv
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Button size="sm">Registrarse</Button>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      <div
        className={cn(
          'fixed inset-0 z-40 bg-background pt-20 transition-transform duration-300 md:hidden',
          mobileOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex flex-col items-center gap-6 p-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-lg text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Button className="w-full">Registrarse</Button>
        </div>
      </div>
    </header>
  )
}

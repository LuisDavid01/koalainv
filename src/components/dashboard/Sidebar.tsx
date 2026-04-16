import { useState } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowUpIcon,
  Grid02Icon,
  Home01FreeIcons,
  LayoutGridIcon,
  PackageIcon,
  Settings01Icon,
} from '@hugeicons/core-free-icons'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import ThemeToggle from '@/components/ThemeToggle'
import { authClient } from '@/lib/auth-client'

const userData = {
  name: 'Mi Negocio',
  role: 'Plan Gratuito',
}

function NavLink({
  href,
  label,
  iconComponent,
}: {
  href: string
  label: string
  iconComponent: any
}) {
  const location = useLocation()
  const isActive = location.pathname === href

  return (
    <a
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
        isActive
          ? 'bg-primary/15 text-primary font-medium'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
      )}
    >
      <HugeiconsIcon icon={iconComponent} size={4} strokeWidth={2} />

      {label}
    </a>
  )
}

function SidebarContent({ isMobile = false }: { isMobile?: boolean }) {
	const { data: session } = authClient.useSession()  
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col gap-6 p-6">
	  <Link to="/">
        <div className="flex items-center gap-3">
		          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/20">
            <HugeiconsIcon icon={ArrowUpIcon} size={4} strokeWidth={2} />
          </div>
          <span className="font-bold text-foreground">koalaInv</span>
		  
        </div>
		</Link>

        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarFallback className="bg-muted text-xs font-bold">
              M
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              {session?.user?.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {userData.role}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <ThemeToggle />
            <Button variant="ghost" size="icon-xs">
              <HugeiconsIcon icon={Settings01Icon} size={4} strokeWidth={2} />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 px-3">
        <NavLink
          href="/dashboard"
          label="Dashboard"
          iconComponent={Home01FreeIcons}
        />
        <NavLink
          href="/dashboard/inventario"
          iconComponent={Home01FreeIcons}
          label="Inventario"
        />
        <NavLink
          href="/dashboard/facturas"
          label="Facturas"
          iconComponent={Home01FreeIcons}
        />
        <NavLink
          href="/dashboard/auditorias"
          label="Auditorías"
          iconComponent={Home01FreeIcons}
        />
        <div className="my-2 border-t border-border" />
        <a
          href="/dashboard/configuracion"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <HugeiconsIcon icon={Settings01Icon} size={18} strokeWidth={2} />
          Configuración
        </a>
      </div>

      <div className="p-4">
        <div className="rounded-xl border border-primary/20 bg-primary/10 p-3">
          <div className="text-sm font-semibold text-primary">
            Actualizar Plan
          </div>
          <div className="text-xs text-muted-foreground">
            Amplía facturas y usuarios
          </div>
          <Button
            size="sm"
            className="mt-2 w-full bg-primary text-primary-foreground"
          >
            Upgrade
          </Button>
        </div>
      </div>
    </div>
  )
}

export function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col bg-card border-r md:flex">
        <SidebarContent />
      </aside>

      <Sheet open={open} onOpenChange={setOpen}>

        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent isMobile />
        </SheetContent>
      </Sheet>
    </>
  )
}

export { SidebarContent }

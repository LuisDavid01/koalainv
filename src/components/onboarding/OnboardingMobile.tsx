import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MemberFlow } from './MemberFlow'
import { OwnerFlow } from './OwnerFlow'

type Flow = 'select' | 'member' | 'owner'

export function OnboardingMobile() {
  const [flow, setFlow] = useState<Flow>('select')

  if (flow === 'member') {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6">
        <Button variant="link" onClick={() => setFlow('select')} className="mb-4">
          ← Volver
        </Button>
        <MemberFlow />
      </div>
    )
  }

  if (flow === 'owner') {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6">
        <Button variant="link" onClick={() => setFlow('select')} className="mb-4">
          ← Volver
        </Button>
        <OwnerFlow />
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-bold">¿Cómo quieres continuar?</h2>
          <p className="text-sm text-muted-foreground">
            Elige cómo quieres usar KoalaInv
          </p>
        </div>

        <div className="space-y-4">
          <Card
            className="cursor-pointer transition-colors hover:border-primary"
            onClick={() => setFlow('member')}
          >
            <CardContent className="p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Únete como miembro
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Tengo un código de invitación
              </p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer transition-colors hover:border-primary"
            onClick={() => setFlow('owner')}
          >
            <CardContent className="p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Soy dueño de negocio
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Quiero crear mi organización
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
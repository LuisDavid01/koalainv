import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useForm } from '@tanstack/react-form'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import * as z from 'zod'
import { toast } from 'sonner'

const formSchema = z.object({
  inviteCode: z
    .string()
    .min(6, 'El código debe tener al menos 6 caracteres.')
    .max(20, 'El código debe tener máximo 20 caracteres.'),
})

export function MemberFlow() {
  const [isLoading, setIsLoading] = useState(false)
  const [showError, setShowError] = useState(false)

  const form = useForm({
    defaultValues: {
      inviteCode: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
      toast.success('Código válido. Redirigiendo...')
    },
  })

  const handleInvalid = () => {
    setShowError(true)
    setTimeout(() => setShowError(false), 500)
  }

  return (
    <div className="w-full max-w-sm space-y-8">
      <div className="space-y-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Únete como miembro
        </p>
      </div>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.Field
            name="inviteCode"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Código de invitación</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Ingresa tu código"
                    className={cn(
                      'text-center tracking-wider font-mono',
                      showError && 'animate-shake'
                    )}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )
            }}
          />

          <Field>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Validando...' : 'Entrar'}
            </Button>
          </Field>

          <FieldDescription className="text-center">
            ¿No tienes un código? Solicita uno a tu administrador.
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  )
}
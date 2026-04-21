import { cn } from '@/lib/utils'

interface OnboardingStepperProps {
  currentStep: number
}

const steps = [
  { label: 'Organización' },
  { label: 'Pago' },
  { label: 'Listo' },
]

export function OnboardingStepper({ currentStep }: OnboardingStepperProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {steps.map((_, index) => (
        <div key={index} className="flex items-center">
          <div
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-medium transition-all duration-300',
              index < currentStep
                ? 'border-primary bg-primary text-primary-foreground'
                : index === currentStep
                ? 'border-primary ring-2 ring-primary/20'
                : 'border-muted-foreground/30 bg-transparent text-muted-foreground'
            )}
          >
            {index < currentStep ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              index + 1
            )}
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                'h-0.5 w-8 transition-all duration-300',
                index < currentStep ? 'bg-primary' : 'bg-muted-foreground/30'
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}
import { SplitContainer } from '@/components/onboarding/SplitContainer'
import { MemberFlow } from '@/components/onboarding/MemberFlow'
import { OwnerFlow } from '@/components/onboarding/OwnerFlow'
import { OnboardingMobile } from '@/components/onboarding/OnboardingMobile'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/onboarding')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen bg-background">
      <div className="md:hidden">
        <OnboardingMobile />
      </div>
      <div className="hidden md:block">
        <SplitContainer
          left={<MemberFlow />}
          right={<OwnerFlow />}
        />
      </div>
    </div>
  )
}
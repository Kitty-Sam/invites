import { OnboardingForm } from '@/components/Onboarding/OnboardingForm/OnboardingForm'

const OnboardingPage = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-primary/20 to-background">
      <div className="fixed left-0 top-0 w-full py-2 text-center text-black shadow-md">
        <p className="text-[14px] font-bold leading-[20px]">BenchExchange</p>
      </div>

      <div className="flex flex-grow flex-col items-center justify-center bg-gray-50 p-4">
        <OnboardingForm />
      </div>
    </div>
  )
}

export default OnboardingPage

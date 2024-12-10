import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { OnboardingStepProps } from '@/types/onboarding'
import { StepIndicator } from '@/components/Onboarding/StepIndicator/StepIndicator'

export const StepThree = ({
  onPrevious,
  currentStep,
  totalSteps,
  data,
}: OnboardingStepProps) => {
  const onContinueWithTechProfile = () => {}

  return (
    <Card className="mx-auto w-full min-w-[600px] max-w-lg text-center">
      <CardHeader>
        <CardTitle className="text-2xl">
          Thank you for providing your details!
        </CardTitle>
        <CardDescription className="text-base">
          Next step: Creating your company's technical profiles for better lead
          generation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <div className="relative h-32 w-32">
            <img
              src="/onboarding.png"
              alt="Folder"
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
          <div className="flex space-x-2">
            <Button type="button" variant="secondary" onClick={onPrevious}>
              Previous
            </Button>
            <Button
              variant="default"
              type="button"
              onClick={onContinueWithTechProfile}
            >
              Continue with tech profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

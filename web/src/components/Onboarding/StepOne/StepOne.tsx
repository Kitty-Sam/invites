import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { OnboardingStepProps } from '@/types/onboarding'
import React from 'react'
import { StepIndicator } from '@/components/Onboarding/StepIndicator/StepIndicator'
import { InputCustom } from '@/components/shared/InputCustom/InputCustom'

export function StepOne({
  data,
  onUpdate,
  onNext,
  onPrevious,
  currentStep,
  totalSteps,
}: OnboardingStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <Card className="mx-auto w-full min-w-[600px] max-w-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Hey {data.firstName || 'there'}! Are you ready
          <br />
          for your next big challenge?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputCustom
              label="First Name"
              required
              value={data.firstName}
              onChange={(e) => onUpdate({ firstName: e.target.value })}
            />
            <InputCustom
              label="Last Name"
              required
              value={data.lastName}
              onChange={(e) => onUpdate({ lastName: e.target.value })}
            />
          </div>
          <InputCustom
            label="E-mail"
            type="email"
            required
            value={data.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
          />
          <InputCustom
            label="Phone number"
            type="tel"
            value={data.phone}
            onChange={(e) => onUpdate({ phone: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputCustom
              label="Telegram"
              value={data.telegram}
              onChange={(e) => onUpdate({ telegram: e.target.value })}
            />
            <InputCustom
              label="LinkedIn"
              value={data.linkedIn}
              onChange={(e) => onUpdate({ linkedIn: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-between pt-4">
            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
            <div className="flex space-x-2">
              <Button type="submit" variant="default">
                Next
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

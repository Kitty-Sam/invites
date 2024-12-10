import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { OnboardingStepProps } from '@/types/onboarding'
import { companySizes } from '@/constants/company-size'
import { InputCustom } from '@/components/shared/input-custom/input-custom'
import { StepIndicator } from '@/components/Onboarding/StepIndicator/StepIndicator'

export const StepTwo = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
  currentStep,
  totalSteps,
}: OnboardingStepProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <Card className="mx-auto w-full min-w-[600px] max-w-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          About Your Company
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputCustom
            label="Company Name"
            required
            value={data.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
          />
          <InputCustom
            label="Website"
            type="url"
            value={data.website}
            onChange={(e) => onUpdate({ website: e.target.value })}
          />
          <div className="space-y-2">
            <label htmlFor="company-size" className="block text-sm font-medium">
              Company size
            </label>
            <Select
              value={data.size}
              onValueChange={(value) => onUpdate({ size: value })}
            >
              <SelectTrigger id="company-size">
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {companySizes.map((el) => (
                  <SelectItem value={el.value} key={el.value}>
                    {el.option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between pt-4">
            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
            <div className="flex space-x-2">
              <Button type="button" variant="secondary" onClick={onPrevious}>
                Previous
              </Button>
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

import * as React from 'react'
import * as z from 'zod'
import { useState } from 'react'
import { StepOne } from '@/components/Onboarding/StepOne/StepOne'
import { StepTwo } from '@/components/Onboarding/StepTwo/StepTwo'
import { StepThree } from '@/components/Onboarding/StepThree/StepThree'
import { OnboardingFormData } from '@/types/onboarding'

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Last name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  linkedIn: z
    .string()
    .min(1, {
      message: 'linkedIn username is required.',
    })
    .optional(),
  telegram: z
    .string()
    .min(1, {
      message: 'Telegram username is required.',
    })
    .optional(),
  phone: z
    .string()
    .min(1, {
      message: 'Phone number is required.',
    })
    .optional(),
  name: z.string().min(1, {
    message: 'Company name is required.',
  }),
  website: z
    .string()
    .url({
      message: 'Please enter a valid website URL.',
    })
    .optional(),
  size: z
    .string({
      required_error: 'Please select a company size.',
    })
    .optional(),
})

type FormData = z.infer<typeof formSchema>

const initialData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  telegram: '',
  linkedIn: '',
  name: '',
  website: '',
  size: '',
}

export const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialData)

  const handleUpdate = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      {currentStep === 1 && (
        <StepOne
          data={formData as OnboardingFormData}
          onUpdate={handleUpdate}
          onNext={handleNext}
          onPrevious={handlePrevious}
          currentStep={currentStep}
          totalSteps={3}
        />
      )}
      {currentStep === 2 && (
        <StepTwo
          data={formData as OnboardingFormData}
          onUpdate={handleUpdate}
          onNext={handleNext}
          onPrevious={handlePrevious}
          currentStep={currentStep}
          totalSteps={3}
        />
      )}
      {currentStep === 3 && (
        <StepThree
          data={formData as OnboardingFormData}
          onUpdate={handleUpdate}
          onNext={handleNext}
          onPrevious={handlePrevious}
          currentStep={currentStep}
          totalSteps={3}
        />
      )}
    </div>
  )
}

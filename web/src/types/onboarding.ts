export interface OnboardingFormData {
  firstName: string;
  lastName: string;
  email: string;
  name: string;
  phone?: string;
  telegram?: string;
  linkedIn?: string;
  website?: string;
  size?: string;
}

export interface OnboardingStepProps {
  data: OnboardingFormData;
  onUpdate: (data: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
}

interface StepIndicatorProps {
    currentStep: number
    totalSteps: number
}

export const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
    return (
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Step {currentStep} of {totalSteps}</span>
        </div>
    )
}


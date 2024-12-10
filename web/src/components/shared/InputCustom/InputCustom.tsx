import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const InputCustom = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium">
          {label}
          {props.required && '*'}
        </label>
        <input
          ref={ref}
          {...props}
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)

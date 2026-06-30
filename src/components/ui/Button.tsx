import * as React from "react"
import { cn } from "@/lib/utils/cn"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-chery-red focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-chery-red text-white hover:bg-chery-red-dark hover:scale-105 hover:shadow-lg': variant === 'primary',
            'bg-transparent border-2 border-chery-red text-chery-red hover:bg-chery-red hover:text-white': variant === 'secondary',
            'bg-transparent border-2 border-gray-300 text-gray-700 hover:border-chery-red hover:text-chery-red': variant === 'outline',
            'bg-transparent text-gray-700 hover:bg-gray-100': variant === 'ghost',
          },
          {
            'text-sm py-2 px-4': size === 'sm',
            'text-base py-3 px-6': size === 'md',
            'text-lg py-4 px-8': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
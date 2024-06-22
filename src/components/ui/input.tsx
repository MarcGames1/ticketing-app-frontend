import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex-1 bg-white body-lg w-full px-4 py-2 my-2 block rounded border text-black border-mediumGrey border-opacity-25 placeholder:opacity-25 focus:outline-none focus:border-mainPurple dark:bg-darkGrey dark:text-white",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

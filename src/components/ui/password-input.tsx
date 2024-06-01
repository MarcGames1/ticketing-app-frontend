'use client'
import * as React from "react"
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

import { cn } from "@/lib/utils"
import {Input} from "@/components/ui/input";
import {useState} from "react";

export interface PasswordInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, type, ...props }, ref) => {
      const [isVisible, setIsVisible] = useState(false)
        return (
            <div className={'flex gap-2 items-center'}>
            <Input className={className} type={isVisible ? 'text' :  "password"} {...props} ref={ref}/>
                <div className={'cursor-pointer'} onClick={() =>{setIsVisible(!isVisible)}}>{isVisible ? <FaEye size={'2rem'} color={'hsl(var(--accent-foreground))'} /> : <FaEyeSlash  size={'2rem'} color={'hsl(var(--accent-foreground))'}  />}</div>
            </div>
        )
    }
)
PasswordInput.displayName = "Input"

export { PasswordInput }

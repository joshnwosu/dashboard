// "use client"

// import * as React from "react"
// import * as SwitchPrimitive from "@radix-ui/react-switch"

// import { cn } from "@/lib/utils"

// function Switch({
//   className,
//   ...props
// }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
//   return (
//     <SwitchPrimitive.Root
//       data-slot="switch"
//       className={cn(
//         "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
//         className
//       )}
//       {...props}
//     >
//       <SwitchPrimitive.Thumb
//         data-slot="switch-thumb"
//         className={cn(
//           "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
//         )}
//       />
//     </SwitchPrimitive.Root>
//   )
// }

// export { Switch }

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const switchVariants = cva(
  'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300',
        destructive:
          'data-[state=checked]:bg-red-500 data-[state=unchecked]:bg-gray-300',
        outline:
          'border border-input bg-background data-[state=checked]:bg-green-100 data-[state=unchecked]:bg-background',
        secondary:
          'data-[state=checked]:bg-gray-500 data-[state=unchecked]:bg-gray-300',
        primary:
          'data-[state=checked]:bg-sidebar-primary data-[state=unchecked]:bg-gray-300',
        warning:
          'data-[state=checked]:bg-amber-500 data-[state=unchecked]:bg-gray-300',
      },
      size: {
        sm: 'h-4 w-7',
        default: 'h-6 w-11',
        lg: 'h-6 w-12', // 48px wide, 24px tall
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, variant, size, ...props }, ref) => {
    const thumbSize = {
      sm: 'size-3',
      default: 'size-5',
      lg: 'size-5', // 20px
    }[size || 'default'];

    const thumbTranslate = {
      sm: 'data-[state=checked]:translate-x-3',
      default: 'data-[state=checked]:translate-x-5',
      lg: 'data-[state=checked]:translate-x-6', // Adjusted for 48px width
    }[size || 'default'];

    return (
      <SwitchPrimitives.Root
        className={cn(switchVariants({ variant, size }), className)}
        {...props}
        ref={ref}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            'pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0',
            thumbSize,
            thumbTranslate
          )}
        />
      </SwitchPrimitives.Root>
    );
  }
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

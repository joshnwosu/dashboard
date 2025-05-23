// import * as React from 'react';
// import { cva, type VariantProps } from 'class-variance-authority';
// import { cn } from '@/lib/utils';
// import { ArrowDown, ArrowRight, ArrowUp } from 'lucide-react';

// const badgeDeltaVariants = cva(
//   'inline-flex items-center text-tremor-label font-semibold',
//   {
//     variants: {
//       variant: {
//         outline: 'gap-x-1 rounded-md px-2 py-1 ring-1 ring-inset ring-border',
//         solid: 'gap-x-1 rounded-md px-2 py-1',
//         solidOutline: 'gap-x-1 rounded-md px-2 py-1 ring-1 ring-inset',
//         complex:
//           'space-x-2.5 rounded-md bg-tremor-background py-1 pl-2.5 pr-1 ring-1 ring-inset ring-gray-200 dark:ring-gray-800 dark:bg-dark-tremor-background',
//       },
//       deltaType: {
//         increase: '',
//         decrease: '',
//         neutral: '',
//         medium: '',
//       },
//       iconStyle: {
//         filled: '',
//         line: '',
//       },
//     },
//     compoundVariants: [
//       // Outline variants
//       {
//         deltaType: 'increase',
//         variant: 'outline',
//         className: 'text-emerald-700 dark:text-emerald-500',
//       },
//       {
//         deltaType: 'decrease',
//         variant: 'outline',
//         className: 'text-red-700 dark:text-red-500',
//       },
//       {
//         deltaType: 'neutral',
//         variant: 'outline',
//         className: 'text-gray-700 dark:text-gray-400',
//       },
//       {
//         deltaType: 'medium',
//         variant: 'outline',
//         className: 'text-amber-700 dark:text-amber-500',
//       },
//       // Solid variants
//       {
//         deltaType: 'increase',
//         variant: 'solid',
//         className:
//           'bg-emerald-100 text-emerald-800 dark:bg-emerald-400/20 dark:text-emerald-500',
//       },
//       {
//         deltaType: 'decrease',
//         variant: 'solid',
//         className:
//           'bg-red-100 text-red-800 dark:bg-red-400/20 dark:text-red-500',
//       },
//       {
//         deltaType: 'neutral',
//         variant: 'solid',
//         className:
//           'bg-gray-200/50 text-gray-700 dark:bg-gray-500/30 dark:text-gray-300',
//       },
//       {
//         deltaType: 'medium',
//         variant: 'solid',
//         className:
//           'bg-amber-100 text-amber-800 dark:bg-amber-400/20 dark:text-amber-500',
//       },
//       // Solid outline variants
//       {
//         deltaType: 'increase',
//         variant: 'solidOutline',
//         className:
//           'bg-emerald-100 text-emerald-800 ring-emerald-600/10 dark:bg-emerald-400/20 dark:text-emerald-500 dark:ring-emerald-400/20',
//       },
//       {
//         deltaType: 'decrease',
//         variant: 'solidOutline',
//         className:
//           'bg-red-100 text-red-800 ring-red-600/10 dark:bg-red-400/20 dark:text-red-500 dark:ring-red-400/20',
//       },
//       {
//         deltaType: 'neutral',
//         variant: 'solidOutline',
//         className:
//           'bg-gray-100 text-gray-700 ring-gray-600/10 dark:bg-gray-500/30 dark:text-gray-300 dark:ring-gray-400/20',
//       },
//       {
//         deltaType: 'medium',
//         variant: 'solidOutline',
//         className:
//           'bg-amber-100 text-amber-800 ring-amber-600/10 dark:bg-amber-400/20 dark:text-amber-500 dark:ring-amber-400/20',
//       },
//     ],
//   }
// );

// interface BadgeDeltaProps
//   extends React.HTMLAttributes<HTMLSpanElement>,
//     VariantProps<typeof badgeDeltaVariants> {
//   value: string | number;
// }

// const DeltaIcon = ({
//   deltaType,
//   iconStyle,
// }: {
//   deltaType: 'increase' | 'decrease' | 'neutral' | 'medium';
//   iconStyle: 'filled' | 'line';
// }) => {
//   const icons = {
//     increase: {
//       filled: ArrowUp,
//       line: ArrowUp,
//     },
//     decrease: {
//       filled: ArrowDown,
//       line: ArrowDown,
//     },
//     neutral: {
//       filled: ArrowRight,
//       line: ArrowRight,
//     },
//     medium: {
//       filled: ArrowRight, // Using ArrowRight for warning, similar to neutral
//       line: ArrowRight,
//     },
//   };

//   const Icon = icons[deltaType][iconStyle];
//   return <Icon className='-ml-0.5 size-4' aria-hidden={true} />;
// };

// export function BadgeDelta({
//   className,
//   variant = 'outline',
//   deltaType = 'neutral',
//   iconStyle = 'filled',
//   value,
//   ...props
// }: BadgeDeltaProps) {
//   if (variant === 'complex') {
//     return (
//       <span
//         className={cn(badgeDeltaVariants({ variant, className }))}
//         {...props}
//       >
//         <span
//           className={cn(
//             'text-tremor-label font-semibold',
//             deltaType === 'increase' &&
//               'text-emerald-700 dark:text-emerald-500',
//             deltaType === 'decrease' && 'text-red-700 dark:text-red-500',
//             deltaType === 'neutral' &&
//               'text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis',
//             deltaType === 'medium' && 'text-amber-700 dark:text-amber-500'
//           )}
//         >
//           {value}
//         </span>
//         <span
//           className={cn(
//             'rounded-md px-2 py-1 text-tremor-label font-medium',
//             deltaType === 'increase' && 'bg-emerald-100 dark:bg-emerald-400/10',
//             deltaType === 'decrease' && 'bg-red-100 dark:bg-red-400/10',
//             deltaType === 'neutral' &&
//               'bg-tremor-background-subtle dark:bg-dark-tremor-background-subtle',
//             deltaType === 'medium' && 'bg-amber-100 dark:bg-amber-400/10'
//           )}
//         >
//           <DeltaIcon deltaType={deltaType ?? 'neutral'} iconStyle='line' />
//         </span>
//       </span>
//     );
//   }

//   return (
//     <span
//       className={cn(badgeDeltaVariants({ variant, deltaType, className }))}
//       {...props}
//     >
//       <DeltaIcon
//         deltaType={deltaType ?? 'neutral'}
//         iconStyle={iconStyle ?? 'filled'}
//       />
//       {value}
//     </span>
//   );
// }

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowRight, ArrowUp } from 'lucide-react';

const badgeDeltaVariants = cva(
  'inline-flex items-center text-tremor-label font-semibold',
  {
    variants: {
      variant: {
        outline: 'gap-x-1 rounded-md px-2 py-1 ring-1 ring-inset ring-border',
        solid: 'gap-x-1 rounded-md px-2 py-1',
        solidOutline: 'gap-x-1 rounded-md px-2 py-1 ring-1 ring-inset',
        complex:
          'space-x-2.5 rounded-md bg-tremor-background py-1 pl-2.5 pr-1 ring-1 ring-inset ring-gray-200 dark:ring-gray-800 dark:bg-dark-tremor-background',
      },
      deltaType: {
        increase: '',
        decrease: '',
        neutral: '',
        medium: '',
      },
      iconStyle: {
        filled: '',
        line: '',
      },
    },
    compoundVariants: [
      // Outline variants
      {
        deltaType: 'increase',
        variant: 'outline',
        className: 'text-emerald-700 dark:text-emerald-500',
      },
      {
        deltaType: 'decrease',
        variant: 'outline',
        className: 'text-red-700 dark:text-red-500',
      },
      {
        deltaType: 'neutral',
        variant: 'outline',
        className: 'text-gray-700 dark:text-gray-400',
      },
      {
        deltaType: 'medium',
        variant: 'outline',
        className: 'text-amber-700 dark:text-amber-500',
      },
      // Solid variants
      {
        deltaType: 'increase',
        variant: 'solid',
        className:
          'bg-emerald-100 text-emerald-800 dark:bg-emerald-400/20 dark:text-emerald-500',
      },
      {
        deltaType: 'decrease',
        variant: 'solid',
        className:
          'bg-red-100 text-red-800 dark:bg-red-400/20 dark:text-red-500',
      },
      {
        deltaType: 'neutral',
        variant: 'solid',
        className:
          'bg-gray-200/50 text-gray-700 dark:bg-gray-500/30 dark:text-gray-300',
      },
      {
        deltaType: 'medium',
        variant: 'solid',
        className:
          'bg-amber-100 text-amber-800 dark:bg-amber-400/20 dark:text-amber-500',
      },
      // Solid outline variants
      {
        deltaType: 'increase',
        variant: 'solidOutline',
        className:
          'bg-emerald-100 text-emerald-800 ring-emerald-600/10 dark:bg-emerald-400/20 dark:text-emerald-500 dark:ring-emerald-400/20',
      },
      {
        deltaType: 'decrease',
        variant: 'solidOutline',
        className:
          'bg-red-100 text-red-800 ring-red-600/10 dark:bg-red-400/20 dark:text-red-500 dark:ring-red-400/20',
      },
      {
        deltaType: 'neutral',
        variant: 'solidOutline',
        className:
          'bg-gray-100 text-gray-700 ring-gray-600/10 dark:bg-gray-500/30 dark:text-gray-300 dark:ring-gray-400/20',
      },
      {
        deltaType: 'medium',
        variant: 'solidOutline',
        className:
          'bg-amber-100 text-amber-800 ring-amber-600/10 dark:bg-amber-400/20 dark:text-amber-500 dark:ring-amber-400/20',
      },
    ],
  }
);

interface BadgeDeltaProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeDeltaVariants> {
  value: string | number;
}

// Helper function to determine deltaType based on numeric value
const getDeltaTypeFromValue = (
  value: string | number
): 'increase' | 'decrease' | 'neutral' | 'medium' => {
  const numericValue =
    typeof value === 'string' ? parseFloat(value.replace('%', '')) : value;

  if (isNaN(numericValue)) return 'neutral';

  if (numericValue >= 75) return 'increase'; // Green: 75-100
  if (numericValue >= 50) return 'medium'; // Amber/Yellow: 50-74
  if (numericValue >= 25) return 'neutral'; // Gray: 25-49
  return 'decrease'; // Red: 0-24
};

const DeltaIcon = ({
  deltaType,
  iconStyle,
}: {
  deltaType: 'increase' | 'decrease' | 'neutral' | 'medium';
  iconStyle: 'filled' | 'line';
}) => {
  const icons = {
    increase: {
      filled: ArrowUp,
      line: ArrowUp,
    },
    decrease: {
      filled: ArrowDown,
      line: ArrowDown,
    },
    neutral: {
      filled: ArrowRight,
      line: ArrowRight,
    },
    medium: {
      filled: ArrowUp, // Changed to ArrowUp for medium scores
      line: ArrowUp,
    },
  };

  const Icon = icons[deltaType][iconStyle];
  return <Icon className='-ml-0.5 size-4' aria-hidden={true} />;
};

export function BadgeDelta({
  className,
  variant = 'outline',
  deltaType,
  iconStyle = 'filled',
  value,
  ...props
}: BadgeDeltaProps) {
  // If deltaType is not provided, determine it from the value
  const computedDeltaType = deltaType || getDeltaTypeFromValue(value);

  if (variant === 'complex') {
    return (
      <span
        className={cn(badgeDeltaVariants({ variant, className }))}
        {...props}
      >
        <span
          className={cn(
            'text-tremor-label font-semibold',
            computedDeltaType === 'increase' &&
              'text-emerald-700 dark:text-emerald-500',
            computedDeltaType === 'decrease' &&
              'text-red-700 dark:text-red-500',
            computedDeltaType === 'neutral' &&
              'text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis',
            computedDeltaType === 'medium' &&
              'text-amber-700 dark:text-amber-500'
          )}
        >
          {value}
        </span>
        <span
          className={cn(
            'rounded-md px-2 py-1 text-tremor-label font-medium',
            computedDeltaType === 'increase' &&
              'bg-emerald-100 dark:bg-emerald-400/10',
            computedDeltaType === 'decrease' && 'bg-red-100 dark:bg-red-400/10',
            computedDeltaType === 'neutral' &&
              'bg-tremor-background-subtle dark:bg-dark-tremor-background-subtle',
            computedDeltaType === 'medium' &&
              'bg-amber-100 dark:bg-amber-400/10'
          )}
        >
          <DeltaIcon deltaType={computedDeltaType} iconStyle='line' />
        </span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        badgeDeltaVariants({ variant, deltaType: computedDeltaType, className })
      )}
      {...props}
    >
      <DeltaIcon
        deltaType={computedDeltaType}
        iconStyle={iconStyle ?? 'filled'}
      />
      {value}
    </span>
  );
}

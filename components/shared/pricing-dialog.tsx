// // 'use client';

// // import { useState } from 'react';
// // import { Dialog, DialogContent } from '@/components/ui/dialog';
// // import { PAYMENT_FREQUENCIES, TIERS } from '@/lib/pricing';
// // import { Tab } from './pricing-tab';
// // import { PricingCard } from './pricing-card';
// // import { Lock } from 'lucide-react';
// // import { CurrencyTab } from './currency-tab';

// // interface PricingDialogProps {
// //   open: boolean;
// //   onOpenChange: (open: boolean) => void;
// // }

// // export function PricingDialog({ open, onOpenChange }: PricingDialogProps) {
// //   const [selectedFrequency, setSelectedFrequency] =
// //     useState<(typeof PAYMENT_FREQUENCIES)[number]>('yearly');

// //   const [selectedCurrency, setSelectedCurrency] = useState('USD');

// //   const currencies = [
// //     { code: 'USD', symbol: '$' },
// //     { code: 'NGN', symbol: '₦' },
// //   ];

// //   return (
// //     <Dialog open={open} onOpenChange={onOpenChange}>
// //       <DialogContent className='sm:max-w-[95%] max-h-[90vh] lg:max-w-6xl bg-sidebar/60 backdrop-blur-xl overflow-y-auto'>
// //         <div className='flex flex-col items-center gap-8 pt-4 '>
// //           <div className='flex gap-4 items-center'>
// //             <div className='mx-auto flex w-fit rounded-full bg-muted p-1'>
// //               {PAYMENT_FREQUENCIES.map((freq) => (
// //                 <Tab
// //                   key={freq}
// //                   text={freq}
// //                   selected={selectedFrequency === freq}
// //                   setSelected={(value) =>
// //                     setSelectedFrequency(value as typeof selectedFrequency)
// //                   }
// //                   discount={freq === 'yearly'}
// //                 />
// //               ))}
// //             </div>

// //             <div className='flex items-center gap-1 rounded-full bg-muted p-1'>
// //               {currencies.map((currency) => (
// //                 <CurrencyTab
// //                   key={currency.code}
// //                   currency={currency.code}
// //                   symbol={currency.symbol}
// //                   selected={selectedCurrency === currency.code}
// //                   setSelected={setSelectedCurrency}
// //                 />
// //               ))}
// //             </div>
// //           </div>

// //           <div className='grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3'>
// //             {TIERS.map((tier, index) => (
// //               <PricingCard
// //                 key={tier.id}
// //                 tier={tier}
// //                 paymentFrequency={selectedFrequency}
// //                 index={index}

// //               />
// //             ))}
// //           </div>

// //           <div className='w-full'>
// //             <div className='flex items-center justify-center gap-3 text-sm font-medium text-muted-foreground'>
// //               <span className='flex items-center justify-center gap-1.5'>
// //                 <Lock className='size-4 mb-0.5' />
// //                 Secure payments
// //               </span>
// //               <span>•</span>
// //               <span>Cancel anytime</span>
// //             </div>
// //           </div>
// //         </div>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // }

// 'use client';

// import { useState } from 'react';
// import { Dialog, DialogContent } from '@/components/ui/dialog';
// import { PAYMENT_FREQUENCIES, TIERS } from '@/lib/pricing';
// import { Tab } from './pricing-tab';
// import { PricingCard } from './pricing-card';
// import { Lock } from 'lucide-react';
// import { CurrencyTab } from './currency-tab';

// interface PricingDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// export function PricingDialog({ open, onOpenChange }: PricingDialogProps) {
//   const [selectedFrequency, setSelectedFrequency] =
//     useState<(typeof PAYMENT_FREQUENCIES)[number]>('monthly');

//   const [selectedCurrency, setSelectedCurrency] = useState('NGN');

//   const currencies = [
//     { code: 'USD', symbol: '$' },
//     { code: 'NGN', symbol: '₦' },
//   ];

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className='sm:max-w-[95%] max-h-[90vh] lg:max-w-6xl bg-sidebar/60 backdrop-blur-xl overflow-y-auto'>
//         <div className='flex flex-col items-center gap-8 pt-4 '>
//           <div className='flex gap-4 items-center'>
//             <div className='mx-auto flex w-fit rounded-full bg-muted p-1'>
//               {PAYMENT_FREQUENCIES.map((freq) => (
//                 <Tab
//                   key={freq}
//                   text={freq}
//                   selected={selectedFrequency === freq}
//                   setSelected={(value) =>
//                     setSelectedFrequency(value as typeof selectedFrequency)
//                   }
//                   discount={freq === 'yearly'}
//                 />
//               ))}
//             </div>

//             <div className='flex items-center gap-1 rounded-full bg-muted p-1'>
//               {currencies.map((currency) => (
//                 <CurrencyTab
//                   key={currency.code}
//                   currency={currency.code}
//                   symbol={currency.symbol}
//                   selected={selectedCurrency === currency.code}
//                   setSelected={setSelectedCurrency}
//                 />
//               ))}
//             </div>
//           </div>

//           <div className='grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3'>
//             {TIERS.map((tier, index) => (
//               <PricingCard
//                 key={tier.id}
//                 tier={tier}
//                 paymentFrequency={selectedFrequency}
//                 selectedCurrency={selectedCurrency}
//                 index={index}
//               />
//             ))}
//           </div>

//           <div className='w-full'>
//             <div className='flex items-center justify-center gap-3 text-sm font-medium text-muted-foreground'>
//               <span className='flex items-center justify-center gap-1.5'>
//                 <Lock className='size-4 mb-0.5' />
//                 Secure payments
//               </span>
//               <span>•</span>
//               <span>Cancel anytime</span>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { PAYMENT_FREQUENCIES, TIERS } from '@/lib/pricing';
import { Tab } from './pricing-tab';
import { PricingCard } from './pricing-card';
import { Lock } from 'lucide-react';
import { CurrencyTab } from './currency-tab';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

interface PricingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PricingDialog({ open, onOpenChange }: PricingDialogProps) {
  const [selectedFrequency, setSelectedFrequency] =
    useState<(typeof PAYMENT_FREQUENCIES)[number]>('yearly');

  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isDetectingCountry, setIsDetectingCountry] = useState(true);

  const currencies = [
    { code: 'USD', symbol: '$' },
    { code: 'NGN', symbol: '₦' },
  ];

  // Auto-detect country and set currency
  useEffect(() => {
    const detectCountry = async () => {
      try {
        setIsDetectingCountry(true);
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        console.log('Location data:', data);

        // Check if user is from Nigeria
        const isNigerianUser = data.country_code === 'NG';
        console.log('Is Nigerian user:', isNigerianUser);

        // Set currency based on detected country
        if (isNigerianUser) {
          setSelectedCurrency('NGN');
          // Also set to yearly as it was in the original commented code
          setSelectedFrequency('yearly');
        } else {
          setSelectedCurrency('USD');
        }
      } catch (error) {
        console.error('Error detecting country:', error);
        // Fallback to USD if detection fails
        setSelectedCurrency('USD');
      } finally {
        setIsDetectingCountry(false);
      }
    };

    // Only detect country when dialog opens
    if (open && isDetectingCountry) {
      detectCountry();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[95%] max-h-[90vh] lg:max-w-6xl bg-sidebar/60 backdrop-blur-xl overflow-y-auto'>
        <DialogHeader className='hidden'>
          <DialogTitle>Pricing Plan</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogHeader>
        <div className='flex flex-col items-center gap-8 pt-4 '>
          <div className='flex gap-4 items-center'>
            <div className='mx-auto flex w-fit rounded-full bg-muted p-1'>
              {PAYMENT_FREQUENCIES.map((freq) => (
                <Tab
                  key={freq}
                  text={freq}
                  selected={selectedFrequency === freq}
                  setSelected={(value) =>
                    setSelectedFrequency(value as typeof selectedFrequency)
                  }
                  discount={freq === 'yearly'}
                />
              ))}
            </div>

            <div className='hidden items-center gap-1 rounded-full bg-muted p-1'>
              {currencies.map((currency) => (
                <CurrencyTab
                  key={currency.code}
                  currency={currency.code}
                  symbol={currency.symbol}
                  selected={selectedCurrency === currency.code}
                  setSelected={setSelectedCurrency}
                  // Optionally show loading state
                  // disabled={isDetectingCountry}
                />
              ))}
            </div>
          </div>

          <div className='grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {TIERS.map((tier, index) => (
              <PricingCard
                key={tier.id}
                tier={tier}
                paymentFrequency={selectedFrequency}
                selectedCurrency={selectedCurrency}
                index={index}
              />
            ))}
          </div>

          <div className='w-full'>
            <div className='flex items-center justify-center gap-3 text-sm font-medium text-muted-foreground'>
              <span className='flex items-center justify-center gap-1.5'>
                <Lock className='size-4 mb-0.5' />
                Secure payments
              </span>
              <span>•</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

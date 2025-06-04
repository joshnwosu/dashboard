'use client';

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PAYMENT_FREQUENCIES, TIERS } from '@/lib/pricing';
import { Tab } from './pricing-tab';
import { PricingCard } from './pricing-card';
import { Lock } from 'lucide-react';

interface PricingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PricingDialog({ open, onOpenChange }: PricingDialogProps) {
  const [selectedFrequency, setSelectedFrequency] =
    useState<(typeof PAYMENT_FREQUENCIES)[number]>('yearly');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[95%] max-h-[90vh] lg:max-w-6xl bg-sidebar/60 backdrop-blur-xl overflow-y-auto'>
        <div className='flex flex-col items-center gap-8 pt-4 '>
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

          <div className='grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {TIERS.map((tier, index) => (
              <PricingCard
                key={tier.id}
                tier={tier}
                paymentFrequency={selectedFrequency}
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

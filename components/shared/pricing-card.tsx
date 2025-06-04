'use client';

import * as React from 'react';
import { BadgeCheck, ArrowRight } from 'lucide-react';
import NumberFlow from '@number-flow/react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export interface PricingTier {
  name: string;
  price: Record<string, number | string>;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  popular?: boolean;
}

interface PricingCardProps {
  tier: PricingTier;
  paymentFrequency: string;
  index: number; // For staggering across cards
}

export function PricingCard({
  tier,
  paymentFrequency,
  index,
}: PricingCardProps) {
  const price = tier.price[paymentFrequency];
  const isHighlighted = tier.highlighted;
  const isPopular = tier.popular;

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Animation variants for the card
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', delay: index * 0.2 },
    },
  };

  // Animation variants for internal elements
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: index * 0.2 + 0.2 },
    },
  };

  const priceVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: index * 0.2 + 0.3 },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: index * 0.2 + 0.4 },
    },
  };

  const featuresVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: index * 0.2 + 0.5 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut', delay: index * 0.2 + 0.6 },
    },
  };

  return (
    <motion.div ref={ref} className='flex flex-1'>
      <motion.div
        variants={cardVariants}
        initial='hidden'
        animate={controls}
        className='flex flex-1'
      >
        <Card
          className={cn(
            'relative flex flex-col flex-1 gap-8 overflow-hidden p-6 font-sans',
            isHighlighted
              ? 'bg-foreground text-background'
              : 'bg-background text-foreground',
            isPopular && 'ring-2 ring-primary'
          )}
        >
          {isHighlighted && <HighlightedBackground />}
          {isPopular && <PopularBackground />}

          <motion.h2
            variants={titleVariants}
            initial='hidden'
            animate={controls}
            className='flex items-center gap-3 text-xl font-medium capitalize'
          >
            {tier.name}
            {isPopular && (
              <Badge variant='secondary' className='mt-1 z-10'>
                🔥 Most Popular
              </Badge>
            )}
          </motion.h2>

          <motion.div
            variants={priceVariants}
            initial='hidden'
            animate={controls}
            className='relative h-12 z-10'
          >
            {typeof price === 'number' ? (
              <>
                <NumberFlow
                  format={{
                    style: 'currency',
                    currency: 'USD',
                    trailingZeroDisplay: 'stripIfInteger',
                  }}
                  value={price}
                  className='text-4xl font-medium'
                />
                <p className='-mt-2 text-xs text-muted-foreground'>Per month</p>
              </>
            ) : (
              <h1 className='text-4xl font-medium'>{price}</h1>
            )}
          </motion.div>

          <motion.div
            variants={descriptionVariants}
            initial='hidden'
            animate={controls}
            className='flex-1 space-y-2'
          >
            <h3 className='text-sm font-medium'>{tier.description}</h3>
            <motion.ul
              variants={featuresVariants}
              initial='hidden'
              animate={controls}
              className='space-y-2'
            >
              {tier.features.map((feature, idx) => (
                <li
                  key={idx}
                  className={cn(
                    'flex items-center gap-2 text-sm font-medium',
                    isHighlighted ? 'text-background' : 'text-muted-foreground'
                  )}
                >
                  <BadgeCheck className='h-4 w-4' />
                  <p className='flex-1'>{feature}</p>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            initial='hidden'
            animate={controls}
          >
            <Link href='/waitlist'>
              <Button
                variant={isHighlighted ? 'secondary' : 'default'}
                className='w-full relative z-10'
              >
                {tier.cta}
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </Link>
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

const HighlightedBackground = () => (
  <div className='absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:45px_45px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] z-0' />
);

const PopularBackground = () => (
  <div className='absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))] z-0' />
);

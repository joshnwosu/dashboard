'use client';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, Clock, CreditCard, Shield, Users } from 'lucide-react';
import { formatDate, formatDateTime, formatTime } from '@/utils/formatter';

export default function PaymentPage() {
  const [isProcessing, setIsProcessing] = useState(false);

  // Payment data
  const paymentData = {
    id: 12,
    ref: 'TX-1749222417746.D17I4FR',
    status: 'pending',
    seat_count: 1,
    transaction_type: 'subscription',
    fee: '0.00',
    amount: '99000.00',
    total: '99000.00',
    payment_provider: 'paystack',
    currency_code: 'NGN',
    link_url: 'https://checkout.paystack.com/eick6xdo0ddrpwh',
    plan_id: 1,
    user_id: 2,
    company_id: 2,
    subscription_id: null,
    flw_ref: null,
    createdAt: '2025-06-06T15:07:05.000Z',
    updatedAt: '2025-06-06T15:07:05.000Z',
  };

  const formatAmount = (amount: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      window.open(paymentData.link_url, '_blank');
      setIsProcessing(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className='w-4 h-4' />;
      case 'completed':
        return <CheckCircle2 className='w-4 h-4' />;
      default:
        return <Clock className='w-4 h-4' />;
    }
  };

  return (
    <div className='flex items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-6'>
        {/* Header */}
        <div className='text-center space-y-2 hidden'>
          <div className='flex justify-center'>
            <div className='w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center'>
              <CreditCard className='w-8 h-8 text-white' />
            </div>
          </div>
          <h1 className='text-2xl font-bold text-gray-900'>
            Complete Your Payment
          </h1>
          <p className='text-gray-600'>
            Secure subscription payment via Paystack
          </p>
        </div>

        {/* Main Payment Card */}
        <Card className='border-0 shadow-lg'>
          <CardHeader className='pb-4'>
            <div className='flex items-center justify-between'>
              <CardTitle className='text-lg'>Subscription Payment</CardTitle>
              <Badge
                className={`${getStatusColor(
                  paymentData.status
                )} flex items-center gap-1`}
              >
                {getStatusIcon(paymentData.status)}
                {paymentData.status.charAt(0).toUpperCase() +
                  paymentData.status.slice(1)}
              </Badge>
            </div>
            <CardDescription>Transaction ID: {paymentData.ref}</CardDescription>
          </CardHeader>

          <CardContent className='space-y-6'>
            {/* Amount Section */}
            <div className='bg-accent rounded-lg p-4 border'>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-blue-700 font-medium'>
                  Total Amount
                </span>
                <span className='text-2xl font-bold text-blue-900'>
                  {formatAmount(paymentData.total)}
                </span>
              </div>
              {parseFloat(paymentData.fee) > 0 && (
                <div className='flex justify-between items-center mt-2 pt-2 border-t border-blue-200'>
                  <span className='text-xs text-blue-600'>Processing Fee</span>
                  <span className='text-sm text-blue-800'>
                    {formatAmount(paymentData.fee)}
                  </span>
                </div>
              )}
            </div>

            {/* Plan Details */}
            <div className='space-y-3'>
              <h3 className='font-semibold'>Plan Details</h3>
              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div className='flex items-center gap-2'>
                  <Users className='w-4 h-4 text-gray-500' />
                  <span className='text-muted-foreground'>Seats:</span>
                  <span className='font-medium'>{paymentData.seat_count}</span>
                </div>
                <div>
                  <span className='text-muted-foreground'>Plan ID:</span>
                  <span className='font-medium ml-1'>
                    {paymentData.plan_id}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Transaction Info */}
            <div className='space-y-3'>
              <h3 className='font-semibold'>Transaction Information</h3>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Type:</span>
                  <span className='font-medium capitalize'>
                    {paymentData.transaction_type}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Provider:</span>
                  <span className='font-medium capitalize'>
                    {paymentData.payment_provider}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Date:</span>
                  <span className='font-medium'>
                    {formatDate(paymentData.createdAt)}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Time:</span>
                  <span className='font-medium'>
                    {formatTime(paymentData.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className='bg-green-50 rounded-lg p-3 border border-green-100'>
              <div className='flex items-center gap-2'>
                <Shield className='w-4 h-4 text-green-600' />
                <span className='text-sm text-green-800 font-medium'>
                  Secure Payment
                </span>
              </div>
              <p className='text-xs text-green-700 mt-1'>
                Your payment is protected by Paystack's advanced security
                measures
              </p>
            </div>

            {/* Payment Button */}
            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className='w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 transition-colors'
            >
              {isProcessing ? (
                <div className='flex items-center gap-2'>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                  Processing...
                </div>
              ) : (
                <div className='flex items-center gap-2'>
                  <CreditCard className='w-5 h-5' />
                  Pay {formatAmount(paymentData.total)}
                </div>
              )}
            </Button>

            {/* Footer Note */}
            <p className='text-xs text-gray-500 text-center'>
              By proceeding, you agree to our terms of service and privacy
              policy
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

'use client';
import React, { useState, useEffect } from 'react';
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
import {
  CheckCircle2,
  Download,
  Home,
  Users,
  Calendar,
  CreditCard,
  Shield,
  Copy,
} from 'lucide-react';

export default function PaymentSuccessPage() {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Mock function to get URL parameters (in Next.js you'd use useRouter or useSearchParams)
  const getUrlParam = (param) => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    }
    return null;
  };

  // Mock function to fetch payment details by reference
  const fetchPaymentDetails = async (ref) => {
    // Simulate API call - replace with actual API endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 12,
          ref: ref || 'TX-1749222417746.D17I4FR',
          status: 'completed', // Changed to completed for success page
          seat_count: 1,
          transaction_type: 'subscription',
          fee: '0.00',
          amount: '99000.00',
          total: '99000.00',
          payment_provider: 'paystack',
          currency_code: 'NGN',
          plan_id: 1,
          user_id: 2,
          company_id: 2,
          subscription_id: 'SUB_12345678',
          plan_name: 'Professional Plan',
          billing_cycle: 'Monthly',
          next_billing_date: '2025-07-06T15:07:05.000Z',
          createdAt: '2025-06-06T15:07:05.000Z',
          updatedAt: '2025-06-06T15:07:05.000Z',
        });
      }, 1000);
    });
  };

  useEffect(() => {
    const ref = getUrlParam('ref');
    if (ref) {
      fetchPaymentDetails(ref).then((data) => {
        setPaymentData(data);
        setLoading(false);
      });
    } else {
      // Fallback data if no ref in URL
      fetchPaymentDetails().then((data) => {
        setPaymentData(data);
        setLoading(false);
      });
    }
  }, []);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const copyTransactionId = async () => {
    if (paymentData?.ref) {
      await navigator.clipboard.writeText(paymentData.ref);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleGoToDashboard = () => {
    // Navigate to dashboard
    window.location.href = '/dashboard';
  };

  const handleDownloadReceipt = () => {
    // Generate and download receipt
    console.log('Downloading receipt...');
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
        <div className='text-center space-y-4'>
          <div className='w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto'></div>
          <p className='text-gray-600'>Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
        <Card className='max-w-md w-full text-center'>
          <CardContent className='pt-8'>
            <p className='text-gray-600'>Payment information not found.</p>
            <Button
              onClick={() => (window.location.href = '/')}
              className='mt-4'
            >
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-2xl space-y-6'>
        {/* Success Header */}
        <div className='text-center space-y-4'>
          <div className='flex justify-center'>
            <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center'>
              <CheckCircle2 className='w-10 h-10 text-green-600' />
            </div>
          </div>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              Payment Successful!
            </h1>
            <p className='text-gray-600'>
              Your subscription has been activated successfully
            </p>
          </div>
        </div>

        {/* Payment Details Card */}
        <Card className='border-0 shadow-lg'>
          <CardHeader className='pb-4'>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle className='text-xl text-green-700'>
                  Subscription Activated
                </CardTitle>
                <CardDescription className='mt-1'>
                  {paymentData.plan_name} - {paymentData.billing_cycle}
                </CardDescription>
              </div>
              <Badge className='bg-green-100 text-green-800 border-green-200'>
                <CheckCircle2 className='w-4 h-4 mr-1' />
                Completed
              </Badge>
            </div>
          </CardHeader>

          <CardContent className='space-y-6'>
            {/* Amount Paid */}
            <div className='bg-green-50 rounded-lg p-6 border border-green-100'>
              <div className='text-center'>
                <p className='text-sm text-green-700 mb-1'>Amount Paid</p>
                <p className='text-3xl font-bold text-green-900'>
                  {formatAmount(paymentData.total)}
                </p>
              </div>
            </div>

            {/* Transaction Details */}
            <div className='grid md:grid-cols-2 gap-6'>
              <div className='space-y-4'>
                <h3 className='font-semibold text-gray-900 flex items-center gap-2'>
                  <CreditCard className='w-5 h-5' />
                  Transaction Details
                </h3>
                <div className='space-y-3 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Transaction ID:</span>
                    <div className='flex items-center gap-2'>
                      <code className='text-xs bg-gray-100 px-2 py-1 rounded'>
                        {paymentData.ref}
                      </code>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={copyTransactionId}
                        className='h-6 w-6 p-0'
                      >
                        <Copy className='w-3 h-3' />
                      </Button>
                    </div>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Payment Method:</span>
                    <span className='font-medium capitalize'>
                      {paymentData.payment_provider}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Date:</span>
                    <span className='font-medium'>
                      {formatDate(paymentData.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                <h3 className='font-semibold text-gray-900 flex items-center gap-2'>
                  <Calendar className='w-5 h-5' />
                  Subscription Details
                </h3>
                <div className='space-y-3 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Plan:</span>
                    <span className='font-medium'>{paymentData.plan_name}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Seats:</span>
                    <span className='font-medium flex items-center gap-1'>
                      <Users className='w-3 h-3' />
                      {paymentData.seat_count}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Next Billing:</span>
                    <span className='font-medium'>
                      {formatDate(paymentData.next_billing_date)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {copied && (
              <div className='text-center'>
                <Badge
                  variant='outline'
                  className='bg-green-50 text-green-700 border-green-200'
                >
                  Transaction ID copied to clipboard!
                </Badge>
              </div>
            )}

            <Separator />

            {/* Security Notice */}
            <div className='bg-blue-50 rounded-lg p-4 border border-blue-100'>
              <div className='flex items-start gap-3'>
                <Shield className='w-5 h-5 text-blue-600 mt-0.5' />
                <div>
                  <h4 className='text-sm font-medium text-blue-900 mb-1'>
                    Secure Transaction
                  </h4>
                  <p className='text-xs text-blue-700'>
                    Your payment was processed securely. A confirmation email
                    has been sent to your registered email address.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-3'>
              <Button
                onClick={handleGoToDashboard}
                className='flex-1 h-12 bg-blue-600 hover:bg-blue-700'
              >
                <Home className='w-5 h-5 mr-2' />
                Go to Dashboard
              </Button>
              <Button
                onClick={handleDownloadReceipt}
                variant='outline'
                className='flex-1 h-12'
              >
                <Download className='w-5 h-5 mr-2' />
                Download Receipt
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className='border border-blue-200 bg-blue-50'>
          <CardContent className='pt-6'>
            <h3 className='font-semibold text-blue-900 mb-3'>What's Next?</h3>
            <ul className='space-y-2 text-sm text-blue-800'>
              <li className='flex items-center gap-2'>
                <CheckCircle2 className='w-4 h-4 text-blue-600' />
                Your subscription is now active and ready to use
              </li>
              <li className='flex items-center gap-2'>
                <CheckCircle2 className='w-4 h-4 text-blue-600' />
                Check your email for the receipt and welcome guide
              </li>
              <li className='flex items-center gap-2'>
                <CheckCircle2 className='w-4 h-4 text-blue-600' />
                Access your dashboard to start using all features
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

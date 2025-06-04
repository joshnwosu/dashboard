'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { completeGoogleSignup } from '@/services/auth-service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2Icon, Building } from 'lucide-react';
import { PhoneInput } from '@/components/phone-input';
import { parsePhoneNumber } from 'react-phone-number-input';

const formSchema = z.object({
  company_name: z.string().min(2, {
    message: 'Company name must be at least 2 characters.',
  }),
  phone_number: z.string().min(10, {
    message: 'Phone number must be at least 10 digits.',
  }),
});

// Separate the registration form into its own component
function RegistrationForm({
  email,
  request_id,
}: {
  email: string;
  request_id: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: '',
      phone_number: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!email || !request_id) return;

    setLoading(true);
    try {
      const parsedNumber = parsePhoneNumber(values.phone_number);
      const country = parsedNumber?.country
        ? new Intl.DisplayNames(['en'], { type: 'region' }).of(
            parsedNumber.country
          )
        : '';

      await completeGoogleSignup({
        ...values,
        email,
        name: email.split('@')[0],
        country: country || '',
        reg_channel: 'google',
        user_type: 'company',
        request_id,
      });
      toast.success('Registration completed successfully');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to complete registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4'>
      <div className='w-full max-w-[400px] space-y-6'>
        <div className='text-center space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>
            Complete Your Profile
          </h1>
          <p className='text-muted-foreground'>
            Please provide additional information to complete your registration
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='company_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Building className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                      <Input
                        placeholder='Company name'
                        className='pl-10'
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phone_number'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <PhoneInput
                        placeholder='Phone number'
                        {...field}
                        defaultCountry='US'
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? (
                <>
                  <Loader2Icon className='mr-2 h-4 w-4 animate-spin' />
                  Completing Registration...
                </>
              ) : (
                'Complete Registration'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={null}>
      <OAuthContent />
    </Suspense>
  );
}

// Content component that uses useSearchParams
function OAuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get('email');
  const action = searchParams.get('action');
  const request_id = searchParams.get('request_id');
  const token = searchParams.get('token');

  useEffect(() => {
    // Handle existing user with token
    if (token && token !== 'NO-ACCESS-TOKEN') {
      // Store the token and redirect to dashboard
      localStorage.setItem('access_token', token);
      document.cookie = `access_token=${token}; path=/; SameSite=Strict`;
      router.replace('/dashboard');
      return;
    }

    // Handle invalid URL
    if (!email || !action) {
      toast.error('Invalid callback URL');
      router.push('/auth/login');
      return;
    }

    // Handle new user registration
    if (action !== 'COMPLETE_YOUR_REGISTRATION') {
      router.push('/auth/login');
      return;
    }
  }, [email, action, router, token]);

  // Don't render the form for existing users or invalid URLs
  if (
    token !== 'NO-ACCESS-TOKEN' ||
    !email ||
    !action ||
    action !== 'COMPLETE_YOUR_REGISTRATION'
  ) {
    return null;
  }

  return <RegistrationForm email={email} request_id={request_id || ''} />;
}

'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/store/userStore';
import { useEffect, useState } from 'react';
import { UserProfile } from '@/types/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/utils/formatter';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PhoneInput } from '@/components/phone-input';
import { parsePhoneNumber } from 'react-phone-number-input';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  company_name: z.string().optional(),
  phone_number: z.string().min(10, {
    message: 'Phone number must be at least 10 digits.',
  }),
  email: z.string().email().optional(),
  email_verify: z.boolean().optional(),
  phone_number_verify: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AccountSettings() {
  const { user, getUserProfile, updateUserProfile } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState('');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company_name: '',
      phone_number: '',
      email: '',
      email_verify: false,
      phone_number_verify: false,
    },
  });

  useEffect(() => {
    if (!user) {
      getUserProfile();
    } else {
      const { user_id, company_id, avatar_url, country, ...formData } = user;
      form.reset(formData);
    }
  }, [user, getUserProfile, form]);

  // Watch phone_number field to detect changes and update country
  const phoneNumber = form.watch('phone_number');

  // Auto-populate country based on phone number
  useEffect(() => {
    if (phoneNumber) {
      try {
        const parsedNumber = parsePhoneNumber(phoneNumber);
        if (parsedNumber?.country) {
          // Map country code to country name
          const countryName = new Intl.DisplayNames(['en'], {
            type: 'region',
          }).of(parsedNumber.country);
          setCountry(countryName || parsedNumber.country);
        } else {
          setCountry('');
        }
      } catch (error) {
        setCountry('');
        console.log('Error: ', error);
      }
    } else {
      setCountry('');
    }
  }, [phoneNumber]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await updateUserProfile({
        ...data,
        user_id: user?.user_id,
        company_id: user?.company_id,
        country,
      });
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <div className='flex items-center gap-4'>
          <Avatar className='h-20 w-20'>
            {/* <AvatarImage src={form.watch('avatar_url')} /> */}
            <AvatarFallback className='text-lg'>
              {getInitials(form.watch('name') || '')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
              Profile Information
            </h3>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Update your account profile information
            </p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Full Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='company_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                      Company Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Company Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                    Email
                  </FormLabel>
                  <FormControl>
                    <div className='flex items-baseline gap-4'>
                      <Input
                        type='email'
                        disabled
                        className='bg-gray-100'
                        placeholder='email@example.com'
                        {...field}
                      />

                      <div className='text-right mt-1 text-xs'>
                        {form.watch('email_verify') ? (
                          <span className='text-green-600'>✓ Verified</span>
                        ) : (
                          <Button
                            variant='outline'
                            className='cursor-pointer text-xs'
                            type='button'
                          >
                            Verify Email
                          </Button>
                        )}
                      </div>
                    </div>
                  </FormControl>

                  {/* <div className='text-right mt-1 text-xs'>
                    {form.watch('email_verify') ? (
                      <span className='text-green-600'>✓ Verified</span>
                    ) : (
                      <Button
                        variant='outline'
                        className='cursor-pointer text-xs'
                      >
                        Verify Email
                      </Button>
                    )}
                  </div> */}

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='phone_number'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <PhoneInput placeholder='Enter phone number' {...field} />
                    </FormControl>
                    {form.watch('phone_number_verify') && (
                      <span className='text-xs text-green-600 mt-1'>
                        ✓ Verified
                      </span>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <label className='text-sm font-medium block mb-1 text-gray-700 dark:text-gray-300'>
                  Country
                </label>
                <Input
                  value={country}
                  disabled
                  className='bg-gray-100'
                  placeholder='Country will be set automatically'
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-medium block mb-1 text-gray-700 dark:text-gray-300'>
                  User ID
                </label>
                <Input
                  value={user?.user_id || ''}
                  disabled
                  className='bg-gray-100'
                />
              </div>
              <div>
                <label className='text-sm font-medium block mb-1 text-gray-700 dark:text-gray-300'>
                  Company ID
                </label>
                <Input
                  value={user?.company_id || ''}
                  disabled
                  className='bg-gray-100'
                />
              </div>
            </div>

            <div className='flex justify-end mt-6'>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

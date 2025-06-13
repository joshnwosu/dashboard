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
  name: z.string().min(1, { message: 'Name is required' }).optional(),
  company_name: z.string().optional(),
  phone_number: z
    .string()
    .min(10, {
      message: 'Phone number must be at least 10 digits.',
    })
    .optional(),
  email: z.string().email().optional(),
  // email_verify: z.boolean().optional(),
  // phone_number_verify: z.boolean().optional(),
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
      // email_verify: false,
      // phone_number_verify: false,
    },
  });

  const fetchUserProfile = async () => {
    if (!user) {
      try {
        await getUserProfile();
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        toast.error('Failed to load profile data');
      }
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [user, getUserProfile]);

  useEffect(() => {
    if (user) {
      const { user_id, company_id, avatar_url, country, ...formData } = user;
      form.reset(formData);
      setCountry(user.country || '');
    }
  }, [user, form]);

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
        console.log('Error parsing phone number: ', error);
      }
    } else {
      setCountry('');
    }
  }, [phoneNumber]);

  const onSubmit = async (data: FormData) => {
    console.log('Form submitted with data:', data);
    if (!user?.user_id) {
      toast.error('User information not available');
      return;
    }

    setIsLoading(true);
    try {
      const updateData = {
        ...data,
        user_id: user.user_id,
        company_id: user.company_id,
        country,
      };

      await updateUserProfile(updateData);
      toast.success('Profile updated successfully');

      fetchUserProfile(); // Refresh user profile after update
    } catch (error: any) {
      console.error('Failed to update profile:', error);

      // Handle specific error messages from the API
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to update profile. Please try again.';

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    // TODO: Implement email verification logic
    toast.info('Email verification functionality to be implemented');
  };

  const handleVerifyPhone = async () => {
    // TODO: Implement phone verification logic
    toast.info('Phone verification functionality to be implemented');
  };

  if (!user) {
    return (
      <div className='flex items-center justify-center p-8'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto'></div>
          <p className='mt-2 text-sm text-gray-500'>Loading profile...</p>
        </div>
      </div>
    );
  }

  const {
    formState: { errors },
  } = form;

  useEffect(() => {
    console.log('Form errors:', errors);
  }, [errors]);

  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <div className='flex items-center gap-4'>
          <Avatar className='h-20 w-20'>
            <AvatarImage src={user.avatar_url} />
            <AvatarFallback className='text-lg'>
              {getInitials(form.watch('name') || user.name || '')}
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
                      <Input placeholder='Company Name' {...field} disabled />
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
                    <div className='flex items-center gap-4'>
                      <Input
                        type='email'
                        disabled
                        className='bg-gray-100 flex-1'
                        placeholder='email@example.com'
                        {...field}
                      />

                      {/* {!form.watch('email_verify') && (
                        <Button
                          variant='outline'
                          size='sm'
                          type='button'
                          onClick={handleVerifyEmail}
                        >
                          Verify Email
                        </Button>
                      )} */}
                    </div>
                  </FormControl>

                  {user.email_verify && (
                    <span className='text-xs text-green-600 flex items-center gap-1'>
                      ✓ Verified
                    </span>
                  )}

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
                      <div className='space-y-2'>
                        <PhoneInput
                          placeholder='Enter phone number'
                          {...field}
                          disabled
                        />
                        {/* {!form.watch('phone_number_verify') && field.value && (
                          <Button
                            variant='outline'
                            size='sm'
                            type='button'
                            onClick={handleVerifyPhone}
                            className='w-full'
                          >
                            Verify Phone
                          </Button>
                        )} */}
                      </div>
                    </FormControl>
                    {user.phone_number_verify && (
                      <span className='text-xs text-green-600 flex items-center gap-1'>
                        ✓ Verified
                      </span>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <label className='text-sm font-medium block mb-2 text-gray-700 dark:text-gray-300'>
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

            {/* Debug section - remove in production */}
            <div className='hidden grid-cols-2 gap-4'>
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
              <Button
                // type='submit'
                disabled={isLoading || !form.formState.isDirty}
                className='w-full sm:w-auto cursor-pointer'
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

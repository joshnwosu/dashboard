'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Building,
  Lock,
  Mail,
  MessageSquare,
  MoveRight,
  User,
} from 'lucide-react';
import { PhoneInput } from '@/components/phone-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect } from 'react';
import { parsePhoneNumber } from 'react-phone-number-input';
import Link from 'next/link';
import GoogleButton from '@/components/google-button';
import { Checkbox } from '@/components/ui/checkbox';

// Zod schema remains the same
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Fullname must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone_number: z
    .string()
    .min(10, {
      message: 'Phone number must be at least 10 digits.',
    })
    .optional(),
  country: z.string().optional(),
  company_name: z
    .string()
    .min(2, {
      message: 'Company name must be at least 2 characters.',
    })
    .optional(),
  reg_channel: z
    .string()
    // .min(2, {
    //   message: 'Please specify how you heard about us.',
    // })
    .optional(),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters long.',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter.',
    })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter.',
    })
    .regex(/[0-9]/, {
      message: 'Password must contain at least one number.',
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Password must contain at least one special character.',
    })
    .max(128, {
      message: 'Password cannot exceed 128 characters.',
    })
    .refine((val) => !/\s/.test(val), {
      message: 'Password cannot contain spaces.',
    }),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions.',
  }),
});

export default function SignupPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone_number: '',
      country: '',
      company_name: '',
      reg_channel: '',
      terms: false,
    },
  });

  // Watch phone_number field to detect changes
  const phoneNumber = form.watch('phone_number');
  const terms = form.watch('terms');

  // Auto-populate country based on phone number
  useEffect(() => {
    if (phoneNumber) {
      try {
        const parsedNumber = parsePhoneNumber(phoneNumber);
        if (parsedNumber && parsedNumber.country) {
          // Map country code to country name
          const countryName = new Intl.DisplayNames(['en'], {
            type: 'region',
          }).of(parsedNumber.country);
          form.setValue('country', countryName || parsedNumber.country, {
            shouldValidate: true,
          });
        } else {
          form.setValue('country', '', { shouldValidate: true });
        }
      } catch (error) {
        form.setValue('country', '', { shouldValidate: true });
        console.log('Error: ', error);
      }
    } else {
      form.setValue('country', '', { shouldValidate: true });
    }
  }, [phoneNumber, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Form submitted:', values);
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='space-y-6 text-center'>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <h1 className='text-3xl md:text-5xl tracking-tighter font-sans bg-clip-text text-transparent mx-auto  bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]'>
            <span>Create your account </span>
          </h1>
        </motion.div>
      </div>

      <div className='w-full max-w-[600px] mx-auto p-8 space-y-12'>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-start'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-700 dark:text-gray-200'>
                        Full name
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <User className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                          <Input
                            placeholder='Fullname'
                            className='h-12 pl-10'
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
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-700 dark:text-gray-200'>
                        Email address
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                          <Input
                            placeholder='Email address'
                            className='h-12 pl-10'
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
                      <FormLabel className='text-gray-700 dark:text-gray-200'>
                        Phone number
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <PhoneInput
                            placeholder='Phone number'
                            className='h-12'
                            {...field}
                            defaultCountry='US'
                            onChange={(value) => {
                              field.onChange(value); // Update form state
                            }}
                          />
                        </div>
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
                      <FormLabel className='text-gray-700 dark:text-gray-200'>
                        Company name
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Building className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                          <Input
                            placeholder='Company name'
                            className='h-12 pl-10'
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
                  name='reg_channel'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-700 dark:text-gray-200'>
                        How did you hear about us? (Optional)
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <MessageSquare className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className='p-[23px] pl-10 bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 w-full'>
                              <SelectValue placeholder='Select an option' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='linkedin'>LinkedIn</SelectItem>
                              <SelectItem value='twitter'>Twitter</SelectItem>
                              <SelectItem value='advertisement'>
                                Advertisement
                              </SelectItem>
                              <SelectItem value='search_engine'>
                                Search Engine
                              </SelectItem>
                              <SelectItem value='event'>
                                Event/Conference
                              </SelectItem>
                              <SelectItem value='other'>Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-700 dark:text-gray-200'>
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                          <Input
                            type='password'
                            placeholder='Enter your password'
                            className='h-12 pl-10 bg-white dark:bg-gray-800 dark:text-white'
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='terms'
                render={({ field }) => (
                  <FormItem className='flex items-center space-x-2'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className='border-gray-300 dark:border-gray-600'
                      />
                    </FormControl>
                    <FormLabel className='text-sm text-gray-700 dark:text-gray-200'>
                      I agree to the{' '}
                      <Link
                        href='/terms'
                        className='underline hover:text-blue-500 dark:hover:text-blue-400'
                      >
                        Terms and Conditions
                      </Link>
                    </FormLabel>
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                //   className='w-full py-6'
                variant='secondary'
                disabled={!terms}
                className='w-full h-12 px-6 bg-blue-500 dark:bg-blue-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed'
              >
                Continue
                <MoveRight className='ml-2 h-4 w-4' />
              </Button>

              <GoogleButton />

              <p className='text-md leading-relaxed tracking-tight text-muted-foreground text-center font-sans max-w-xl mx-auto px-4'>
                Already have an account?{' '}
                <Link href='/auth/login' className='text-blue-500'>
                  Sign in
                </Link>
              </p>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}

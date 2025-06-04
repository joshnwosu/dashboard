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
  Loader2Icon,
  Lock,
  Mail,
  MessageSquare,
  MoveRight,
  User,
  Eye,
  EyeOff,
} from 'lucide-react';
import { PhoneInput } from '@/components/phone-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { parsePhoneNumber } from 'react-phone-number-input';
import Link from 'next/link';
import GoogleButton from '@/components/google-button';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';
import { register } from '@/services/auth-service';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Zod schema remains the same
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Fullname must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone_number: z.string().min(10, {
    message: 'Phone number must be at least 10 digits.',
  }),
  country: z.string(),
  company_name: z.string().min(2, {
    message: 'Company name must be at least 2 characters.',
  }),
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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    setLoading(true);
    try {
      const { terms, ...payload } = values; // omit terms
      await register({ ...payload, user_type: 'company' });
      router.push('/auth/login');
      toast.success('Registration successful');
    } catch (err: any) {
      console.error('Login failed:', err);
      toast.error(err.response.data.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='container relative flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0'>
      <div className='mx-auto w-full max-w-[600px] space-y-6'>
        <Card>
          <CardHeader className='text-center'>
            <CardTitle className='text-2xl'>Create your account</CardTitle>
            <CardDescription>
              Sign up to get started with Sourzer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
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
                        <FormLabel className='text-gray-700 dark:text-gray-200'>
                          Phone number
                        </FormLabel>
                        <FormControl>
                          <div className='relative'>
                            <PhoneInput
                              placeholder='Phone number'
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
                              <SelectTrigger className='pl-10 bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 w-full'>
                                <SelectValue placeholder='Select an option' />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value='linkedin'>
                                  LinkedIn
                                </SelectItem>
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
                              type={showPassword ? 'text' : 'password'}
                              placeholder='Enter your password'
                              className='pl-10 pr-10'
                              {...field}
                            />
                            <Button
                              type='button'
                              variant='ghost'
                              size='icon'
                              className='absolute right-0 top-1/2 transform -translate-y-1/2 h-full px-3 py-2 hover:bg-transparent'
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className='h-5 w-5 text-gray-400' />
                              ) : (
                                <Eye className='h-5 w-5 text-gray-400' />
                              )}
                            </Button>
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
                  className='w-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200'
                  disabled={!terms || loading}
                >
                  {loading ? (
                    <>
                      <Loader2Icon className='mr-2 h-4 w-4 animate-spin' />
                      Loading...
                    </>
                  ) : (
                    <>
                      Continue
                      <MoveRight className='ml-2 h-4 w-4' />
                    </>
                  )}
                </Button>

                <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                  <span className='bg-card text-muted-foreground relative z-10 px-2'>
                    Or continue with
                  </span>
                </div>

                <GoogleButton buttonText='Sign up with Google' />

                <div className='text-center text-sm'>
                  Already have an account?{' '}
                  <Link
                    href='/auth/login'
                    className='underline underline-offset-4'
                  >
                    Log in
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
          By clicking continue, you agree to our{' '}
          <Link href='#'>Terms of Service</Link> and{' '}
          <Link href='#'>Privacy Policy</Link>.
        </div>
      </div>
    </div>
  );
}

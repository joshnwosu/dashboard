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
import { Loader2Icon, Lock, Mail, MoveRight } from 'lucide-react';
import GoogleButton from '@/components/google-button';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { login } from '@/services/auth-service';
import { toast } from 'sonner';
import { Suspense } from 'react';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long.',
  }),
});

// Separate component for content using useSearchParams
function LoginContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/dashboard';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await login(values.email, values.password);
      toast.success('Logged in successfully');
      router.replace(from);
      console.log('This place...');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      className='w-full max-w-[400px] mx-auto p-8 space-y-12 bg-sidebar border rounded-2xl'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='grid grid-cols-1 gap-4 items-start'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel className='text-gray-700 dark:text-gray-200'>
                      Email address
                    </FormLabel> */}
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
              name='password'
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel className='text-gray-700 dark:text-gray-200'>
                      Password
                    </FormLabel> */}
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

            <div className='flex flex-col items-end'>
              <Link href='/forgot-password' className='text-blue-500 text-sm'>
                Forgot password?
              </Link>
            </div>
          </div>

          <Button
            type='submit'
            variant='secondary'
            className='w-full h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200'
            disabled={loading}
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

          <GoogleButton />

          <p className='text-md leading-relaxed tracking-tight text-sm text-muted-foreground text-center font-sans max-w-xl mx-auto px-4'>
            Not using Sourzer yet?{' '}
            <Link href='/auth/signup' className='text-blue-500'>
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <div className='w-full flex flex-col items-center justify-center p-4'>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className='space-y-6 text-center mb-4'
      >
        <h1 className='text-4xl tracking-tighter font-sans bg-clip-text text-transparent mx-auto bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]'>
          <span>Log in </span>
        </h1>
      </motion.div>

      <Suspense fallback={<div>Loading...</div>}>
        <LoginContent />
      </Suspense>
    </div>
  );
}

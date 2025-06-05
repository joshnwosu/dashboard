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
  Loader2Icon,
  Lock,
  Mail,
  MoveRight,
  Shield,
  Eye,
  EyeOff,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { resetPassword, sendOtp, verifyOtp } from '@/services/auth-service';
import { ResetPasswordPayload } from '@/types/auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuthStore } from '@/store/authStore';

// Step 1: Email validation schema
const emailSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

type EmailFormValues = z.infer<typeof emailSchema>;

// Step 2: OTP validation schema
const otpSchema = z.object({
  otp1: z.string().min(1, 'Required').max(1, 'Max 1 digit'),
  otp2: z.string().min(1, 'Required').max(1, 'Max 1 digit'),
  otp3: z.string().min(1, 'Required').max(1, 'Max 1 digit'),
  otp4: z.string().min(1, 'Required').max(1, 'Max 1 digit'),
  otp5: z.string().min(1, 'Required').max(1, 'Max 1 digit'),
  otp6: z.string().min(1, 'Required').max(1, 'Max 1 digit'),
});

type OtpFormValues = z.infer<typeof otpSchema>;

// Step 3: Password validation schema
const passwordSchema = z
  .object({
    newPassword: z
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
    confirmPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters long.',
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

function ForgotPasswordContent() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    setResetPasswordEmail,
    setResetPasswordOtp,
    resetPasswordEmail,
    resetPasswordOtp,
    clearResetPasswordData,
  } = useAuthStore();
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Form instances for each step
  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: resetPasswordEmail || '',
    },
  });

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      otp6: '',
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const fieldName = `otp${index + 1}` as keyof z.infer<typeof otpSchema>;
    otpForm.setValue(fieldName, value);

    // Auto-focus next field
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (
      e.key === 'Backspace' &&
      !otpForm.getValues(
        `otp${index + 1}` as keyof z.infer<typeof otpSchema>
      ) &&
      index > 0
    ) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);

    for (let i = 0; i < 6; i++) {
      const fieldName = `otp${i + 1}` as keyof z.infer<typeof otpSchema>;
      otpForm.setValue(fieldName, pastedData[i] || '');
    }
  };

  // Step 1: Send OTP to email
  async function onEmailSubmit(values: EmailFormValues) {
    setLoading(true);
    try {
      await sendOtp({
        email: values.email,
        type: 'password',
      });
      setResetPasswordEmail(values.email);
      toast.success('OTP sent to your email');
      setCurrentStep(2);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  }

  // Step 2: Verify OTP
  async function onOtpSubmit(values: OtpFormValues) {
    setLoading(true);
    try {
      const otp = `${values.otp1}${values.otp2}${values.otp3}${values.otp4}${values.otp5}${values.otp6}`;

      if (!resetPasswordEmail) {
        throw new Error('Email not found. Please start over.');
      }

      await verifyOtp({
        email: resetPasswordEmail,
        otp,
      });

      setResetPasswordOtp(otp);
      toast.success('OTP verified successfully');
      setCurrentStep(3);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  }

  // Step 3: Reset password
  async function onPasswordSubmit(values: PasswordFormValues) {
    setLoading(true);
    try {
      if (!resetPasswordEmail || !resetPasswordOtp) {
        throw new Error('Missing required data. Please start over.');
      }

      const payload: ResetPasswordPayload = {
        otp: resetPasswordOtp,
        email: resetPasswordEmail,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      };

      await resetPassword(payload);
      clearResetPasswordData();
      toast.success('Password reset successfully');
      router.replace('/auth/login');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Reset Password';
      case 2:
        return 'Verify Email';
      case 3:
        return 'Create New Password';
      default:
        return 'Reset Password';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "Enter your email address and we'll send you a verification code";
      case 2:
        return `Enter the 6-digit code sent to ${resetPasswordEmail}`;
      case 3:
        return 'Create a new password for your account';
      default:
        return '';
    }
  };

  return (
    <Card className='w-full max-w-[400px] mx-auto'>
      <CardHeader className='space-y-2'>
        <CardTitle className='text-2xl text-center'>{getStepTitle()}</CardTitle>
        <CardDescription className='text-center'>
          {getStepDescription()}
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-8'>
        {/* Step indicator */}
        <div className='flex justify-center items-center space-x-2 mb-6'>
          {[1, 2, 3].map((step) => (
            <div key={step} className='flex items-center'>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : step < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                }`}
              >
                {step < currentStep ? '✓' : step}
              </div>
              {step < 3 && (
                <div
                  className={`w-8 h-0.5 mx-2 ${
                    step < currentStep
                      ? 'bg-green-500'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Back button */}
        {currentStep > 1 && (
          <Button
            type='button'
            variant='ghost'
            size='sm'
            onClick={goBack}
            className='mb-4 p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
          >
            <ArrowLeft className='h-4 w-4 mr-1' />
            Back
          </Button>
        )}

        {/* Step 1: Email Input */}
        {currentStep === 1 && (
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(onEmailSubmit)}
              className='space-y-6'
            >
              <FormField
                control={emailForm.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          placeholder='Enter your email address'
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                className='w-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200'
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2Icon className='mr-2 h-4 w-4 animate-spin' />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    Send Verification Code
                    <ChevronRight className='ml-2 h-4 w-4' />
                  </>
                )}
              </Button>
            </form>
          </Form>
        )}

        {/* Step 2: OTP Input */}
        {currentStep === 2 && (
          <Form {...otpForm}>
            <form
              onSubmit={otpForm.handleSubmit(onOtpSubmit)}
              className='space-y-6'
            >
              <div className='space-y-4'>
                <div className='flex items-center gap-2 mb-2 justify-center'>
                  <Shield className='h-4 w-4 text-gray-400' />
                  <span className='text-sm text-muted-foreground'>
                    Enter verification code
                  </span>
                </div>
                <div className='flex gap-2 justify-center'>
                  {[1, 2, 3, 4, 5, 6].map((index) => (
                    <FormField
                      key={index}
                      control={otpForm.control}
                      name={`otp${index}` as keyof z.infer<typeof otpSchema>}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              ref={(el) => {
                                otpRefs.current[index - 1] = el;
                              }}
                              type='text'
                              inputMode='numeric'
                              maxLength={1}
                              className='w-12 h-12 text-center text-lg font-semibold bg-white dark:bg-gray-800'
                              onChange={(e) =>
                                handleOtpChange(index - 1, e.target.value)
                              }
                              onKeyDown={(e) => handleOtpKeyDown(index - 1, e)}
                              onPaste={handleOtpPaste}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                {/* Show OTP validation errors */}
                {(otpForm.formState.errors.otp1 ||
                  otpForm.formState.errors.otp2 ||
                  otpForm.formState.errors.otp3 ||
                  otpForm.formState.errors.otp4 ||
                  otpForm.formState.errors.otp5 ||
                  otpForm.formState.errors.otp6) && (
                  <p className='text-sm text-red-500 text-center'>
                    Please enter all 6 digits
                  </p>
                )}
              </div>

              <Button
                type='submit'
                className='w-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200'
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2Icon className='mr-2 h-4 w-4 animate-spin' />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify Code
                    <ChevronRight className='ml-2 h-4 w-4' />
                  </>
                )}
              </Button>

              <p className='text-sm text-muted-foreground text-center'>
                Didn't receive the code?{' '}
                <button
                  type='button'
                  className='text-blue-500 hover:underline'
                  onClick={() =>
                    resetPasswordEmail &&
                    onEmailSubmit({ email: resetPasswordEmail })
                  }
                >
                  Resend
                </button>
              </p>
            </form>
          </Form>
        )}

        {/* Step 3: Password Input */}
        {currentStep === 3 && (
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
              className='space-y-6'
            >
              <div className='space-y-4'>
                <FormField
                  control={passwordForm.control}
                  name='newPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className='relative'>
                          <Input
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder='Enter new password'
                            {...field}
                          />
                          <button
                            type='button'
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'
                          >
                            {showNewPassword ? (
                              <EyeOff className='h-5 w-5' />
                            ) : (
                              <Eye className='h-5 w-5' />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className='relative'>
                          <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder='Confirm new password'
                            {...field}
                          />
                          <button
                            type='button'
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'
                          >
                            {showConfirmPassword ? (
                              <EyeOff className='h-5 w-5' />
                            ) : (
                              <Eye className='h-5 w-5' />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type='submit'
                className='w-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200'
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2Icon className='mr-2 h-4 w-4 animate-spin' />
                    Resetting Password...
                  </>
                ) : (
                  <>
                    Reset Password
                    <MoveRight className='ml-2 h-4 w-4' />
                  </>
                )}
              </Button>
            </form>
          </Form>
        )}

        <div className='text-center text-sm'>
          Remember your password?{' '}
          <Link href='/auth/login' className='underline underline-offset-4'>
            Back to Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ForgotPasswordPage() {
  return (
    <div className='container relative flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0'>
      <div className='mx-auto w-full max-w-[400px] space-y-6'>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <ForgotPasswordContent />
        </motion.div>
      </div>
    </div>
  );
}

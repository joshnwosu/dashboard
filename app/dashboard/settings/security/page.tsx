'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUserStore } from '@/store/userStore';
import { useEffect, useState } from 'react';
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
import { Eye, EyeOff } from 'lucide-react';

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: 'Current password is required' }),
    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        {
          message:
            'Password must contain uppercase, lowercase, number, and special character',
        }
      ),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function SecuritySettings() {
  const { user, getUserProfile } = useUserStore();
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (!user) {
      getUserProfile();
    }
  }, [user, getUserProfile]);

  const onPasswordSubmit = async (data: PasswordFormData) => {
    setIsPasswordLoading(true);
    try {
      // await updatePassword({
      //   currentPassword: data.currentPassword,
      //   newPassword: data.newPassword,
      // });
      toast.success('Password updated successfully');
      passwordForm.reset();
    } catch (error) {
      console.error('Failed to update password:', error);
      toast.error(
        'Failed to update password. Please check your current password.'
      );
    } finally {
      setIsPasswordLoading(false);
    }
  };

  const handleEmailVerification = async () => {
    if (!user?.email) {
      toast.error('No email address found');
      return;
    }

    setIsEmailLoading(true);
    try {
      // await sendEmailVerification(user.email);
      toast.success('Verification email sent! Please check your inbox.');
    } catch (error) {
      console.error('Failed to send verification email:', error);
      toast.error('Failed to send verification email. Please try again.');
    } finally {
      setIsEmailLoading(false);
    }
  };

  const toggle2FA = () => {
    // This would typically call an API to enable/disable 2FA
    setIs2FAEnabled(!is2FAEnabled);
    toast.success(is2FAEnabled ? '2FA disabled' : '2FA enabled');
  };

  return (
    <div className='space-y-6'>
      {/* Password Section */}
      <div className='space-y-4'>
        <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
          Change Password
        </h3>
        <Form {...passwordForm}>
          <form
            onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
            className='space-y-4'
          >
            <FormField
              control={passwordForm.control}
              name='currentPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                    Current Password
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showCurrentPassword ? 'text' : 'password'}
                        placeholder='Enter current password'
                        {...field}
                      />
                      <button
                        type='button'
                        className='absolute inset-y-0 right-0 pr-3 flex items-center'
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? (
                          <EyeOff className='h-4 w-4 text-gray-400' />
                        ) : (
                          <Eye className='h-4 w-4 text-gray-400' />
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
              name='newPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                    New Password
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder='Enter new password'
                        {...field}
                      />
                      <button
                        type='button'
                        className='absolute inset-y-0 right-0 pr-3 flex items-center'
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className='h-4 w-4 text-gray-400' />
                        ) : (
                          <Eye className='h-4 w-4 text-gray-400' />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                    Must be at least 8 characters with uppercase, lowercase,
                    number, and special character
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={passwordForm.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                    Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder='Confirm new password'
                        {...field}
                      />
                      <button
                        type='button'
                        className='absolute inset-y-0 right-0 pr-3 flex items-center'
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className='h-4 w-4 text-gray-400' />
                        ) : (
                          <Eye className='h-4 w-4 text-gray-400' />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end'>
              <Button type='submit' disabled={isPasswordLoading}>
                {isPasswordLoading ? 'Updating...' : 'Update Password'}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Email Verification Section */}
      <div className='space-y-4'>
        <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
          Email Verification
        </h3>
        <div className='space-y-3'>
          <div className='flex items-center justify-between p-4 border bg-sidebar rounded-lg'>
            <div>
              <p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                Email Address: {user?.email || 'No email set'}
              </p>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                {user?.email_verify
                  ? '✓ Your email is verified'
                  : 'Please verify your email address for account security'}
              </p>
            </div>
            {!user?.email_verify && user?.email && (
              <Button
                onClick={handleEmailVerification}
                disabled={isEmailLoading}
                variant='outline'
              >
                {isEmailLoading ? 'Sending...' : 'Send Verification'}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication Section */}
      <div className='space-y-4'>
        <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
          Two-Factor Authentication
        </h3>
        <div className='space-y-3'>
          <div className='flex items-center justify-between p-4 border bg-sidebar rounded-lg'>
            <div>
              <p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                {is2FAEnabled ? '2FA is enabled' : '2FA is disabled'}
              </p>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                {is2FAEnabled
                  ? 'Your account has an extra layer of security'
                  : 'Add an extra layer of security to your account'}
              </p>
            </div>
            <Button
              onClick={toggle2FA}
              variant={is2FAEnabled ? 'destructive' : 'default'}
            >
              {is2FAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

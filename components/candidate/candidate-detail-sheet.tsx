'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Bookmark,
  MapPin,
  Building,
  Mail,
  ExternalLink,
  Clock,
  Award,
  Star,
  CheckCircle,
  MessageSquare,
  Copy,
  Phone,
  Globe,
  UserCheck,
  Send,
  Calendar,
} from 'lucide-react';
import { GithubIcon, GmailIcon, LinkedinIcon } from '@/icon';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Candidate } from '@/types/candidate';
import { copyToClipboard, formatDate, formatDateTime } from '@/utils/formatter';
import Avatar from './avatar';

const CandidateDetailSheet = ({
  item,
  open,
  onOpenChange,
}: {
  item: Candidate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string, field: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  if (!item) return null;

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation?.toLowerCase()) {
      case 'strong':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'consider':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'weak':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='min-w-[500px] sm:w-[800px] overflow-y-auto p-8'>
        <SheetHeader className='space-y-4 pb-6'>
          <div className='flex items-start gap-4'>
            <Avatar
              src={item.profile_pic_url}
              name={item.name}
              size='large'
              index={0}
              hasAnimated={true}
            />
            <div className='flex-1 space-y-2'>
              <div className='flex items-start justify-between'>
                <div>
                  <SheetTitle className='text-2xl font-bold'>
                    {item.name}
                  </SheetTitle>
                  <p className='text-muted-foreground text-lg'>
                    @{item.username}
                  </p>
                </div>
                <div className='flex gap-2'>
                  <Badge className={getStatusColor(item.platform)}>
                    {item.platform}
                  </Badge>
                  {item.shortlist && (
                    <Badge variant='secondary'>
                      <Bookmark className='w-3 h-3 mr-1' />
                      Shortlisted
                    </Badge>
                  )}
                </div>
              </div>

              <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                {item.current_role && (
                  <div className='flex items-center gap-1'>
                    <Building className='w-4 h-4' />
                    <span>{item.current_role}</span>
                  </div>
                )}
                <div className='flex items-center gap-1'>
                  <MapPin className='w-4 h-4' />
                  <span>{item.country}</span>
                </div>
                <div className='flex items-center gap-1'>
                  <Clock className='w-4 h-4' />
                  <span>{item.timezone}</span>
                </div>
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className='space-y-8'>
          {/* Assessment Section */}
          <section className='space-y-4'>
            <h3 className='text-lg font-semibold flex items-center gap-2'>
              <Award className='w-5 h-5' />
              Assessment
            </h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='p-4 rounded-lg border bg-card'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm font-medium'>Talent Score</span>
                  <Star className='w-4 h-4 text-yellow-500' />
                </div>
                <div className='text-2xl font-bold text-primary'>
                  {item.talent_score}/100
                </div>
              </div>

              <div className='p-4 rounded-lg border bg-card'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm font-medium'>Recommendation</span>
                  <CheckCircle className='w-4 h-4 text-green-500' />
                </div>
                <Badge
                  className={getRecommendationColor(
                    item.overall_recommendation || ''
                  )}
                >
                  {item.overall_recommendation || 'Not Available'}
                </Badge>
              </div>
            </div>

            {item.justification && (
              <div className='p-4 rounded-lg border bg-card space-y-2'>
                <div className='flex items-center gap-2'>
                  <MessageSquare className='w-4 h-4' />
                  <span className='font-medium'>Justification</span>
                </div>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                  {item.justification}
                </p>
              </div>
            )}
          </section>

          <Separator />

          {/* Contact Information */}
          <section className='space-y-4'>
            <h3 className='text-lg font-semibold flex items-center gap-2'>
              <Mail className='w-5 h-5' />
              Contact Information
            </h3>
            <div className='space-y-3'>
              {item.email && (
                <div className='flex items-center justify-between p-3 rounded-lg border bg-card'>
                  <div className='flex items-center gap-3'>
                    <Mail className='w-4 h-4 text-muted-foreground' />
                    <span className='font-medium'>Email</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm text-muted-foreground'>
                      {item.email}
                    </span>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleCopy(item.email, 'email')}
                    >
                      {copiedField === 'email' ? (
                        <CheckCircle className='w-4 h-4 text-green-500' />
                      ) : (
                        <Copy className='w-4 h-4' />
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {item.phone && (
                <div className='flex items-center justify-between p-3 rounded-lg border bg-card'>
                  <div className='flex items-center gap-3'>
                    <Phone className='w-4 h-4 text-muted-foreground' />
                    <span className='font-medium'>Phone</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm text-muted-foreground'>
                      {item.phone}
                    </span>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleCopy(item.phone, 'phone')}
                    >
                      {copiedField === 'phone' ? (
                        <CheckCircle className='w-4 h-4 text-green-500' />
                      ) : (
                        <Copy className='w-4 h-4' />
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </section>

          <Separator />

          {/* Social Profiles */}
          <section className='space-y-4'>
            <h3 className='text-lg font-semibold flex items-center gap-2'>
              <Globe className='w-5 h-5' />
              Social Profiles
            </h3>
            <div className='space-y-3'>
              {[
                {
                  label: 'LinkedIn',
                  url: item.linkedin_url,
                  icon: LinkedinIcon,
                },
                { label: 'GitHub', url: item.github_url, icon: GithubIcon },
                { label: 'Profile', url: item.profile_url, icon: ExternalLink },
                { label: 'Website', url: item.website, icon: Globe },
              ].map(
                ({ label, url, icon: Icon }) =>
                  url && (
                    <div
                      key={label}
                      className='flex items-center justify-between p-3 rounded-lg border bg-card'
                    >
                      <div className='flex items-center gap-3'>
                        <Icon className='w-4 h-4 text-muted-foreground' />
                        <span className='font-medium'>{label}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <a
                          href={url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-sm text-primary hover:underline truncate max-w-[200px]'
                        >
                          {url}
                        </a>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => handleCopy(url, label.toLowerCase())}
                        >
                          {copiedField === label.toLowerCase() ? (
                            <CheckCircle className='w-4 h-4 text-green-500' />
                          ) : (
                            <Copy className='w-4 h-4' />
                          )}
                        </Button>
                      </div>
                    </div>
                  )
              )}
            </div>
          </section>

          <Separator />

          {/* Activity Status */}
          <section className='space-y-4'>
            <h3 className='text-lg font-semibold flex items-center gap-2'>
              <UserCheck className='w-5 h-5' />
              Activity Status
            </h3>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              <div className='p-4 rounded-lg border bg-card text-center'>
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                    item.email_sent
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}
                >
                  <Send className='w-3 h-3' />
                  Email {item.email_sent ? 'Sent' : 'Not Sent'}
                </div>
              </div>

              <div className='p-4 rounded-lg border bg-card text-center'>
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                    item.interview_booked
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}
                >
                  <Calendar className='w-3 h-3' />
                  Interview {item.interview_booked ? 'Booked' : 'Not Booked'}
                </div>
              </div>

              <div className='p-4 rounded-lg border bg-card text-center'>
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                    item.shortlist
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}
                >
                  <Bookmark className='w-3 h-3' />
                  {item.shortlist ? 'Shortlisted' : 'Not Shortlisted'}
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Timeline */}
          <section className='space-y-4'>
            <h3 className='text-lg font-semibold flex items-center gap-2'>
              <Clock className='w-5 h-5' />
              Timeline
            </h3>
            <div className='space-y-3'>
              <div className='flex items-center justify-between p-3 rounded-lg border bg-card'>
                <span className='font-medium'>Profile Created</span>
                <span className='text-sm text-muted-foreground'>
                  {formatDate(item.createdAt)}
                </span>
              </div>
              <div className='flex items-center justify-between p-3 rounded-lg border bg-card'>
                <span className='font-medium'>Last Updated</span>
                <span className='text-sm text-muted-foreground'>
                  {formatDate(item.updatedAt)}
                </span>
              </div>
              <div className='flex items-center justify-between p-3 rounded-lg border bg-card'>
                <span className='font-medium'>Last Profile Sync</span>
                <span className='text-sm text-muted-foreground'>
                  {formatDateTime(item.last_profile_sync)}
                </span>
              </div>
            </div>
          </section>

          {/* Actions */}
          <section className='space-y-4 pt-4'>
            <div className='flex flex-col sm:flex-row gap-3'>
              <Button
                className='flex-1'
                onClick={() => window.open(item.profile_url, '_blank')}
              >
                <ExternalLink className='w-4 h-4 mr-2' />
                View Profile
              </Button>
              <Button variant='outline' className='flex-1'>
                <Send className='w-4 h-4 mr-2' />
                Send Email
              </Button>
              <Button variant='outline' className='flex-1'>
                <Bookmark className='w-4 h-4 mr-2' />
                {item.shortlist ? 'Remove from Shortlist' : 'Add to Shortlist'}
              </Button>
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CandidateDetailSheet;

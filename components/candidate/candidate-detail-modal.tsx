'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  Minimize,
  Expand,
  X,
  Code,
  Users,
  Target,
  TrendingUp,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Download,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  FileText,
  Minimize2,
  Maximize,
  Maximize2,
} from 'lucide-react';
import { GithubIcon, GmailIcon, LinkedinIcon } from '@/icon';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Candidate, CandidateData } from '@/types/candidate';
import { copyToClipboard, formatDate, formatDateTime } from '@/utils/formatter';
import Avatar from './avatar';
import { ScrollArea } from '../ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

// Skeleton components
const ProfileHeaderSkeleton = () => (
  <div className='p-6'>
    <div className='flex items-start space-x-4'>
      <Skeleton className='w-16 h-16 rounded-full' />
      <div className='flex-1 space-y-2'>
        <Skeleton className='h-6 w-48' />
        <div className='flex items-center space-x-2'>
          <Skeleton className='w-4 h-4' />
          <Skeleton className='h-4 w-24' />
        </div>
      </div>
    </div>
  </div>
);

const TabsSkeleton = () => (
  <div className='flex overflow-x-auto border-b'>
    <Skeleton className='h-12 w-24 rounded-none' />
    <Skeleton className='h-12 w-28 rounded-none' />
  </div>
);

const SectionCardSkeleton = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => (
  <div className='bg-sidebar rounded-lg p-6'>
    {title && <Skeleton className='h-5 w-32 mb-4' />}
    {children}
  </div>
);

const AboutSectionSkeleton = () => (
  <SectionCardSkeleton>
    <div className='space-y-2'>
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-3/4' />
      <Skeleton className='h-4 w-5/6' />
    </div>
  </SectionCardSkeleton>
);

const SkillsSkeleton = () => (
  <SectionCardSkeleton>
    <div className='flex flex-wrap gap-2'>
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className='h-7 w-20 rounded-full' />
      ))}
    </div>
  </SectionCardSkeleton>
);

const ResumeSkeleton = () => (
  <SectionCardSkeleton>
    <div className='flex items-center justify-between p-4 bg-muted/50 rounded-lg'>
      <div className='flex items-center space-x-3'>
        <Skeleton className='w-8 h-8 rounded' />
        <div className='space-y-1'>
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-3 w-12' />
        </div>
      </div>
      <Skeleton className='h-8 w-20' />
    </div>
  </SectionCardSkeleton>
);

const AssessmentSkeleton = () => (
  <SectionCardSkeleton>
    <div className='space-y-4'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className='flex items-center justify-between'>
          <Skeleton className='h-4 w-24' />
          <div className='flex items-center space-x-2'>
            <Skeleton className='w-24 h-2 rounded-full' />
            <Skeleton className='h-4 w-8' />
          </div>
        </div>
      ))}
    </div>
  </SectionCardSkeleton>
);

const ContactSkeleton = () => (
  <SectionCardSkeleton>
    <div className='space-y-3'>
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Skeleton className='w-4 h-4' />
            <Skeleton className='h-4 w-40' />
          </div>
          <Skeleton className='w-8 h-8' />
        </div>
      ))}
    </div>
  </SectionCardSkeleton>
);

const CandidateDetailSkeleton = ({ isExpanded }: { isExpanded: boolean }) => (
  <>
    {/* Header */}
    <div className='flex items-center justify-between p-4 border-b'>
      <Skeleton className='h-6 w-36' />
      <div className='flex items-center space-x-2'>
        <Skeleton className='w-8 h-8' />
        <Skeleton className='w-8 h-8' />
      </div>
    </div>

    <div className='overflow-y-auto h-full'>
      {/* Profile Header Skeleton */}
      <ProfileHeaderSkeleton />

      {/* Tabs Skeleton */}
      <TabsSkeleton />

      {/* Content Skeleton */}
      <div className='p-6 space-y-6'>
        <AboutSectionSkeleton />
        <SkillsSkeleton />
        <ResumeSkeleton />
        <ResumeSkeleton /> {/* Portfolio section */}
        <SectionCardSkeleton>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-48' />
            <Skeleton className='h-3 w-32' />
            <Skeleton className='h-3 w-40' />
          </div>
        </SectionCardSkeleton>
        <AssessmentSkeleton />
        <ContactSkeleton />
      </div>
    </div>
  </>
);

const CandidateDetailModal = ({
  item,
  open,
  onOpenChange,
  isLoading = false,
}: {
  item: CandidateData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLoading?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('application');

  const handleCopy = async (text: string, field: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const tabs = [
    { id: 'application', label: 'Application' },
    { id: 'social-media', label: 'Social Media' },
  ];

  // Add these interfaces at the top of your file:
  interface Tab {
    id: string;
    label: string;
  }

  interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    setActiveTab: (id: string) => void;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`${
          isExpanded ? '!max-w-7xl w-[90vw]' : '!max-w-2xl w-full'
        } h-[85vh] p-0 transition-all duration-300 ease-in-out gap-0 overflow-hidden [&>button]:hidden`}
      >
        {isLoading || !item ? (
          <CandidateDetailSkeleton isExpanded={isExpanded} />
        ) : (
          <div className='h-full overflow-auto'>
            {/* Header */}
            <DialogHeader className='flex flex-row items-center justify-between p-4 border-b space-y-0'>
              <DialogTitle className='text-lg font-semibold'>
                Candidate Details
              </DialogTitle>

              <div className='flex items-center space-x-2'>
                <Button
                  onClick={() => setIsExpanded(!isExpanded)}
                  variant='ghost'
                  size='sm'
                >
                  {isExpanded ? (
                    <Minimize2 className='w-4 h-4' />
                  ) : (
                    <Maximize2 className='w-4 h-4' />
                  )}
                </Button>
                <Button
                  onClick={() => onOpenChange(false)}
                  variant='ghost'
                  size='sm'
                >
                  <X className='w-4 h-4' />
                </Button>
              </div>
            </DialogHeader>
            {/* Profile Header */}
            <div className='p-6 border-b'>
              <div className='flex items-start space-x-4'>
                <div className='w-16 h-16 bg-muted rounded-full flex items-center justify-center'>
                  {item?.name && (
                    <span className='text-xl font-semibold text-muted-foreground'>
                      {item?.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  )}
                </div>
                <div className='flex-1'>
                  <h3 className='text-xl font-semibold mb-1'>{item?.name}</h3>
                  <div className='flex items-center mb-3'>
                    <MapPin className='w-4 h-4 mr-1 text-muted-foreground' />
                    <span className='text-sm text-muted-foreground'>
                      {item.cv_score_result.candidates.profile_info.nationality}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className='flex overflow-x-auto border-b'>
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-4 text-sm font-medium border-b-2 transition-colors text-nowrap ${
                      isActive
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-muted-foreground hover:text-muted-foreground/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <ScrollArea className='flex-1 overflow-y-auto'>
              {activeTab === 'application' && (
                <div className='p-6 space-y-6'>
                  <div className='bg-sidebar rounded-lg p-6'>
                    <h4 className='text-base font-semibold mb-3'>
                      About {item?.name?.split(' ')[0]}
                    </h4>
                    <p className='text-sm text-muted-foreground leading-loose'>
                      {item.justification}
                    </p>
                  </div>

                  {/* Top Skills */}
                  <div className='bg-sidebar rounded-lg p-6'>
                    <h4 className='text-base font-semibold mb-4'>Top Skills</h4>
                    <div className='flex flex-wrap gap-2'>
                      {item.cv_score_result.candidates.scores.technical_skills.list_of_techinical_skills
                        .slice(0, 8)
                        .map((skill, index) => (
                          <span
                            key={index}
                            className='px-4 py-1 bg-muted text-muted-foreground border text-sm rounded-full'
                          >
                            {skill}
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Resume */}
                  <div className='bg-sidebar rounded-lg p-6 hidden'>
                    <h4 className='text-base font-semibold mb-4'>Resume</h4>
                    <div className='flex items-center justify-between p-4 bg-muted/50 rounded-lg'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-8 h-8 bg-red-500 rounded flex items-center justify-center'>
                          <FileText className='w-4 h-4 text-white' />
                        </div>
                        <div>
                          <p className='text-sm font-medium text-muted-foreground'>
                            {item?.name
                              ? `${item?.name.replace(' ', '_')}_`
                              : ''}
                            Resume.pdf
                          </p>
                          <p className='text-xs text-gray-500'>280KB</p>
                        </div>
                      </div>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-gray-600'
                      >
                        <Download className='w-4 h-4 mr-1' />
                        Download
                      </Button>
                    </div>
                  </div>

                  {/* Portfolio */}
                  {item.cv_score_result.candidates.social_media_links
                    .portfolio && (
                    <div className='bg-sidebar rounded-lg p-6'>
                      <h4 className='text-base font-semibold mb-4'>
                        Portfolio
                      </h4>
                      <div className='flex items-center justify-between p-4 bg-muted/50 rounded-lg'>
                        <div className='flex items-center space-x-3'>
                          <Globe className='w-5 h-5 text-gray-400' />
                          <span className='text-sm text-muted-foreground'>
                            {
                              item.cv_score_result.candidates.social_media_links
                                .portfolio
                            }
                          </span>
                        </div>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='text-gray-600'
                          onClick={() =>
                            window.open(
                              `https://${item.cv_score_result.candidates.social_media_links.portfolio}`,
                              '_blank'
                            )
                          }
                        >
                          <ExternalLink className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  <div className='bg-sidebar rounded-lg p-6 hidden'>
                    <h4 className='text-base font-semibold mb-4'>Education</h4>
                    <div>
                      <p className='text-sm font-medium'>
                        B.sc in Computer Science
                      </p>
                      <p className='text-xs mt-1'>Jan 2017 - Dec 2020</p>
                      <p className='text-xs text-muted-foreground mt-1'>
                        University of{' '}
                        {
                          item.cv_score_result.candidates.profile_info
                            .nationality
                        }
                      </p>
                    </div>
                  </div>

                  {/* Assessment Scores */}
                  <div className='bg-sidebar rounded-lg p-6'>
                    <h4 className='text-base font-semibold mb-4'>
                      Assessment Scores
                    </h4>
                    <div className='space-y-4'>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm text-muted-foreground'>
                          Technical Skills
                        </span>
                        <div className='flex items-center space-x-2'>
                          <div className='w-24 bg-gray-200 rounded-full h-2'>
                            <div
                              className='bg-green-500 h-2 rounded-full'
                              style={{
                                width: `${item.cv_score_result.candidates.scores.technical_skills.score}%`,
                              }}
                            ></div>
                          </div>
                          <span className='text-sm font-medium text-gray-900 w-8'>
                            {
                              item.cv_score_result.candidates.scores
                                .technical_skills.score
                            }
                            %
                          </span>
                        </div>
                      </div>

                      <div className='flex items-center justify-between'>
                        <span className='text-sm text-muted-foreground'>
                          Soft Skills
                        </span>
                        <div className='flex items-center space-x-2'>
                          <div className='w-24 bg-gray-200 rounded-full h-2'>
                            <div
                              className='bg-green-500 h-2 rounded-full'
                              style={{
                                width: `${item.cv_score_result.candidates.scores.soft_skills.score}%`,
                              }}
                            ></div>
                          </div>
                          <span className='text-sm font-medium text-gray-900 w-8'>
                            {
                              item.cv_score_result.candidates.scores.soft_skills
                                .score
                            }
                            %
                          </span>
                        </div>
                      </div>

                      <div className='flex items-center justify-between'>
                        <span className='text-sm text-muted-foreground'>
                          Culture Fit
                        </span>
                        <div className='flex items-center space-x-2'>
                          <div className='w-24 bg-gray-200 rounded-full h-2'>
                            <div
                              className='bg-yellow-500 h-2 rounded-full'
                              style={{
                                width: `${item.cv_score_result.candidates.scores.company_culture_fit.score}%`,
                              }}
                            ></div>
                          </div>
                          <span className='text-sm font-medium text-gray-900 w-8'>
                            {
                              item.cv_score_result.candidates.scores
                                .company_culture_fit.score
                            }
                            %
                          </span>
                        </div>
                      </div>

                      <div className='flex items-center justify-between'>
                        <span className='text-sm text-muted-foreground'>
                          Experience
                        </span>
                        <div className='flex items-center space-x-2'>
                          <div className='w-24 bg-gray-200 rounded-full h-2'>
                            <div
                              className='bg-green-500 h-2 rounded-full'
                              style={{
                                width: `${item.cv_score_result.candidates.scores.experience_professionalism.score}%`,
                              }}
                            ></div>
                          </div>
                          <span className='text-sm font-medium text-gray-900 w-8'>
                            {
                              item.cv_score_result.candidates.scores
                                .experience_professionalism.score
                            }
                            %
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className='bg-sidebar rounded-lg p-6'>
                    <h4 className='text-base font-semibold mb-4'>
                      Contact Information
                    </h4>
                    <div className='space-y-3'>
                      {item.email && (
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center space-x-2'>
                            <Mail className='w-4 h-4 text-muted-foreground' />
                            <span className='text-sm text-muted-foreground'>
                              {item.email}
                            </span>
                          </div>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => handleCopy(item.email, 'email')}
                          >
                            {copiedField === 'email' ? (
                              <CheckCircle className='w-4 h-4 text-green-500' />
                            ) : (
                              <Copy className='w-4 h-4 text-muted-foreground' />
                            )}
                          </Button>
                        </div>
                      )}

                      {item.phone && (
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center space-x-2'>
                            <Phone className='w-4 h-4 text-gray-400' />
                            <span className='text-sm text-muted-foreground'>
                              {item.phone}
                            </span>
                          </div>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => handleCopy(item.phone, 'phone')}
                          >
                            {copiedField === 'phone' ? (
                              <CheckCircle className='w-4 h-4 text-green-500' />
                            ) : (
                              <Copy className='w-4 h-4 text-gray-400' />
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Other tab contents would go here */}
              {activeTab === 'social-media' && (
                <div className='p-6'>
                  <div className='bg-sidebar rounded-lg p-6'>
                    <div className='space-y-3'>
                      {item.email && (
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center space-x-2'>
                            <Mail className='w-4 h-4 text-muted-foreground' />
                            <span className='text-sm text-muted-foreground'>
                              {item.email}
                            </span>
                          </div>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => handleCopy(item.email, 'email')}
                          >
                            {copiedField === 'email' ? (
                              <CheckCircle className='w-4 h-4 text-green-500' />
                            ) : (
                              <Copy className='w-4 h-4 text-muted-foreground' />
                            )}
                          </Button>
                        </div>
                      )}

                      {item.github_url && (
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center space-x-2'>
                            <GithubIcon className='w-4 h-4 text-gray-400' />
                            <span className='text-sm text-muted-foreground'>
                              {item.github_url}
                            </span>
                          </div>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() =>
                              handleCopy(item.github_url, 'github_url')
                            }
                          >
                            {copiedField === 'github_url' ? (
                              <CheckCircle className='w-4 h-4 text-green-500' />
                            ) : (
                              <Copy className='w-4 h-4 text-gray-400' />
                            )}
                          </Button>
                        </div>
                      )}

                      {item.linkedin_url && (
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center space-x-2'>
                            <GithubIcon className='w-4 h-4 text-gray-400' />
                            <span className='text-sm text-muted-foreground'>
                              {item.linkedin_url}
                            </span>
                          </div>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() =>
                              handleCopy(item.linkedin_url, 'linkedin_url')
                            }
                          >
                            {copiedField === 'linkedin_url' ? (
                              <CheckCircle className='w-4 h-4 text-green-500' />
                            ) : (
                              <Copy className='w-4 h-4 text-gray-400' />
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CandidateDetailModal;

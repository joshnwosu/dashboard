// 'use client';

// import { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import {
//   Bookmark,
//   MapPin,
//   Building,
//   Mail,
//   ExternalLink,
//   Clock,
//   Award,
//   Star,
//   CheckCircle,
//   MessageSquare,
//   Copy,
//   Phone,
//   Globe,
//   UserCheck,
//   Send,
//   Calendar,
//   Minimize,
//   Expand,
//   X,
// } from 'lucide-react';
// import { GithubIcon, GmailIcon, LinkedinIcon } from '@/icon';
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from '@/components/ui/sheet';
// import { Badge } from '@/components/ui/badge';
// import { Separator } from '@/components/ui/separator';
// import { Candidate, CandidateData } from '@/types/candidate';
// import { copyToClipboard, formatDate, formatDateTime } from '@/utils/formatter';
// import Avatar from './avatar';

// const CandidateDetailSheet = ({
//   item,
//   open,
//   onOpenChange,
// }: {
//   item: CandidateData | null;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [copiedField, setCopiedField] = useState<string | null>(null);

//   const handleCopy = async (text: string, field: string) => {
//     const success = await copyToClipboard(text);
//     if (success) {
//       setCopiedField(field);
//       setTimeout(() => setCopiedField(null), 2000);
//     }
//   };

//   if (!item) return null;

//   const getStatusColor = (status: string) => {
//     switch (status?.toLowerCase()) {
//       case 'active':
//         return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
//       case 'inactive':
//         return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
//       default:
//         return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
//     }
//   };

//   const getRecommendationColor = (recommendation: string) => {
//     switch (recommendation?.toLowerCase()) {
//       case 'strong':
//         return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
//       case 'consider':
//         return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
//       case 'weak':
//         return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
//       default:
//         return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
//     }
//   };

//   return (
//     <Sheet open={open} onOpenChange={onOpenChange}>
//       <SheetContent
//         // className='min-w-[500px] sm:w-[800px] overflow-y-auto p-8'

//         className={`${
//           isExpanded ? 'min-w-[1000px]' : 'min-w-[500px]'
//         } w-full p-0 transition-all duration-300 ease-in-out [&>button]:hidden gap-0`}
//       >
//         <SheetHeader className='p-4 border-b border-border'>
//           <div className='flex items-center justify-between'>
//             <SheetTitle className='text-md font-semibold'>
//               Candidate Profile
//             </SheetTitle>

//             <div className='flex items-center gap-2'>
//               <Button
//                 onClick={() => setIsExpanded(!isExpanded)}
//                 className='cursor-pointer'
//                 title={isExpanded ? 'Collapse' : 'Expand'}
//                 variant='outline'
//                 size='icon'
//               >
//                 {isExpanded ? (
//                   <Minimize className='w-4 h-4' />
//                 ) : (
//                   <Expand className='w-4 h-4' />
//                 )}
//               </Button>

//               <Button
//                 onClick={() => {
//                   onOpenChange(false);
//                   setIsExpanded(false);
//                 }}
//                 className='cursor-pointer'
//                 title={'Collapse Profile'}
//                 variant='outline'
//                 size='icon'
//               >
//                 <X className='w-4 h-4' />
//               </Button>
//             </div>
//           </div>
//         </SheetHeader>

//         <div className='p-6'>
//           <div className='flex items-start justify-between'>
//             <div className='flex items-center space-x-4'>
//               <div className='w-14 h-14 bg-muted dark:bg-muted rounded-full flex items-center justify-center'>
//                 <span className='text-lg font-bold text-muted-foreground'>
//                   {item.name
//                     .split(' ')
//                     .map((n) => n[0])
//                     .join('')}
//                 </span>
//               </div>
//               <div>
//                 <h2 className='text-xl font-semibold text-foreground'>
//                   {item.name}
//                 </h2>
//                 <div className='flex items-center space-x-4 mt-1 text-sm text-muted-foreground'>
//                   <div className='flex items-center'>
//                     <MapPin className='w-3 h-3 mr-1' />
//                     <span>
//                       {item.cv_score_result.candidates.profile_info.nationality}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// };

// export default CandidateDetailSheet;

// 'use client';

// import { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import {
//   Bookmark,
//   MapPin,
//   Building,
//   Mail,
//   ExternalLink,
//   Clock,
//   Award,
//   Star,
//   CheckCircle,
//   MessageSquare,
//   Copy,
//   Phone,
//   Globe,
//   UserCheck,
//   Send,
//   Calendar,
//   Minimize,
//   Expand,
//   X,
//   Code,
//   Users,
//   Target,
//   TrendingUp,
//   AlertCircle,
//   ThumbsUp,
//   ThumbsDown,
// } from 'lucide-react';
// import { GithubIcon, GmailIcon, LinkedinIcon } from '@/icon';
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from '@/components/ui/sheet';
// import { Badge } from '@/components/ui/badge';
// import { Separator } from '@/components/ui/separator';
// import { Progress } from '@/components/ui/progress';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Candidate, CandidateData } from '@/types/candidate';
// import { copyToClipboard, formatDate, formatDateTime } from '@/utils/formatter';
// import Avatar from './avatar';

// const CandidateDetailSheet = ({
//   item,
//   open,
//   onOpenChange,
// }: {
//   item: CandidateData | null;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [copiedField, setCopiedField] = useState<string | null>(null);

//   const handleCopy = async (text: string, field: string) => {
//     const success = await copyToClipboard(text);
//     if (success) {
//       setCopiedField(field);
//       setTimeout(() => setCopiedField(null), 2000);
//     }
//   };

//   if (!item) return null;

//   const getStatusColor = (status: string) => {
//     switch (status?.toLowerCase()) {
//       case 'active':
//         return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
//       case 'inactive':
//         return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
//       default:
//         return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
//     }
//   };

//   const getRecommendationColor = (recommendation: string) => {
//     switch (recommendation?.toLowerCase()) {
//       case 'strong match':
//       case 'strong':
//         return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
//       case 'consider':
//         return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
//       case 'weak':
//         return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
//       default:
//         return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
//     }
//   };

//   const getScoreColor = (score: number) => {
//     if (score >= 85) return 'text-green-600';
//     if (score >= 70) return 'text-yellow-600';
//     return 'text-red-600';
//   };

//   const scores = item.cv_score_result.candidates.scores;

//   return (
//     <Sheet open={open} onOpenChange={onOpenChange}>
//       <SheetContent
//         className={`${
//           isExpanded ? 'min-w-[1000px]' : 'min-w-[500px]'
//         } w-full p-0 transition-all duration-300 ease-in-out [&>button]:hidden gap-0`}
//       >
//         <SheetHeader className='p-4 border-b border-border'>
//           <div className='flex items-center justify-between'>
//             <SheetTitle className='text-md font-semibold'>
//               Candidate Profile
//             </SheetTitle>

//             <div className='flex items-center gap-2'>
//               <Button
//                 onClick={() => setIsExpanded(!isExpanded)}
//                 className='cursor-pointer'
//                 title={isExpanded ? 'Collapse' : 'Expand'}
//                 variant='outline'
//                 size='icon'
//               >
//                 {isExpanded ? (
//                   <Minimize className='w-4 h-4' />
//                 ) : (
//                   <Expand className='w-4 h-4' />
//                 )}
//               </Button>

//               <Button
//                 onClick={() => {
//                   onOpenChange(false);
//                   setIsExpanded(false);
//                 }}
//                 className='cursor-pointer'
//                 title={'Close Profile'}
//                 variant='outline'
//                 size='icon'
//               >
//                 <X className='w-4 h-4' />
//               </Button>
//             </div>
//           </div>
//         </SheetHeader>

//         <div className='overflow-y-auto h-full'>
//           {/* Header Section */}
//           <div className='p-6 border-b border-border'>
//             <div className='flex items-start justify-between'>
//               <div className='flex items-center space-x-4'>
//                 <div className='w-14 h-14 bg-muted dark:bg-muted rounded-full flex items-center justify-center'>
//                   <span className='text-lg font-bold text-muted-foreground'>
//                     {item.name
//                       .split(' ')
//                       .map((n) => n[0])
//                       .join('')}
//                   </span>
//                 </div>
//                 <div>
//                   <h2 className='text-xl font-semibold text-foreground'>
//                     {item.name}
//                   </h2>
//                   <div className='flex items-center space-x-4 mt-1 text-sm text-muted-foreground'>
//                     <div className='flex items-center'>
//                       <MapPin className='w-3 h-3 mr-1' />
//                       <span>
//                         {
//                           item.cv_score_result.candidates.profile_info
//                             .nationality
//                         }
//                       </span>
//                     </div>
//                     <div className='flex items-center'>
//                       <Clock className='w-3 h-3 mr-1' />
//                       <span>{item.timezone}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className='flex flex-col items-end space-y-2'>
//                 <Badge
//                   className={getRecommendationColor(
//                     item.overall_recommendation
//                   )}
//                 >
//                   {item.overall_recommendation}
//                 </Badge>
//                 <div className='flex items-center space-x-1'>
//                   <Star
//                     className='w-4 h-4 text-yellow-500'
//                     fill='currentColor'
//                   />
//                   <span className='text-sm font-medium'>
//                     {item.talent_score}/100
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div className='p-6 border-b border-border'>
//             <h3 className='text-lg font-semibold mb-4'>Contact Information</h3>
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//               <div className='flex items-center justify-between p-3 bg-muted/50 rounded-lg'>
//                 <div className='flex items-center space-x-2'>
//                   <Mail className='w-4 h-4 text-muted-foreground' />
//                   <span className='text-sm'>{item.email}</span>
//                 </div>
//                 <Button
//                   variant='ghost'
//                   size='sm'
//                   onClick={() => handleCopy(item.email, 'email')}
//                 >
//                   {copiedField === 'email' ? (
//                     <CheckCircle className='w-4 h-4 text-green-500' />
//                   ) : (
//                     <Copy className='w-4 h-4' />
//                   )}
//                 </Button>
//               </div>

//               <div className='flex items-center justify-between p-3 bg-muted/50 rounded-lg'>
//                 <div className='flex items-center space-x-2'>
//                   <Phone className='w-4 h-4 text-muted-foreground' />
//                   <span className='text-sm'>{item.phone}</span>
//                 </div>
//                 <Button
//                   variant='ghost'
//                   size='sm'
//                   onClick={() => handleCopy(item.phone, 'phone')}
//                 >
//                   {copiedField === 'phone' ? (
//                     <CheckCircle className='w-4 h-4 text-green-500' />
//                   ) : (
//                     <Copy className='w-4 h-4' />
//                   )}
//                 </Button>
//               </div>

//               {item.cv_score_result.candidates.social_media_links.portfolio && (
//                 <div className='flex items-center justify-between p-3 bg-muted/50 rounded-lg'>
//                   <div className='flex items-center space-x-2'>
//                     <Globe className='w-4 h-4 text-muted-foreground' />
//                     <span className='text-sm'>
//                       {
//                         item.cv_score_result.candidates.social_media_links
//                           .portfolio
//                       }
//                     </span>
//                   </div>
//                   <Button
//                     variant='ghost'
//                     size='sm'
//                     onClick={() =>
//                       window.open(
//                         `https://${item.cv_score_result.candidates.social_media_links.portfolio}`,
//                         '_blank'
//                       )
//                     }
//                   >
//                     <ExternalLink className='w-4 h-4' />
//                   </Button>
//                 </div>
//               )}

//               <div className='flex items-center space-x-2'>
//                 {item.linkedin_url && (
//                   <Button
//                     variant='outline'
//                     size='sm'
//                     onClick={() => window.open(item.linkedin_url, '_blank')}
//                   >
//                     <LinkedinIcon className='w-4 h-4 mr-1' />
//                     LinkedIn
//                   </Button>
//                 )}
//                 {item.github_url && (
//                   <Button
//                     variant='outline'
//                     size='sm'
//                     onClick={() => window.open(item.github_url, '_blank')}
//                   >
//                     <GithubIcon className='w-4 h-4 mr-1' />
//                     GitHub
//                   </Button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Overall Assessment */}
//           <div className='p-6 border-b border-border'>
//             <h3 className='text-lg font-semibold mb-4'>Overall Assessment</h3>
//             <div className='bg-muted/50 p-4 rounded-lg'>
//               <p className='text-sm text-muted-foreground leading-relaxed'>
//                 {item.justification}
//               </p>
//             </div>
//           </div>

//           {/* Scores Overview */}
//           <div className='p-6 border-b border-border'>
//             <h3 className='text-lg font-semibold mb-4'>Skill Assessment</h3>
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//               <Card>
//                 <CardHeader className='pb-2'>
//                   <CardTitle className='text-sm flex items-center'>
//                     <Code className='w-4 h-4 mr-2' />
//                     Technical Skills
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className='flex items-center justify-between mb-2'>
//                     <span
//                       className={`text-2xl font-bold ${getScoreColor(
//                         parseInt(scores.technical_skills.score)
//                       )}`}
//                     >
//                       {scores.technical_skills.score}%
//                     </span>
//                   </div>
//                   <Progress
//                     value={parseInt(scores.technical_skills.score)}
//                     className='mb-2'
//                   />
//                   <p className='text-xs text-muted-foreground'>
//                     {scores.technical_skills.justification}
//                   </p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className='pb-2'>
//                   <CardTitle className='text-sm flex items-center'>
//                     <Users className='w-4 h-4 mr-2' />
//                     Soft Skills
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className='flex items-center justify-between mb-2'>
//                     <span
//                       className={`text-2xl font-bold ${getScoreColor(
//                         parseInt(scores.soft_skills.score)
//                       )}`}
//                     >
//                       {scores.soft_skills.score}%
//                     </span>
//                   </div>
//                   <Progress
//                     value={parseInt(scores.soft_skills.score)}
//                     className='mb-2'
//                   />
//                   <p className='text-xs text-muted-foreground'>
//                     {scores.soft_skills.justification}
//                   </p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className='pb-2'>
//                   <CardTitle className='text-sm flex items-center'>
//                     <Building className='w-4 h-4 mr-2' />
//                     Culture Fit
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className='flex items-center justify-between mb-2'>
//                     <span
//                       className={`text-2xl font-bold ${getScoreColor(
//                         parseInt(scores.company_culture_fit.score)
//                       )}`}
//                     >
//                       {scores.company_culture_fit.score}%
//                     </span>
//                   </div>
//                   <Progress
//                     value={parseInt(scores.company_culture_fit.score)}
//                     className='mb-2'
//                   />
//                   <p className='text-xs text-muted-foreground'>
//                     {scores.company_culture_fit.justification}
//                   </p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className='pb-2'>
//                   <CardTitle className='text-sm flex items-center'>
//                     <Clock className='w-4 h-4 mr-2' />
//                     Availability
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className='flex items-center justify-between mb-2'>
//                     <span
//                       className={`text-2xl font-bold ${getScoreColor(
//                         parseInt(scores.availability_flexibility.score)
//                       )}`}
//                     >
//                       {scores.availability_flexibility.score}%
//                     </span>
//                   </div>
//                   <Progress
//                     value={parseInt(scores.availability_flexibility.score)}
//                     className='mb-2'
//                   />
//                   <p className='text-xs text-muted-foreground'>
//                     {scores.availability_flexibility.justification}
//                   </p>
//                 </CardContent>
//               </Card>

//               <Card className='md:col-span-2'>
//                 <CardHeader className='pb-2'>
//                   <CardTitle className='text-sm flex items-center'>
//                     <Award className='w-4 h-4 mr-2' />
//                     Experience & Professionalism
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className='flex items-center justify-between mb-2'>
//                     <span
//                       className={`text-2xl font-bold ${getScoreColor(
//                         parseInt(scores.experience_professionalism.score)
//                       )}`}
//                     >
//                       {scores.experience_professionalism.score}%
//                     </span>
//                   </div>
//                   <Progress
//                     value={parseInt(scores.experience_professionalism.score)}
//                     className='mb-2'
//                   />
//                   <p className='text-xs text-muted-foreground'>
//                     {scores.experience_professionalism.justification}
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>

//           {/* Technical Skills */}
//           <div className='p-6 border-b border-border'>
//             <h3 className='text-lg font-semibold mb-4'>Technical Skills</h3>
//             <div className='flex flex-wrap gap-2'>
//               {scores.technical_skills.list_of_techinical_skills.map(
//                 (skill, index) => (
//                   <Badge key={index} variant='secondary' className='text-xs'>
//                     {skill}
//                   </Badge>
//                 )
//               )}
//             </div>
//           </div>

//           {/* Soft Skills */}
//           <div className='p-6 border-b border-border'>
//             <h3 className='text-lg font-semibold mb-4'>Soft Skills</h3>
//             <div className='flex flex-wrap gap-2'>
//               {scores.soft_skills.list_of_soft_skilss.map((skill, index) => (
//                 <Badge key={index} variant='outline' className='text-xs'>
//                   {skill}
//                 </Badge>
//               ))}
//             </div>
//           </div>

//           {/* Strengths & Weaknesses */}
//           <div className='p-6 border-b border-border'>
//             <h3 className='text-lg font-semibold mb-4'>
//               Strengths & Areas for Consideration
//             </h3>
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//               <Card>
//                 <CardHeader className='pb-2'>
//                   <CardTitle className='text-sm flex items-center text-green-600'>
//                     <ThumbsUp className='w-4 h-4 mr-2' />
//                     Strengths
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className='text-xs text-muted-foreground leading-relaxed'>
//                     {scores.strengths}
//                   </p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className='pb-2'>
//                   <CardTitle className='text-sm flex items-center text-yellow-600'>
//                     <AlertCircle className='w-4 h-4 mr-2' />
//                     Areas for Consideration
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className='text-xs text-muted-foreground leading-relaxed'>
//                     {scores.weaknesses}
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>

//           {/* Status & Actions */}
//           <div className='p-6'>
//             <h3 className='text-lg font-semibold mb-4'>Candidate Status</h3>
//             <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
//               <div className='flex items-center space-x-2'>
//                 <div
//                   className={`w-3 h-3 rounded-full ${
//                     item.shortlist ? 'bg-green-500' : 'bg-gray-300'
//                   }`}
//                 />
//                 <span className='text-sm'>Shortlisted</span>
//               </div>
//               <div className='flex items-center space-x-2'>
//                 <div
//                   className={`w-3 h-3 rounded-full ${
//                     item.email_sent ? 'bg-green-500' : 'bg-gray-300'
//                   }`}
//                 />
//                 <span className='text-sm'>Email Sent</span>
//               </div>
//               <div className='flex items-center space-x-2'>
//                 <div
//                   className={`w-3 h-3 rounded-full ${
//                     item.inerview_booked ? 'bg-green-500' : 'bg-gray-300'
//                   }`}
//                 />
//                 <span className='text-sm'>Interview Booked</span>
//               </div>
//               <div className='flex items-center space-x-2'>
//                 <div
//                   className={`w-3 h-3 rounded-full ${
//                     item.interested ? 'bg-green-500' : 'bg-gray-300'
//                   }`}
//                 />
//                 <span className='text-sm'>Interested</span>
//               </div>
//             </div>

//             <div className='text-xs text-muted-foreground space-y-1'>
//               <p>Created: {formatDateTime(item.createdAt)}</p>
//               <p>Updated: {formatDateTime(item.updatedAt)}</p>
//             </div>

//             <div className='flex space-x-2 mt-6'>
//               <Button size='sm' className='flex-1'>
//                 <Send className='w-4 h-4 mr-2' />
//                 Send Email
//               </Button>
//               <Button variant='outline' size='sm' className='flex-1'>
//                 <Calendar className='w-4 h-4 mr-2' />
//                 Schedule Interview
//               </Button>
//               <Button variant='outline' size='sm'>
//                 <Bookmark className='w-4 h-4' />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// };

// export default CandidateDetailSheet;

'use client';

import { useEffect, useState } from 'react';
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
import { Progress } from '@/components/ui/progress';
import { Candidate, CandidateData } from '@/types/candidate';
import { copyToClipboard, formatDate, formatDateTime } from '@/utils/formatter';
import Avatar from './avatar';
import { ScrollArea } from '../ui/scroll-area';

const CandidateDetailSheet = ({
  item,
  open,
  onOpenChange,
}: {
  item: CandidateData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

  if (!item) return null;

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 85) return 'bg-green-50 text-green-700';
    if (score >= 70) return 'bg-yellow-50 text-yellow-700';
    return 'bg-red-50 text-red-700';
  };

  const scores = item.cv_score_result.candidates.scores;

  const tabs = [
    { id: 'application', label: 'Application' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'certifications', label: 'Certification & Others' },
    { id: 'calendar', label: 'Calendar' },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className={`${
          isExpanded ? 'min-w-[900px]' : 'min-w-[500px]'
        } w-full p-0 transition-all duration-300 ease-in-out [&>button]:hidden gap-0`}
      >
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b'>
          <div className='flex items-center space-x-4'>
            <h2 className='text-lg font-semibold'>Candidate Details</h2>
          </div>

          <div className='flex items-center space-x-2'>
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant='ghost'
              size='sm'
            >
              {isExpanded ? (
                <Minimize className='w-4 h-4' />
              ) : (
                <Expand className='w-4 h-4' />
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
        </div>

        <ScrollArea className='overflow-y-auto h-full '>
          {/* Profile Header */}
          <div className='p-6'>
            <div className='flex items-start space-x-4'>
              <div className='w-16 h-16 bg-muted rounded-full flex items-center justify-center'>
                <span className='text-xl font-semibold text-muted-foreground'>
                  {item.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
              </div>
              <div className='flex-1'>
                <h3 className='text-xl font-semibold mb-1'>{item.name}</h3>
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
          <div className='bg-muted border-b'>
            <div className='flex space-x-8 px-6'>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-muted-foreground hover:text-muted-foreground/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'application' && (
            <div className='p-6 space-y-6'>
              {/* About Section */}
              <div className='bg-sidebar rounded-lg p-6'>
                <h4 className='text-base font-semibold mb-3'>
                  About {item.name.split(' ')[0]}
                </h4>
                <p className='text-sm text-muted-foreground leading-loose'>
                  {item.justification}
                </p>
              </div>

              {/* Top Skills */}
              <div className='bg-sidebar rounded-lg p-6'>
                <h4 className='text-base font-semibold mb-4'>Top Skills</h4>
                <div className='flex flex-wrap gap-2'>
                  {scores.technical_skills.list_of_techinical_skills
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
              <div className='bg-sidebar rounded-lg p-6'>
                <h4 className='text-base font-semibold mb-4'>Resume</h4>
                <div className='flex items-center justify-between p-4 bg-muted/50 rounded-lg'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-8 h-8 bg-red-500 rounded flex items-center justify-center'>
                      <FileText className='w-4 h-4 text-white' />
                    </div>
                    <div>
                      <p className='text-sm font-medium text-muted-foreground'>
                        {item.name.replace(' ', '_')}_Resume.pdf
                      </p>
                      <p className='text-xs text-gray-500'>280KB</p>
                    </div>
                  </div>
                  <Button variant='ghost' size='sm' className='text-gray-600'>
                    <Download className='w-4 h-4 mr-1' />
                    Download
                  </Button>
                </div>
              </div>

              {/* Portfolio */}
              {item.cv_score_result.candidates.social_media_links.portfolio && (
                <div className='bg-sidebar rounded-lg p-6'>
                  <h4 className='text-base font-semibold mb-4'>Portfolio</h4>
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
              <div className='bg-sidebar rounded-lg p-6'>
                <h4 className='text-base font-semibold mb-4'>Education</h4>
                <div>
                  <p className='text-sm font-medium'>
                    B.sc in Computer Science
                  </p>
                  <p className='text-xs mt-1'>Jan 2017 - Dec 2020</p>
                  <p className='text-xs text-muted-foreground mt-1'>
                    University of{' '}
                    {item.cv_score_result.candidates.profile_info.nationality}
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
                            width: `${scores.technical_skills.score}%`,
                          }}
                        ></div>
                      </div>
                      <span className='text-sm font-medium text-gray-900 w-8'>
                        {scores.technical_skills.score}%
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
                          style={{ width: `${scores.soft_skills.score}%` }}
                        ></div>
                      </div>
                      <span className='text-sm font-medium text-gray-900 w-8'>
                        {scores.soft_skills.score}%
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
                            width: `${scores.company_culture_fit.score}%`,
                          }}
                        ></div>
                      </div>
                      <span className='text-sm font-medium text-gray-900 w-8'>
                        {scores.company_culture_fit.score}%
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
                            width: `${scores.experience_professionalism.score}%`,
                          }}
                        ></div>
                      </div>
                      <span className='text-sm font-medium text-gray-900 w-8'>
                        {scores.experience_professionalism.score}%
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
                </div>
              </div>
            </div>
          )}

          {/* Other tab contents would go here */}
          {activeTab !== 'application' && (
            <div className='p-6'>
              <div className='bg-white rounded-lg p-8 text-center'>
                <p className='text-gray-500'>
                  Content for {tabs.find((t) => t.id === activeTab)?.label} tab
                </p>
              </div>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default CandidateDetailSheet;

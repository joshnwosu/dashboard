// // 'use client';

// // import { useState, useRef, useEffect } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// // } from '@/components/ui/dialog';
// // import { Button } from '@/components/ui/button';
// // import { Bookmark, Eye, FileText, Search, Users } from 'lucide-react';
// // import { BadgeDelta } from '@/components/badge-delta';
// // import { GithubIcon, GmailIcon, LinkedinIcon } from '@/icon';

// // export interface ItemProps {
// //   profile_pic_url: string;
// //   name: string;
// //   summary: string;
// //   talent_score: string;
// //   linkedin_url: string;
// //   github_url: string;
// //   country: string;
// //   email: string;
// //   justification: string;
// //   jobTitle: string;
// //   company: string;
// //   status: string;
// //   value?: string;
// //   type?: 'neutral' | 'increase' | 'decrease' | 'medium';
// // }

// // interface CardGridProps {
// //   items: ItemProps[];
// //   loading?: boolean;
// // }

// // const defaultImage =
// //   'https://avatars.githubusercontent.com/u/90515052?s=64&v=4';

// // // Animation variants for better control
// // const containerVariants = {
// //   hidden: { opacity: 0 },
// //   visible: {
// //     opacity: 1,
// //     transition: {
// //       staggerChildren: 0.08,
// //       delayChildren: 0.1,
// //     },
// //   },
// //   static: { opacity: 1 }, // Static state without transitions
// // };

// // const cardVariants = {
// //   hidden: {
// //     opacity: 0,
// //     y: 60,
// //     scale: 0.95,
// //   },
// //   visible: {
// //     opacity: 1,
// //     y: 0,
// //     scale: 1,
// //     transition: {
// //       type: 'spring',
// //       damping: 25,
// //       stiffness: 200,
// //       mass: 0.8,
// //     },
// //   },
// //   static: {
// //     opacity: 1,
// //     y: 0,
// //     scale: 1,
// //   },
// //   hover: {
// //     y: -8,
// //     scale: 1.02,
// //     transition: {
// //       type: 'spring',
// //       damping: 20,
// //       stiffness: 300,
// //     },
// //   },
// //   tap: {
// //     scale: 0.98,
// //     transition: {
// //       type: 'spring',
// //       damping: 30,
// //       stiffness: 400,
// //     },
// //   },
// // };

// // const emptyStateVariants = {
// //   hidden: {
// //     opacity: 0,
// //     y: 40,
// //     scale: 0.95,
// //   },
// //   visible: {
// //     opacity: 1,
// //     y: 0,
// //     scale: 1,
// //     transition: {
// //       type: 'spring',
// //       damping: 25,
// //       stiffness: 200,
// //       delay: 0.2,
// //     },
// //   },
// // };

// // const floatingVariants = {
// //   float: {
// //     y: [-10, 10, -10],
// //     transition: {
// //       duration: 4,
// //       repeat: Infinity,
// //       ease: 'easeInOut',
// //     },
// //   },
// // };

// // export default function CandidateCardList({
// //   items,
// //   loading = false,
// // }: CardGridProps) {
// //   const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);
// //   const [cardBounds, setCardBounds] = useState<DOMRect | null>(null);
// //   const [hasAnimated, setHasAnimated] = useState(false);
// //   const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

// //   // Set hasAnimated to true after initial render
// //   useEffect(() => {
// //     if (!loading && items && items.length > 0 && !hasAnimated) {
// //       const timer = setTimeout(() => setHasAnimated(true), 1000); // Wait for animations to complete
// //       return () => clearTimeout(timer);
// //     }
// //   }, [loading, items, hasAnimated]);

// //   const handleCardClick = (item: ItemProps, index: number) => {
// //     const card = cardRefs.current.get(index);
// //     if (card) {
// //       setCardBounds(card.getBoundingClientRect());
// //     }
// //     setSelectedItem(item);
// //   };

// //   const handleClose = () => {
// //     setSelectedItem(null);
// //     setCardBounds(null);
// //   };

// //   // Empty state component
// //   const EmptyState = () => (
// //     <motion.div
// //       variants={emptyStateVariants}
// //       initial='hidden'
// //       animate='visible'
// //       className='flex flex-col items-center justify-center py-16 px-4 text-center'
// //     >
// //       <motion.div
// //         variants={floatingVariants}
// //         animate='float'
// //         className='mb-6 relative'
// //       >
// //         <div className='w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mb-4'>
// //           <Users className='w-12 h-12 text-muted-foreground/60' />
// //         </div>
// //         <motion.div
// //           className='absolute -top-2 -right-2 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center'
// //           animate={{
// //             scale: [1, 1.2, 1],
// //             rotate: [0, 10, -10, 0],
// //           }}
// //           transition={{
// //             duration: 3,
// //             repeat: Infinity,
// //             delay: 1.5,
// //           }}
// //         >
// //           <Search className='w-4 h-4 text-primary/60' />
// //         </motion.div>
// //         <motion.div
// //           className='absolute -bottom-1 -left-3 w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center'
// //           animate={{
// //             scale: [1, 1.1, 1],
// //             x: [0, 5, 0],
// //           }}
// //           transition={{
// //             duration: 2.5,
// //             repeat: Infinity,
// //             delay: 0.8,
// //           }}
// //         >
// //           <FileText className='w-3 h-3 text-secondary/60' />
// //         </motion.div>
// //       </motion.div>

// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ delay: 0.4 }}
// //         className='space-y-3 max-w-md'
// //       >
// //         <h3 className='text-xl font-semibold text-foreground'>
// //           No candidates found
// //         </h3>
// //         <p className='text-muted-foreground text-sm leading-relaxed'>
// //           We couldn't find any candidates matching your criteria. Try adjusting
// //           your search filters or check back later for new profiles.
// //         </p>
// //       </motion.div>

// //       <motion.div
// //         initial={{ opacity: 0, scale: 0.9 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         transition={{ delay: 0.6 }}
// //         className='flex flex-col sm:flex-row gap-3 mt-8'
// //       >
// //         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
// //           <Button variant='default' className='px-6'>
// //             <Search className='w-4 h-4 mr-2' />
// //             Refine Search
// //           </Button>
// //         </motion.div>
// //         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
// //           <Button variant='outline' className='px-6'>
// //             <Users className='w-4 h-4 mr-2' />
// //             Browse All
// //           </Button>
// //         </motion.div>
// //       </motion.div>

// //       <motion.div
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         transition={{ delay: 0.8 }}
// //         className='mt-8 text-xs text-muted-foreground'
// //       >
// //         Need help?{' '}
// //         <span className='text-primary cursor-pointer hover:underline'>
// //           Contact support
// //         </span>
// //       </motion.div>
// //     </motion.div>
// //   );

// //   if (loading) {
// //     return (
// //       <motion.div
// //         className='grid auto-rows-min gap-4 md:grid-cols-3'
// //         variants={containerVariants}
// //         initial='hidden'
// //         animate='visible'
// //       >
// //         {Array.from({ length: 5 }).map((_, index) => (
// //           <motion.div
// //             key={`skeleton-${index}`}
// //             variants={cardVariants}
// //             className='rounded-xl bg-muted/30 animate-pulse p-6 flex flex-col gap-4 h-64'
// //           >
// //             <div className='flex gap-4 items-start'>
// //               <div className='w-12 h-12 rounded-full bg-muted/50' />
// //               <div className='flex-1'>
// //                 <div className='h-4 bg-muted/50 rounded mb-2 w-3/4' />
// //                 <div className='h-3 bg-muted/50 rounded w-1/2' />
// //               </div>
// //             </div>
// //             <div className='space-y-2'>
// //               <div className='h-3 bg-muted/50 rounded' />
// //               <div className='h-3 bg-muted/50 rounded w-5/6' />
// //               <div className='h-3 bg-muted/50 rounded w-4/6' />
// //             </div>
// //           </motion.div>
// //         ))}
// //       </motion.div>
// //     );
// //   }

// //   // Show empty state when no items
// //   if (!items || items.length === 0) {
// //     return <EmptyState />;
// //   }

// //   return (
// //     <div>
// //       <motion.div
// //         className='grid auto-rows-min gap-4 md:grid-cols-3'
// //         variants={containerVariants}
// //         initial={hasAnimated ? 'static' : 'hidden'}
// //         animate={hasAnimated ? 'static' : 'visible'}
// //       >
// //         {items?.map((item, index) => (
// //           <motion.div
// //             key={`${item.name}-${item.email}-${index}`} // More stable key
// //             variants={cardVariants}
// //             initial={hasAnimated ? 'static' : 'hidden'}
// //             animate={hasAnimated ? 'static' : 'visible'}
// //             whileHover='hover'
// //             whileTap='tap'
// //             layout
// //             className='rounded-xl bg-background ring-2 dark:ring-1 ring-accent p-6 flex flex-col gap-4 cursor-pointer transition-shadow duration-300 ease-out will-change-transform'
// //             onClick={() => handleCardClick(item, index)}
// //             ref={(el) => {
// //               if (el) cardRefs.current.set(index, el);
// //               else cardRefs.current.delete(index);
// //             }}
// //           >
// //             <div className='flex justify-between items-start gap-4'>
// //               <div className='flex gap-4 items-start'>
// //                 <motion.img
// //                   src={item.profile_pic_url || defaultImage}
// //                   alt='profile_photo'
// //                   className='w-12 h-12 rounded-full object-cover'
// //                   initial={
// //                     hasAnimated
// //                       ? { scale: 1, rotate: 0 }
// //                       : { scale: 0, rotate: -180 }
// //                   }
// //                   animate={{ scale: 1, rotate: 0 }}
// //                   transition={
// //                     hasAnimated
// //                       ? {}
// //                       : {
// //                           type: 'spring',
// //                           damping: 15,
// //                           stiffness: 200,
// //                           delay: index * 0.05 + 0.2,
// //                         }
// //                   }
// //                 />
// //                 <div className='flex flex-1 flex-col'>
// //                   <motion.h2
// //                     className='text-md line-clamp-1 font-medium'
// //                     initial={
// //                       hasAnimated
// //                         ? { opacity: 1, x: 0 }
// //                         : { opacity: 0, x: -20 }
// //                     }
// //                     animate={{ opacity: 1, x: 0 }}
// //                     transition={
// //                       hasAnimated ? {} : { delay: index * 0.05 + 0.3 }
// //                     }
// //                   >
// //                     {item.name}
// //                   </motion.h2>
// //                   <motion.div
// //                     className='mt-2 flex gap-2'
// //                     initial={
// //                       hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
// //                     }
// //                     animate={{ opacity: 1, y: 0 }}
// //                     transition={
// //                       hasAnimated ? {} : { delay: index * 0.05 + 0.4 }
// //                     }
// //                   >
// //                     <motion.div
// //                       whileHover={{ scale: 1.1 }}
// //                       whileTap={{ scale: 0.95 }}
// //                     >
// //                       <GmailIcon
// //                         width={24}
// //                         height={24}
// //                         className={`transition-opacity duration-200 ${
// //                           !item.email ? 'opacity-20' : 'hover:opacity-80'
// //                         }`}
// //                       />
// //                     </motion.div>
// //                     <motion.div
// //                       whileHover={{ scale: 1.1 }}
// //                       whileTap={{ scale: 0.95 }}
// //                     >
// //                       <LinkedinIcon
// //                         width={24}
// //                         height={24}
// //                         className={`transition-opacity duration-200 ${
// //                           !item.linkedin_url ? 'opacity-20' : 'hover:opacity-80'
// //                         }`}
// //                       />
// //                     </motion.div>
// //                     <motion.div
// //                       whileHover={{ scale: 1.1 }}
// //                       whileTap={{ scale: 0.95 }}
// //                     >
// //                       <GithubIcon
// //                         width={24}
// //                         height={24}
// //                         className={`transition-opacity duration-200 ${
// //                           !item.github_url ? 'opacity-20' : 'hover:opacity-80'
// //                         }`}
// //                       />
// //                     </motion.div>
// //                   </motion.div>
// //                 </div>
// //               </div>
// //             </div>

// //             <motion.p
// //               className='line-clamp-3 text-md text-muted-foreground'
// //               initial={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               transition={hasAnimated ? {} : { delay: index * 0.05 + 0.5 }}
// //             >
// //               {item.justification}
// //             </motion.p>

// //             <motion.div
// //               className='flex flex-wrap justify-between items-center mt-auto pt-4'
// //               initial={
// //                 hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
// //               }
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={hasAnimated ? {} : { delay: index * 0.05 + 0.6 }}
// //             >
// //               <BadgeDelta
// //                 variant='complex'
// //                 deltaType='neutral'
// //                 iconStyle='line'
// //                 value={`${item?.talent_score ?? 0}%`}
// //               />

// //               <div className='flex items-center gap-2'>
// //                 <motion.div
// //                   whileHover={{ scale: 1.05 }}
// //                   whileTap={{ scale: 0.95 }}
// //                 >
// //                   <Button variant='outline' size='sm' className='text-xs'>
// //                     <span>Shortlist</span>
// //                     <Bookmark className='w-3 h-3 ml-1' />
// //                   </Button>
// //                 </motion.div>
// //                 <motion.div
// //                   whileHover={{ scale: 1.05 }}
// //                   whileTap={{ scale: 0.95 }}
// //                 >
// //                   <Button variant='outline' size='sm' className='text-xs'>
// //                     <span>Hide</span>
// //                     <Eye className='w-3 h-3 ml-1' />
// //                   </Button>
// //                 </motion.div>
// //               </div>
// //             </motion.div>
// //           </motion.div>
// //         ))}
// //       </motion.div>

// //       <AnimatePresence mode='wait'>
// //         {selectedItem && (
// //           <Dialog open={!!selectedItem} onOpenChange={handleClose}>
// //             <DialogContent className='sm:max-w-[1100px] flex flex-col h-[80vh] p-0 gap-0 [&>button]:hidden dark:bg-sidebar'>
// //               <DialogHeader className='flex flex-row justify-between items-center p-4 border-b border-b-border'>
// //                 <DialogTitle className='text-md'>More Info</DialogTitle>
// //               </DialogHeader>
// //             </DialogContent>
// //           </Dialog>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // }

// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Bookmark, Eye, FileText, Search, Users } from 'lucide-react';
// import { BadgeDelta } from '@/components/badge-delta';
// import { GithubIcon, GmailIcon, LinkedinIcon } from '@/icon';

// export interface ItemProps {
//   profile_pic_url: string;
//   name: string;
//   summary: string;
//   talent_score: string;
//   linkedin_url: string;
//   github_url: string;
//   country: string;
//   email: string;
//   justification: string;
//   jobTitle: string;
//   company: string;
//   status: string;
//   value?: string;
//   type?: 'neutral' | 'increase' | 'decrease' | 'medium';
// }

// interface CardGridProps {
//   items: ItemProps[];
//   loading?: boolean;
// }

// const defaultImage =
//   'https://avatars.githubusercontent.com/u/90515052?s=64&v=4';

// // Helper function to check if a field is empty or loading
// const isFieldLoading = (value: string | null | undefined): boolean => {
//   return (
//     !value || value.trim() === '' || value === 'null' || value === 'undefined'
//   );
// };

// // Skeleton component for reusability
// const SkeletonLine = ({
//   width = 'w-full',
//   height = 'h-3',
//   className = '',
// }: {
//   width?: string;
//   height?: string;
//   className?: string;
// }) => (
//   <div
//     className={`${height} bg-muted/40 rounded animate-pulse ${width} ${className}`}
//   />
// );

// // Animation variants for better control
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.08,
//       delayChildren: 0.1,
//     },
//   },
//   static: { opacity: 1 }, // Static state without transitions
// };

// const cardVariants = {
//   hidden: {
//     opacity: 0,
//     y: 60,
//     scale: 0.95,
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       type: 'spring',
//       damping: 25,
//       stiffness: 200,
//       mass: 0.8,
//     },
//   },
//   static: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//   },
//   hover: {
//     y: -8,
//     scale: 1.02,
//     transition: {
//       type: 'spring',
//       damping: 20,
//       stiffness: 300,
//     },
//   },
//   tap: {
//     scale: 0.98,
//     transition: {
//       type: 'spring',
//       damping: 30,
//       stiffness: 400,
//     },
//   },
// };

// const emptyStateVariants = {
//   hidden: {
//     opacity: 0,
//     y: 40,
//     scale: 0.95,
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       type: 'spring',
//       damping: 25,
//       stiffness: 200,
//       delay: 0.2,
//     },
//   },
// };

// const floatingVariants = {
//   float: {
//     y: [-10, 10, -10],
//     transition: {
//       duration: 4,
//       repeat: Infinity,
//       ease: 'easeInOut',
//     },
//   },
// };

// export default function CandidateCardList({
//   items,
//   loading = false,
// }: CardGridProps) {
//   const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);
//   const [cardBounds, setCardBounds] = useState<DOMRect | null>(null);
//   const [hasAnimated, setHasAnimated] = useState(false);
//   const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

//   // Set hasAnimated to true after initial render
//   useEffect(() => {
//     if (!loading && items && items.length > 0 && !hasAnimated) {
//       const timer = setTimeout(() => setHasAnimated(true), 1000); // Wait for animations to complete
//       return () => clearTimeout(timer);
//     }
//   }, [loading, items, hasAnimated]);

//   const handleCardClick = (item: ItemProps, index: number) => {
//     const card = cardRefs.current.get(index);
//     if (card) {
//       setCardBounds(card.getBoundingClientRect());
//     }
//     setSelectedItem(item);
//   };

//   const handleClose = () => {
//     setSelectedItem(null);
//     setCardBounds(null);
//   };

//   // Empty state component
//   const EmptyState = () => (
//     <motion.div
//       variants={emptyStateVariants}
//       initial='hidden'
//       animate='visible'
//       className='flex flex-col items-center justify-center py-16 px-4 text-center'
//     >
//       <motion.div
//         variants={floatingVariants}
//         animate='float'
//         className='mb-6 relative'
//       >
//         <div className='w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mb-4'>
//           <Users className='w-12 h-12 text-muted-foreground/60' />
//         </div>
//         <motion.div
//           className='absolute -top-2 -right-2 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center'
//           animate={{
//             scale: [1, 1.2, 1],
//             rotate: [0, 10, -10, 0],
//           }}
//           transition={{
//             duration: 3,
//             repeat: Infinity,
//             delay: 1.5,
//           }}
//         >
//           <Search className='w-4 h-4 text-primary/60' />
//         </motion.div>
//         <motion.div
//           className='absolute -bottom-1 -left-3 w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center'
//           animate={{
//             scale: [1, 1.1, 1],
//             x: [0, 5, 0],
//           }}
//           transition={{
//             duration: 2.5,
//             repeat: Infinity,
//             delay: 0.8,
//           }}
//         >
//           <FileText className='w-3 h-3 text-secondary/60' />
//         </motion.div>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4 }}
//         className='space-y-3 max-w-md'
//       >
//         <h3 className='text-xl font-semibold text-foreground'>
//           No candidates found
//         </h3>
//         <p className='text-muted-foreground text-sm leading-relaxed'>
//           We couldn't find any candidates matching your criteria. Try adjusting
//           your search filters or check back later for new profiles.
//         </p>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 0.6 }}
//         className='flex flex-col sm:flex-row gap-3 mt-8'
//       >
//         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//           <Button variant='default' className='px-6'>
//             <Search className='w-4 h-4 mr-2' />
//             Refine Search
//           </Button>
//         </motion.div>
//         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//           <Button variant='outline' className='px-6'>
//             <Users className='w-4 h-4 mr-2' />
//             Browse All
//           </Button>
//         </motion.div>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.8 }}
//         className='mt-8 text-xs text-muted-foreground'
//       >
//         Need help?{' '}
//         <span className='text-primary cursor-pointer hover:underline'>
//           Contact support
//         </span>
//       </motion.div>
//     </motion.div>
//   );

//   if (loading) {
//     return (
//       <motion.div
//         className='grid auto-rows-min gap-4 md:grid-cols-3'
//         variants={containerVariants}
//         initial='hidden'
//         animate='visible'
//       >
//         {Array.from({ length: 5 }).map((_, index) => (
//           <motion.div
//             key={`skeleton-${index}`}
//             variants={cardVariants}
//             className='rounded-xl bg-muted/30 animate-pulse p-6 flex flex-col gap-4 h-64'
//           >
//             <div className='flex gap-4 items-start'>
//               <div className='w-12 h-12 rounded-full bg-muted/50' />
//               <div className='flex-1'>
//                 <div className='h-4 bg-muted/50 rounded mb-2 w-3/4' />
//                 <div className='h-3 bg-muted/50 rounded w-1/2' />
//               </div>
//             </div>
//             <div className='space-y-2'>
//               <div className='h-3 bg-muted/50 rounded' />
//               <div className='h-3 bg-muted/50 rounded w-5/6' />
//               <div className='h-3 bg-muted/50 rounded w-4/6' />
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>
//     );
//   }

//   // Show empty state when no items
//   if (!items || items.length === 0) {
//     return <EmptyState />;
//   }

//   return (
//     <div>
//       <motion.div
//         className='grid auto-rows-min gap-4 md:grid-cols-3'
//         variants={containerVariants}
//         initial={hasAnimated ? 'static' : 'hidden'}
//         animate={hasAnimated ? 'static' : 'visible'}
//       >
//         {items?.map((item, index) => (
//           <motion.div
//             key={`${item.name}-${item.email}-${index}`} // More stable key
//             variants={cardVariants}
//             initial={hasAnimated ? 'static' : 'hidden'}
//             animate={hasAnimated ? 'static' : 'visible'}
//             whileHover='hover'
//             whileTap='tap'
//             layout
//             className='rounded-xl bg-background ring-2 dark:ring-1 ring-accent p-6 flex flex-col gap-4 cursor-pointer transition-shadow duration-300 ease-out will-change-transform'
//             onClick={() => handleCardClick(item, index)}
//             ref={(el) => {
//               if (el) cardRefs.current.set(index, el);
//               else cardRefs.current.delete(index);
//             }}
//           >
//             <div className='flex justify-between items-start gap-4'>
//               <div className='flex gap-4 items-start'>
//                 <motion.img
//                   src={item.profile_pic_url || defaultImage}
//                   alt='profile_photo'
//                   className={`w-12 h-12 rounded-full object-cover ${
//                     !item.profile_pic_url ? 'animate-pulse bg-muted/40' : ''
//                   }`}
//                   initial={
//                     hasAnimated
//                       ? { scale: 1, rotate: 0 }
//                       : { scale: 0, rotate: -180 }
//                   }
//                   animate={{ scale: 1, rotate: 0 }}
//                   transition={
//                     hasAnimated
//                       ? {}
//                       : {
//                           type: 'spring',
//                           damping: 15,
//                           stiffness: 200,
//                           delay: index * 0.05 + 0.2,
//                         }
//                   }
//                   onError={(e) => {
//                     e.currentTarget.src = defaultImage;
//                   }}
//                 />
//                 <div className='flex flex-1 flex-col'>
//                   <motion.h2
//                     className='text-md line-clamp-1 font-medium'
//                     initial={
//                       hasAnimated
//                         ? { opacity: 1, x: 0 }
//                         : { opacity: 0, x: -20 }
//                     }
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={
//                       hasAnimated ? {} : { delay: index * 0.05 + 0.3 }
//                     }
//                   >
//                     {isFieldLoading(item.name) ? (
//                       <SkeletonLine width='w-32' height='h-4' />
//                     ) : (
//                       item.name
//                     )}
//                   </motion.h2>
//                   <motion.div
//                     className='mt-2 flex gap-2'
//                     initial={
//                       hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
//                     }
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={
//                       hasAnimated ? {} : { delay: index * 0.05 + 0.4 }
//                     }
//                   >
//                     <motion.div
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       <GmailIcon
//                         width={24}
//                         height={24}
//                         className={`transition-opacity duration-200 ${
//                           !item.email ? 'opacity-20' : 'hover:opacity-80'
//                         }`}
//                       />
//                     </motion.div>
//                     <motion.div
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       <LinkedinIcon
//                         width={24}
//                         height={24}
//                         className={`transition-opacity duration-200 ${
//                           !item.linkedin_url ? 'opacity-20' : 'hover:opacity-80'
//                         }`}
//                       />
//                     </motion.div>
//                     <motion.div
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       <GithubIcon
//                         width={24}
//                         height={24}
//                         className={`transition-opacity duration-200 ${
//                           !item.github_url ? 'opacity-20' : 'hover:opacity-80'
//                         }`}
//                       />
//                     </motion.div>
//                   </motion.div>
//                 </div>
//               </div>
//             </div>

//             <motion.div
//               className='line-clamp-3 text-md text-muted-foreground'
//               initial={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={hasAnimated ? {} : { delay: index * 0.05 + 0.5 }}
//             >
//               {isFieldLoading(item.justification) ? (
//                 <div className='space-y-2'>
//                   <SkeletonLine />
//                   <SkeletonLine width='w-5/6' />
//                   <SkeletonLine width='w-4/6' />
//                 </div>
//               ) : (
//                 item.justification
//               )}
//             </motion.div>

//             <motion.div
//               className='flex flex-wrap justify-between items-center mt-auto pt-4'
//               initial={
//                 hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
//               }
//               animate={{ opacity: 1, y: 0 }}
//               transition={hasAnimated ? {} : { delay: index * 0.05 + 0.6 }}
//             >
//               <BadgeDelta
//                 variant='complex'
//                 deltaType='neutral'
//                 iconStyle='line'
//                 value={item?.talent_score ? `${item.talent_score}%` : 0}
//                 // placeholder={!item?.talent_score}
//               />

//               <div className='flex items-center gap-2'>
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Button variant='outline' size='sm' className='text-xs'>
//                     <span>Shortlist</span>
//                     <Bookmark className='w-3 h-3 ml-1' />
//                   </Button>
//                 </motion.div>
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Button variant='outline' size='sm' className='text-xs'>
//                     <span>Hide</span>
//                     <Eye className='w-3 h-3 ml-1' />
//                   </Button>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </motion.div>
//         ))}
//       </motion.div>

//       <AnimatePresence mode='wait'>
//         {selectedItem && (
//           <Dialog open={!!selectedItem} onOpenChange={handleClose}>
//             <DialogContent className='sm:max-w-[1100px] flex flex-col h-[80vh] p-0 gap-0 [&>button]:hidden dark:bg-sidebar'>
//               <DialogHeader className='flex flex-row justify-between items-center p-4 border-b border-b-border'>
//                 <DialogTitle className='text-md'>More Info</DialogTitle>
//               </DialogHeader>
//             </DialogContent>
//           </Dialog>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Bookmark, Eye, FileText, Search, Users } from 'lucide-react';
import { BadgeDelta } from '@/components/badge-delta';
import { GithubIcon, GmailIcon, LinkedinIcon } from '@/icon';

export interface ItemProps {
  profile_pic_url: string;
  name: string;
  summary: string;
  talent_score: string;
  linkedin_url: string;
  github_url: string;
  country: string;
  email: string;
  justification: string;
  jobTitle: string;
  company: string;
  status: string;
  value?: string;
  type?: 'neutral' | 'increase' | 'decrease' | 'medium';
}

interface CardGridProps {
  items: ItemProps[];
  loading?: boolean;
}

const defaultImage =
  'https://avatars.githubusercontent.com/u/90515052?s=64&v=4';

// Helper function to check if a field is empty or loading
const isFieldLoading = (value: string | null | undefined): boolean => {
  return (
    !value || value.trim() === '' || value === 'null' || value === 'undefined'
  );
};

// Skeleton component for reusability
const SkeletonLine = ({
  width = 'w-full',
  height = 'h-3',
  className = '',
}: {
  width?: string;
  height?: string;
  className?: string;
}) => (
  <div
    className={`${height} bg-muted/90 rounded animate-pulse ${width} ${className}`}
  />
);

// Animation variants for better control
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  static: { opacity: 1 }, // Static state without transitions
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 200,
      mass: 0.8,
    },
  },
  static: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 300,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 400,
    },
  },
};

const emptyStateVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 200,
      delay: 0.2,
    },
  },
};

const floatingVariants = {
  float: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export default function CandidateCardList({
  items,
  loading = false,
}: CardGridProps) {
  const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);
  const [cardBounds, setCardBounds] = useState<DOMRect | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Set hasAnimated to true after initial render
  useEffect(() => {
    if (!loading && items && items.length > 0 && !hasAnimated) {
      const timer = setTimeout(() => setHasAnimated(true), 1000); // Wait for animations to complete
      return () => clearTimeout(timer);
    }
  }, [loading, items, hasAnimated]);

  const handleCardClick = (item: ItemProps, index: number) => {
    const card = cardRefs.current.get(index);
    if (card) {
      setCardBounds(card.getBoundingClientRect());
    }
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
    setCardBounds(null);
  };

  // Empty state component
  const EmptyState = () => (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: 'spring',
            damping: 25,
            stiffness: 200,
            delay: 0.2,
          },
        },
        static: { opacity: 1, y: 0, scale: 1 },
      }}
      initial={hasAnimated ? 'static' : 'hidden'}
      animate={hasAnimated ? 'static' : 'visible'}
      className='flex flex-col items-center justify-center py-16 px-4 text-center'
    >
      <motion.div
        variants={{
          float: hasAnimated
            ? {}
            : {
                y: [-10, 10, -10],
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              },
        }}
        animate={hasAnimated ? {} : 'float'}
        className='mb-6 relative'
      >
        <div className='w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mb-4'>
          <Users className='w-12 h-12 text-muted-foreground/60' />
        </div>
        <motion.div
          className='absolute -top-2 -right-2 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center'
          animate={
            hasAnimated
              ? {}
              : {
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }
          }
          transition={
            hasAnimated
              ? {}
              : {
                  duration: 3,
                  repeat: Infinity,
                  delay: 1.5,
                }
          }
        >
          <Search className='w-4 h-4 text-primary/60' />
        </motion.div>
        <motion.div
          className='absolute -bottom-1 -left-3 w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center'
          animate={
            hasAnimated
              ? {}
              : {
                  scale: [1, 1.1, 1],
                  x: [0, 5, 0],
                }
          }
          transition={
            hasAnimated
              ? {}
              : {
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 0.8,
                }
          }
        >
          <FileText className='w-3 h-3 text-secondary/60' />
        </motion.div>
      </motion.div>

      <motion.div
        initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={hasAnimated ? {} : { delay: 0.4 }}
        className='space-y-3 max-w-md'
      >
        <h3 className='text-xl font-semibold text-foreground'>
          No candidates found
        </h3>
        <p className='text-muted-foreground text-sm leading-relaxed'>
          We couldn't find any candidates matching your criteria. Try adjusting
          your search filters or check back later for new profiles.
        </p>
      </motion.div>

      <motion.div
        initial={
          hasAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
        }
        animate={{ opacity: 1, scale: 1 }}
        transition={hasAnimated ? {} : { delay: 0.6 }}
        className='flex flex-col sm:flex-row gap-3 mt-8'
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant='default' className='px-6'>
            <Search className='w-4 h-4 mr-2' />
            Refine Search
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant='outline' className='px-6'>
            <Users className='w-4 h-4 mr-2' />
            Browse All
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={hasAnimated ? {} : { delay: 0.8 }}
        className='mt-8 text-xs text-muted-foreground'
      >
        Need help?{' '}
        <span className='text-primary cursor-pointer hover:underline'>
          Contact support
        </span>
      </motion.div>
    </motion.div>
  );

  if (loading) {
    return (
      <motion.div
        className='grid auto-rows-min gap-4 md:grid-cols-3'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.div
            key={`skeleton-${index}`}
            variants={cardVariants}
            className='rounded-xl bg-muted/30 animate-pulse p-6 flex flex-col gap-4 h-64'
          >
            <div className='flex gap-4 items-start'>
              <div className='w-12 h-12 rounded-full bg-muted/50' />
              <div className='flex-1'>
                <div className='h-4 bg-muted/50 rounded mb-2 w-3/4' />
                <div className='h-3 bg-muted/50 rounded w-1/2' />
              </div>
            </div>
            <div className='space-y-2'>
              <div className='h-3 bg-muted/50 rounded' />
              <div className='h-3 bg-muted/50 rounded w-5/6' />
              <div className='h-3 bg-muted/50 rounded w-4/6' />
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // Show empty state when no items
  if (!items || items.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      <motion.div
        className='grid auto-rows-min gap-4 md:grid-cols-3'
        variants={containerVariants}
        initial={hasAnimated ? 'static' : 'hidden'}
        animate={hasAnimated ? 'static' : 'visible'}
      >
        {items?.map((item, index) => (
          <motion.div
            key={`${item.name}-${item.email}-${index}`} // More stable key
            variants={cardVariants}
            initial={hasAnimated ? 'static' : 'hidden'}
            animate={hasAnimated ? 'static' : 'visible'}
            whileHover='hover'
            whileTap='tap'
            layout
            className='rounded-xl bg-background ring-2 dark:ring-1 ring-accent p-6 flex flex-col gap-4 cursor-pointer transition-shadow duration-300 ease-out will-change-transform'
            onClick={() => handleCardClick(item, index)}
            ref={(el) => {
              if (el) cardRefs.current.set(index, el);
              else cardRefs.current.delete(index);
            }}
          >
            <div className='flex justify-between items-start gap-4'>
              <div className='flex gap-4 items-start'>
                <motion.img
                  src={item.profile_pic_url || defaultImage}
                  alt='profile_photo'
                  className={`w-12 h-12 rounded-full object-cover ${
                    !item.profile_pic_url ? 'animate-pulse bg-muted/40' : ''
                  }`}
                  initial={
                    hasAnimated
                      ? { scale: 1, rotate: 0 }
                      : { scale: 0, rotate: -180 }
                  }
                  animate={{ scale: 1, rotate: 0 }}
                  transition={
                    hasAnimated
                      ? {}
                      : {
                          type: 'spring',
                          damping: 15,
                          stiffness: 200,
                          delay: index * 0.05 + 0.2,
                        }
                  }
                  onError={(e) => {
                    e.currentTarget.src = defaultImage;
                  }}
                />
                <div className='flex flex-1 flex-col'>
                  <motion.h2
                    className='text-md line-clamp-1 font-medium'
                    initial={
                      hasAnimated
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -20 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    transition={
                      hasAnimated ? {} : { delay: index * 0.05 + 0.3 }
                    }
                  >
                    {isFieldLoading(item.name) ? (
                      <SkeletonLine width='w-32' height='h-4' />
                    ) : (
                      item.name
                    )}
                  </motion.h2>
                  <motion.div
                    className='mt-2 flex gap-2'
                    initial={
                      hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      hasAnimated ? {} : { delay: index * 0.05 + 0.4 }
                    }
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <GmailIcon
                        width={24}
                        height={24}
                        className={`transition-opacity duration-200 ${
                          !item.email ? 'opacity-20' : 'hover:opacity-80'
                        }`}
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <LinkedinIcon
                        width={24}
                        height={24}
                        className={`transition-opacity duration-200 ${
                          !item.linkedin_url ? 'opacity-20' : 'hover:opacity-80'
                        }`}
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <GithubIcon
                        width={24}
                        height={24}
                        className={`transition-opacity duration-200 ${
                          !item.github_url ? 'opacity-20' : 'hover:opacity-80'
                        }`}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>

            {isFieldLoading(item.justification) ? (
              <motion.div
                className='space-y-2'
                initial={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={hasAnimated ? {} : { delay: index * 0.05 + 0.5 }}
              >
                <SkeletonLine />
                <SkeletonLine width='w-5/6' />
                <SkeletonLine width='w-4/6' />
              </motion.div>
            ) : (
              <motion.p
                className='line-clamp-3 text-md text-muted-foreground'
                initial={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={hasAnimated ? {} : { delay: index * 0.05 + 0.5 }}
              >
                {item.justification}
              </motion.p>
            )}

            <motion.div
              className='flex flex-wrap justify-between items-center mt-auto pt-4'
              initial={
                hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={hasAnimated ? {} : { delay: index * 0.05 + 0.6 }}
            >
              <BadgeDelta
                variant='complex'
                iconStyle='line'
                value={item?.talent_score ?? 0}
              />

              <div className='flex items-center gap-2'>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant='outline' size='sm' className='text-xs'>
                    <span>Shortlist</span>
                    <Bookmark className='w-3 h-3 ml-1' />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant='outline' size='sm' className='text-xs'>
                    <span>Hide</span>
                    <Eye className='w-3 h-3 ml-1' />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence mode='wait'>
        {selectedItem && (
          <Dialog open={!!selectedItem} onOpenChange={handleClose}>
            <DialogContent className='sm:max-w-[1100px] flex flex-col h-[80vh] p-0 gap-0 [&>button]:hidden dark:bg-sidebar'>
              <DialogHeader className='flex flex-row justify-between items-center p-4 border-b border-b-border'>
                <DialogTitle className='text-md'>More Info</DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}

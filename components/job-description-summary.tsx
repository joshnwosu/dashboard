// components/job-description-summary.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JobDescriptionSummaryProps {
  content: string;
}

export function JobDescriptionSummary({ content }: JobDescriptionSummaryProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const truncatedContent =
    content.length > 200 ? content.substring(0, 200) + '...' : content;

  return (
    <Card>
      <CardHeader className='pb-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <FileText className='h-5 w-5' />
            <CardTitle className='text-lg'>Job Description</CardTitle>
          </div>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setIsExpanded(!isExpanded)}
            className='gap-2'
          >
            {isExpanded ? (
              <>
                <EyeOff className='h-4 w-4' />
                Hide
              </>
            ) : (
              <>
                <Eye className='h-4 w-4' />
                View Full
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-muted-foreground whitespace-pre-wrap'>
          {isExpanded ? content : truncatedContent}
        </p>
      </CardContent>
    </Card>
  );
}

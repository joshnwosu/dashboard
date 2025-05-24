// components/cv-list.tsx
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Calendar,
  User,
  Download,
  BarChart3,
  Loader2,
} from 'lucide-react';
import { CVScreeningItem } from '@/types/cv-screening';

interface CVListProps {
  cvScreenings: CVScreeningItem[];
  isLoading: boolean;
  onRefresh: () => void;
}

export function CVList({ cvScreenings, isLoading, onRefresh }: CVListProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'analyzed':
        return (
          <Badge variant='secondary' className='text-green-700 bg-green-100'>
            Analyzed
          </Badge>
        );
      case 'error':
        return <Badge variant='destructive'>Error</Badge>;
      case 'pending':
        return <Badge variant='outline'>Pending</Badge>;
      default:
        return <Badge variant='outline'>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDownload = (cvUrl: string, candidateName: string) => {
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = `${candidateName}_CV.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    console.log('yoo:', cvScreenings);
  }, [cvScreenings]);

  if (isLoading) {
    return (
      <Card>
        <CardContent className='flex items-center justify-center py-12'>
          <div className='flex items-center gap-2'>
            <Loader2 className='h-5 w-5 animate-spin' />
            <span>Loading CVs...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!cvScreenings) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center py-12 text-center'>
          <FileText className='h-12 w-12 text-muted-foreground mb-4' />
          <h3 className='text-lg font-medium mb-2'>No CVs uploaded yet</h3>
          <p className='text-sm text-muted-foreground mb-4'>
            Upload your first CV using the upload zone above
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>
          Uploaded CVs ({cvScreenings.length})
        </h3>
      </div>

      {/* <div className='grid gap-4'>
        {cvScreenings &&
          cvScreenings?.map((cv) => (
            <Card key={cv.id}>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3 flex-1'>
                    <FileText className='h-5 w-5 text-muted-foreground' />

                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center gap-2 mb-1'>
                        <div className='flex items-center gap-2'>
                          <User className='h-4 w-4 text-muted-foreground' />
                          <p className='text-sm font-medium'>
                            {cv.candidate_name || 'Unknown Candidate'}
                          </p>
                        </div>
                        {getStatusBadge(cv.status)}
                      </div>

                      <div className='flex items-center gap-4 text-xs text-muted-foreground'>
                        <div className='flex items-center gap-1'>
                          <Calendar className='h-3 w-3' />
                          {formatDate(cv.uploaded_at)}
                        </div>
                        {cv.score && (
                          <div className='flex items-center gap-1'>
                            <BarChart3 className='h-3 w-3' />
                            Score: {cv.score}/100
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    {cv.cv_file_url && (
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() =>
                          handleDownload(cv.cv_file_url, cv.candidate_name)
                        }
                        className='gap-1'
                      >
                        <Download className='h-4 w-4' />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div> */}
    </div>
  );
}

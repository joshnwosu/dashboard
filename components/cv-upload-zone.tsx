// components/cv-upload-zone.tsx
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CVUploadZoneProps {
  onFileUpload: (file: File) => void;
  isUploading?: boolean;
}

export function CVUploadZone({ onFileUpload, isUploading }: CVUploadZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]); // Upload one file at a time
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject, open } =
    useDropzone({
      onDrop,
      accept: {
        'application/pdf': ['.pdf'],
        'application/msword': ['.doc'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          ['.docx'],
      },
      disabled: isUploading,
      multiple: false,
      noClick: true, // Disable click on the entire zone
    });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        'border-2 border-dashed transition-colors',
        isDragActive && 'border-primary bg-primary/5',
        isDragReject && 'border-destructive bg-destructive/5',
        isUploading && 'opacity-50'
      )}
    >
      <CardContent className='flex flex-col items-center justify-center py-12 text-center'>
        <input {...getInputProps()} />

        {isUploading ? (
          <>
            <Loader2 className='h-12 w-12 text-primary mb-4 animate-spin' />
            <p className='text-lg font-medium'>Processing CV...</p>
            <p className='text-sm text-muted-foreground'>
              Extracting text content from your document
            </p>
          </>
        ) : isDragReject ? (
          <>
            <AlertCircle className='h-12 w-12 text-destructive mb-4' />
            <p className='text-sm text-destructive'>
              Only PDF, DOC, and DOCX files are supported
            </p>
          </>
        ) : (
          <>
            <div className='flex items-center justify-center mb-4'>
              <div className='relative'>
                <Upload className='h-12 w-12 text-muted-foreground' />
                <FileText className='h-6 w-6 absolute -bottom-1 -right-1 text-primary' />
              </div>
            </div>

            <div className='space-y-4'>
              <div className='space-y-2'>
                <p className='text-lg font-medium'>
                  {isDragActive ? 'Drop CV here' : 'Upload CV'}
                </p>
                <p className='text-sm text-muted-foreground'>
                  Drag and drop a CV file here, or click the button below
                </p>
                <p className='text-xs text-muted-foreground'>
                  We'll extract the text content from your PDF, DOC, or DOCX
                  file
                </p>
              </div>

              <Button onClick={open} disabled={isUploading} className='gap-2'>
                <Upload className='h-4 w-4' />
                Choose CV File
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

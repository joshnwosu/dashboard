// hooks/use-cv-upload.ts
import { useState, useCallback } from 'react';
import { CVFile, CVAnalysis } from '@/types/cv-screening';
import { uploadCV as uploadCVService, analyzeCV } from '@/services/cv-service';

export function useCVUpload() {
  const [cvFiles, setCVFiles] = useState<CVFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const addCVFiles = useCallback((files: File[]) => {
    const newCVFiles: CVFile[] = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      size: file.size,
      status: 'pending',
      progress: 0,
    }));

    setCVFiles((prev) => [...prev, ...newCVFiles]);

    // Start uploading immediately
    newCVFiles.forEach((cv) => {
      uploadCV(cv.id);
    });
  }, []);

  const removeCVFile = useCallback((id: string) => {
    setCVFiles((prev) => prev.filter((cv) => cv.id !== id));
  }, []);

  const uploadCV = useCallback(
    async (id: string) => {
      setIsUploading(true);

      setCVFiles((prev) =>
        prev.map((cv) =>
          cv.id === id
            ? { ...cv, status: 'uploading' as const, progress: 0 }
            : cv
        )
      );

      try {
        const cv = cvFiles.find((c) => c.id === id);
        if (!cv) return;

        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setCVFiles((prev) =>
            prev.map((c) =>
              c.id === id && c.progress < 70
                ? { ...c, progress: c.progress + 10 }
                : c
            )
          );
        }, 200);

        // Upload file
        await uploadCVService(cv.file);

        // Analyze CV
        const jobDescription = sessionStorage.getItem('jobDescription') || '';
        const analysis = await analyzeCV(cv.file, jobDescription);

        clearInterval(progressInterval);

        setCVFiles((prev) =>
          prev.map((c) =>
            c.id === id
              ? {
                  ...c,
                  status: 'success' as const,
                  progress: 100,
                  analysisResult: analysis,
                }
              : c
          )
        );
      } catch (error) {
        setCVFiles((prev) =>
          prev.map((c) =>
            c.id === id
              ? {
                  ...c,
                  status: 'error' as const,
                  errorMessage: 'Failed to process CV',
                }
              : c
          )
        );
      } finally {
        setIsUploading(false);
      }
    },
    [cvFiles]
  );

  return {
    cvFiles,
    addCVFiles,
    removeCVFile,
    uploadCV,
    isUploading,
  };
}

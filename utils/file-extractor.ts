// // utils/file-extractor.ts
// import * as pdfjs from 'pdfjs-dist';
// import * as mammoth from 'mammoth';

// // Set the worker source for PDF.js
// // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

// export async function extractTextFromFile(file: File): Promise<string> {
//   const fileType = file.type;
//   const fileName = file.name.toLowerCase();

//   try {
//     if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
//       return await extractTextFromPDF(file);
//     } else if (
//       fileType ===
//         'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
//       fileName.endsWith('.docx')
//     ) {
//       return await extractTextFromDocx(file);
//     } else if (fileType === 'application/msword' || fileName.endsWith('.doc')) {
//       // Note: .doc files are harder to parse, you might want to handle this differently
//       throw new Error(
//         'Legacy .doc files are not supported. Please convert to .docx or PDF.'
//       );
//     } else {
//       throw new Error(
//         'Unsupported file type. Please upload PDF or DOCX files.'
//       );
//     }
//   } catch (error) {
//     console.error('Error extracting text from file:', error);
//     throw new Error('Failed to extract text from the file. Please try again.');
//   }
// }

// async function extractTextFromPDF(file: File): Promise<string> {
//   const arrayBuffer = await file.arrayBuffer();
//   const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

//   let fullText = '';

//   for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//     const page = await pdf.getPage(pageNum);
//     const textContent = await page.getTextContent();
//     const pageText = textContent.items.map((item: any) => item.str).join(' ');
//     fullText += pageText + '\n';
//   }

//   return fullText.trim();
// }

// async function extractTextFromDocx(file: File): Promise<string> {
//   const arrayBuffer = await file.arrayBuffer();
//   const result = await mammoth.extractRawText({ arrayBuffer });
//   return result.value.trim();
// }

// utils/file-extractor.ts
let pdfjsLib: any = null;
let mammoth: any = null;

async function initializePdfjs() {
  if (!pdfjsLib && typeof window !== 'undefined') {
    try {
      pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
    } catch (error) {
      console.error('Failed to load pdfjs-dist:', error);
      throw new Error('Failed to initialize PDF parser. Please try again.');
    }
  }
  return pdfjsLib;
}

async function initializeMammoth() {
  if (!mammoth && typeof window !== 'undefined') {
    try {
      mammoth = await import('mammoth');
    } catch (error) {
      console.error('Failed to load mammoth:', error);
      throw new Error('Failed to initialize DOCX parser. Please try again.');
    }
  }
  return mammoth;
}

export async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type;
  const fileName = file.name.toLowerCase();

  try {
    if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      return await extractTextFromPDF(file);
    } else if (
      fileType ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileName.endsWith('.docx')
    ) {
      return await extractTextFromDocx(file);
    } else if (fileType === 'application/msword' || fileName.endsWith('.doc')) {
      // Note: .doc files are harder to parse, you might want to handle this differently
      throw new Error(
        'Legacy .doc files are not supported. Please convert to .docx or PDF.'
      );
    } else {
      throw new Error(
        'Unsupported file type. Please upload PDF or DOCX files.'
      );
    }
  } catch (error) {
    console.error('Error extracting text from file:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to extract text from the file. Please try again.');
  }
}

async function extractTextFromPDF(file: File): Promise<string> {
  const pdfjs = await initializePdfjs();

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

  let fullText = '';

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(' ');
    fullText += pageText + '\n';
  }

  return fullText.trim();
}

async function extractTextFromDocx(file: File): Promise<string> {
  const mammothLib = await initializeMammoth();

  const arrayBuffer = await file.arrayBuffer();
  const result = await mammothLib.extractRawText({ arrayBuffer });
  return result.value.trim();
}

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Paper, Typography } from '@mui/material';
import {pdfjs, Document, Page } from 'react-pdf';

import type { PDFDocumentProxy } from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();


type PDFFile = string | File | null;
function FileUpload() {

    const [pdfFile, setPdfFile] = useState<PDFFile>(null);
    const [numPages, setNumPages] = useState<number>();
    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Ensure only PDF files are accepted
        const isPDF = acceptedFiles.every((file) => file.type === 'application/pdf');

        if (isPDF) {
            setPdfFile(acceptedFiles[0]);
        } else {
            console.error('Invalid file type. Please upload PDF files only.');
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {'application/pdf': [".pdf"]}, // Accept only PDF files,
        maxFiles: 1,
    });

    function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
        setNumPages(nextNumPages);
    }

    return (
        <Paper elevation={3}>
            <Box {...getRootProps()} p={3} textAlign="center">
                <input {...getInputProps()} />
                {pdfFile ? (
                    <div>
                        <Document file={pdfFile}  onLoadSuccess={onDocumentLoadSuccess}>
                            {Array.from(new Array(numPages), (el, index) => (
                                <Page
                                    key={`page_${index + 1}`}
                                    pageNumber={index + 1}
                                />
                            ))}
                        </Document>
                        <Typography>
                            Page 1 of {numPages}
                        </Typography>
                    </div>
                ) : (
                    <Typography>Drag & Drop or Click to Upload PDF</Typography>
                )}
            </Box>
        </Paper>
    );
}

export default FileUpload;

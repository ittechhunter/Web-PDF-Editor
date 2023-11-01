import React, {useEffect, useRef, useState} from 'react';
import {DropEvent} from 'react-dropzone';

import {Box, Grid, Paper} from '@mui/material';
import DropzoneArea from "@/components/Dropzone/DropzoneArea";
// import PdfViewer from "@/components/PDFContainer/PDFViewer";
import {PDFDocument} from 'pdf-lib'
import PDFDesigner from "@/components/PDFContainer/Designer";

type PDFFile = File | null;

function FileUpload() {
     const [pdfFile, setPdfFile] = useState<PDFFile>(null);
    // const [pdfInfo, setPdfInfo] = useState<string|null>(null);

    const onDrop = (acceptedFiles: File[], event: DropEvent) => {
        // Ensure only PDF files are accepted
        const isPDF = acceptedFiles.every((file) => file.type === 'application/pdf');

        if (isPDF) {
            setPdfFile(acceptedFiles[0]);
        } else {
            console.error('Invalid file type. Please upload PDF files only.');
        }
    }

    // useEffect(() => {
    //     (async function () {
    //         if (!pdfFile) return
    //         const doc = await pdfFile.arrayBuffer()
    //
    //         // Load a `PDFDocument` from the existing PDF bytes.
    //         const pdfDocument = await PDFDocument.load(doc)
    //         const pdfBytes = await pdfDocument.save();
    //         const docUrl = URL.createObjectURL(
    //             new Blob(pdfBytes, { type: "application/pdf" })
    //         );
    //         setPdfInfo(docUrl)
    //     })();
    //
    //     // return () => PSPDFKit && PSPDFKit.unload(container);
    // }, [pdfFile]);

    if (!pdfFile) {
        return (
            <DropzoneArea
                acceptedFiles={{'application/pdf': [".pdf"]}}
                dropzoneText={"Drag and drop an image here or click"}
                onChange={(files) => console.log('Files:', files)}
                filesLimit={10}
                onDrop={onDrop}
            />
        )
    }

    return (
        <Paper elevation={3} style={{cursor: 'pointer'}}>
            <Box p={3} textAlign="center">
                <PDFDesigner/>
            </Box>
        </Paper>
    );
}

export default FileUpload;

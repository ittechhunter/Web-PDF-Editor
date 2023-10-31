import React, {useState, useEffect, useRef} from 'react';
import {DropEvent} from 'react-dropzone';
import PSPDFKit from "pspdfkit";
import {Box, Paper,  Grid} from '@mui/material';
import DropzoneArea from "@/components/Dropzone/DropzoneArea";
import PdfViewer from "@/components/PDFContainer/PDFViewer";


type PDFFile = File | null;

function FileUpload() {
    const containerRef = useRef(null);
    const [pdfFile, setPdfFile] = useState<PDFFile>(null);

    const onDrop = (acceptedFiles: File[], event: DropEvent) => {
        // Ensure only PDF files are accepted
        const isPDF = acceptedFiles.every((file) => file.type === 'application/pdf');

        if (isPDF) {
            setPdfFile(acceptedFiles[0]);
        } else {
            console.error('Invalid file type. Please upload PDF files only.');
        }
    }

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return
        (async function () {
            if (PSPDFKit) {
                PSPDFKit.unload(container);
            }
            if (!pdfFile) return
            const doc = await pdfFile.arrayBuffer()
            await PSPDFKit.load({
                container,
                document: doc,
                baseUrl: `${window.location.protocol}//${window.location.host}/`,
            });
        })();

        // return () => PSPDFKit && PSPDFKit.unload(container);
    }, [pdfFile]);

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
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Paper elevation={3} style={{cursor: 'pointer'}}>
                    <Box p={3} textAlign="center">
                        <div ref={containerRef} style={{ height: "100vh" }} />
                    </Box>
                </Paper>

                <Paper elevation={3} style={{cursor: 'pointer'}}>
                    <Box p={3} textAlign="center">
                        <PdfViewer pdfFile={pdfFile}/>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                {/* Side Menu */}
                <Paper elevation={3}>
                    {/* Content for side menu */}
                </Paper>
            </Grid>
        </Grid>
    );
}

export default FileUpload;

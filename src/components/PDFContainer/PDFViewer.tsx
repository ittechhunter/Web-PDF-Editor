import {useState, useRef, useEffect} from 'react';
import {pdfjs, Document, Page } from 'react-pdf';


import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';


// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.js',
//     import.meta.url,
// ).toString();

export default function PdfViewer({pdfFile}: {
    pdfFile: File
}) {
    const [pdfBytes, setPdfBytes] = useState(null)
    useEffect(() => {
        let result
        setTimeout(async ()=>{
            result = await pdfFile.arrayBuffer()
        }, 100)
    }, []);

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    if (!pdfFile){
        return (
            <div>...Loading</div>
        )
    }
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <div
                style={{
                    height: '750px',
                    width: '900px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >

                <Viewer fileUrl={"./test.pdf"} plugins={[defaultLayoutPluginInstance]} />
            </div>
        </Worker>
    );
}
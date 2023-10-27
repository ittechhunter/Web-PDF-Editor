import React from "react";
import PageWrapper from "@/components/PageWrapper";
import {getLayout} from "@/components/layouts/PrettyLayout";


import dynamic from 'next/dynamic';

/**
 * Critical: prevents "TypeError: url.replace is not a function" error
 */
const FileUpload = dynamic(() => import('@/components/FileUpload'), {
    ssr: false,
});


function Page() {
    return (
        <div>
            <FileUpload />
        </div>
    )
}

Page.getLayout = getLayout
Page.PageWrapper = PageWrapper;

export default Page;
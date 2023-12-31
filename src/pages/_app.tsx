import React from "react";

import '@/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

import type {AppProps} from "@/lib/app-providers";


function MyApp(props: AppProps) {
    const {Component, pageProps} = props;

    if (Component.PageWrapper !== undefined) return Component.PageWrapper(props);
    return <Component {...pageProps} />;
}

export default MyApp

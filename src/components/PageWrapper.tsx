import Head from "next/head";
import Script from "next/script";


import type {AppProps} from "@/lib/app-providers";
import AppProviders from "@/lib/app-providers";
import {ReactNode} from "react";


export interface IPageWrapper {
    (props?: AppProps): ReactNode;

    PageWrapper?: AppProps["Component"]["PageWrapper"];
}


function PageWrapper(props: AppProps) {
    const {Component, pageProps, err, router} = props;
    let pageStatus = "200";

    if (router.pathname === "/404") {
        pageStatus = "404";
    } else if (router.pathname === "/500") {
        pageStatus = "500";
    }

    // On client side don't let nonce creep into DOM
    // It also avoids hydration warning that says that Client has the nonce value but server has "" because browser removes nonce attributes before DOM is built
    // See https://github.com/kentcdodds/nonce-hydration-issues
    // Set "" only if server had it set otherwise keep it undefined because server has to match with client to avoid hydration error
    const nonce = typeof window !== "undefined" ? (pageProps.nonce ? "" : undefined) : pageProps.nonce;
    const providerProps = {
        ...props,
        pageProps: {
            ...props.pageProps,
            nonce,
        },
    };
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page);

    const path = router.asPath;

    return (
        <AppProviders {...providerProps}>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                />
            </Head>
            <Script
                nonce={nonce}
                id="page-status"
                dangerouslySetInnerHTML={{__html: `window.PageStatus = '${pageStatus}'`}}
            />

            {getLayout(<Component {...pageProps} err={err}/>, router)}
        </AppProviders>
    );
}

export default PageWrapper;

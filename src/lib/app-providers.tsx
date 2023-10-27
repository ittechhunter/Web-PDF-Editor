import React from "react";
import type {ReactNode} from "react";
import type {AppProps as NextAppProps} from "next/app";
import type {NextRouter} from "next/router";

import NextNProgress from "nextjs-progressbar";
import {CacheProvider} from "@emotion/react";
import createCache, {EmotionCache} from "@emotion/cache";

import {MetaProvider} from "@/components/ui/meta";
import AppThemeProvider from "@/providers/theme/provider";
import type {WithNonceProps} from "@/lib/withNonce";



// Workaround for https://github.com/vercel/next.js/issues/8592
export type AppProps = Omit<
    NextAppProps<WithNonceProps & Record<string, unknown>>,
    "Component"
> & {
    Component: NextAppProps["Component"] & {
        getLayout?: (page: React.ReactElement, router: NextRouter) => ReactNode;
        PageWrapper?: (props: AppProps) => ReactNode;
    };
    emotionCache?: EmotionCache

    /** Will be defined only is there was an error */
    err?: Error;
};

type AppPropsWithChildren = AppProps & {
    children: ReactNode;
};


function createEmotionCache() {
    return createCache({key: 'css'})
}

const clientSideEmotionCache = createEmotionCache();

const AppProviders = (props: AppPropsWithChildren) => {
    const {emotionCache = clientSideEmotionCache} = props
    return (
            <CacheProvider value={emotionCache}>
                <AppThemeProvider>
                    <NextNProgress
                        color="#29D"
                        startPosition={0.3}
                        stopDelayMs={200}
                        height={3}
                        showOnShallow={true}
                        nonce={'my-nonce'} options={{easing: "ease", speed: 500}}
                    />
                    <MetaProvider>{props.children}</MetaProvider>
                </AppThemeProvider>
            </CacheProvider>
    );
};

export default AppProviders;

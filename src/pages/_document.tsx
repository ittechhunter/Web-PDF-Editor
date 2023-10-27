import Document, {DocumentContext, Head, Html, Main, NextScript} from 'next/document'
import { parseCookies } from 'nookies'
import createEmotionServer from '@emotion/server/create-instance'
import React from "react";


import createEmotionCache from '@/lib/createEmotionCache';
import {getTheme} from '@/providers/theme/theme';
import {COOKIE_THEME} from "@/lib/constants";

interface MyProps {
    mode: ThemeMode
}

type ThemeMode = 'light' | 'dark'


export default class MyDocument extends Document<MyProps> {
    static async getInitialProps(ctx: DocumentContext) {
        return await Document.getInitialProps(ctx)
    }

    render() {
        const theme = getTheme(this.props.mode)

        return (
            <Html>
                <Head>
                    <meta name="theme-color" content={theme.palette.background.default || '#1C2128'}/>
                    <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png"/>
                    <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png"/>
                    <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png"/>
                    <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png"/>
                    <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png"/>
                    <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png"/>
                    <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png"/>
                    <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png"/>
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png"/>
                    <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                    <link rel="manifest" href="/manifest.json"/>
                    <meta name="msapplication-TileColor" content="#ffffff"/>
                    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
                    <meta name="theme-color" content="#ffffff"/>
                    <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    />
                </Head>
                <body style={{
                    background: theme.palette.background.default || '#1C2128'
                }}>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}


MyDocument.getInitialProps = async ctx => {
    const originalRenderPage = ctx.renderPage

    const cookies = parseCookies(ctx.res)
    const mode = (cookies[COOKIE_THEME] as ThemeMode) || 'light'
    const cache = createEmotionCache()
    const { extractCriticalToChunks } = createEmotionServer(cache)

    ctx.renderPage = () =>
        originalRenderPage({
            // eslint-disable-next-line
            enhanceApp: (App: any) => props => <App emotionCache={cache} {...props} />
        })

    const initialProps = await Document.getInitialProps(ctx)

    // This is important. It prevents emotion to render invalid HTML.
    // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = extractCriticalToChunks(initialProps.html)
    const emotionStyleTags = emotionStyles.styles.map((style: any) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ))

    return {
        ...initialProps,
        mode,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags]
    }
}

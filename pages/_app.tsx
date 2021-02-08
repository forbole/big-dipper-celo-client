import { ApolloClient, ApolloProvider } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { init } from '@socialgouv/matomo-next';
import Head from 'next/head';
import React, { useEffect } from 'react';

import BottomNavigation from '../components/Layout/BottomNavigation/BottomNavigation';
import Footer from '../components/Layout/Footer/Footer';
import Layout from '../components/Layout/Layout';
import possibleTypes from '../possibleTypes.json';
import DarkTheme from '../themes/celo-theme';

const MATOMO_URL = 'https://analytics.bigdipper.live/';
const MATOMO_SITE_ID = 3;

const cache = new InMemoryCache({ possibleTypes });

export const client = new ApolloClient({
    uri: 'https://server.celo.bigdipper.live/graphql',
    cache,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network'
        }
    }
});

export default function App(props: { Component: any; pageProps: any }): JSX.Element {
    const { Component, pageProps } = props;

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentElement) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
        init({
            url: MATOMO_URL,
            siteId: MATOMO_SITE_ID
        });
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Big Dipper For Celo</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ThemeProvider theme={DarkTheme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <ApolloProvider client={client}>
                    <Layout>
                        <Component {...pageProps} style={{ display: 'flex' }} />
                    </Layout>
                </ApolloProvider>

                <Footer />
                <BottomNavigation />
            </ThemeProvider>
        </React.Fragment>
    );
}

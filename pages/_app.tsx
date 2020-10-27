/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ApolloClient, ApolloProvider, HttpLink } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from 'next/app';
import Head from 'next/head';
import React from 'react';

import BottomNavigation from '../components/BottomNavigation';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import possibleTypes from '../possibleTypes.json';
import DarkTheme from '../themes/celo-theme';

const cache = new InMemoryCache({ possibleTypes });

const client = new ApolloClient({
    cache,
    link: new HttpLink({ uri: process.env.uriGQL }),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network'
        }
    }
});

interface AppState {
    theme: string;
}

export default class TSApp extends App<AppState> {
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement!.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <React.Fragment>
                <ApolloProvider client={client}>
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
                        <Layout>
                            <Component {...pageProps} style={{ display: 'flex' }} />
                        </Layout>
                        <Footer />
                        <BottomNavigation />
                    </ThemeProvider>
                </ApolloProvider>
            </React.Fragment>
        );
    }
}

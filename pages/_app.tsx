/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { HttpLink, split } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
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

const wsLink = process.browser
    ? new WebSocketLink({
          // only instantiate in the browser
          uri: `wss://server.celo.bigdipper.live/graphql`,
          options: {
              reconnect: true,
              lazy: true
          }
      })
    : (null as any);

const httplink = new HttpLink({
    uri: 'https://server.celo.bigdipper.live/graphql',
    credentials: 'same-origin'
});

interface DefinintionProps {
    kind: string;
    operation?: string;
}

const link = process.browser
    ? split(
          //only create the split in the browser
          // split based on operation type
          ({ query }) => {
              const { kind, operation }: DefinintionProps = getMainDefinition(query);
              return kind === 'OperationDefinition' && operation === 'subscription';
          },
          wsLink,
          httplink
      )
    : httplink;

const ssrMode = typeof window === 'undefined';

const cache = new InMemoryCache({ possibleTypes });

const client = new ApolloClient({
    ssrMode,
    cache,
    link,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network'
        }
    }
});

export default function App(props: any) {
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

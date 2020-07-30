import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from '../components/Layout';
import DarkTheme from '../themes/celo-theme';
import App, { Container } from 'next/app';
import Footer from '../components/Footer';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

import introspectionQueryResultData from '../fragmentTypes.json';
import { InMemoryCache } from 'apollo-cache-inmemory';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const fetch = require('node-fetch').default;
const cache = new InMemoryCache({ fragmentMatcher });

const client = new ApolloClient({
  uri: 'https://server.celo.bigdipper.live/graphql',
  fetch: fetch,
  cache,
});


interface AppProps {
}

interface AppState {
  theme: String;
}

export default class TSApp extends App<AppProps, AppState>{
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
              <Component {...pageProps} style={{ display: "flex", }} />
            </Layout>
            <Footer />
          </ThemeProvider>
        </ApolloProvider>
      </React.Fragment>
    );
  }
}


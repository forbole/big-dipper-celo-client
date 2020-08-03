import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from '../components/Layout';
import DarkTheme from '../themes/celo-theme';
import App, { Container } from 'next/app';
import Footer from '../components/Footer';
import { ApolloClient, ApolloProvider, useQuery, HttpLink } from '@apollo/client';
import { gql } from "@apollo/client";

import { InMemoryCache } from '@apollo/client/cache';
import possibleTypes from '../possibleTypes.json'

const cache = new InMemoryCache({ possibleTypes });

const client = new ApolloClient({
  cache,
  link: new HttpLink({ uri: 'https://server.celo.bigdipper.live/graphql' },),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
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
              <Component {...pageProps} style={{ display: "flex" }} />
              <Footer />
            </Layout>
          </ThemeProvider>
        </ApolloProvider>
      </React.Fragment>
    );
  }
}


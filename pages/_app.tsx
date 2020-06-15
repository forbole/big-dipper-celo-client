import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from '../components/Layout';
import DarkTheme from '../themes/celo-theme';
import App, { Container } from 'next/app';
// import withRedux from 'next-redux-wrapper';
// import { initStore } from '../redux/store';
// import { Provider } from 'react-redux';
import Footer from '../components/Footer';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';


const fetch = require('node-fetch').default;

const client = new ApolloClient({
  uri: 'https://server.celo.bigdipper.live/graphql',
  fetch: fetch
});

// client
//   .query({
//     query: gql`
//         {
//           blocks(page: 55, pageSize: 12) {
//             cursor
//             pageSize
//             page
//             blocks{
//               _id
//               extraData
//               gasUsed
//               hash
              
//               miner
//               number
//               parentHash
//             }
//             }
//           }
//     `
// })
//           .then(result => console.log(result));



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

  // export default withRedux(initStore)(class MyApp extends App<AppProps, AppState> {
  //   static async getInitialProps ({Component, ctx}) {
  //     return {
  //       pageProps: (Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
  //     }
  //   }
  

  render() {
    const { Component, pageProps } = this.props;

    // store.dispatch({
    //   type: "getBlockHeight",
    //   payload:{
    //     description: "Block1"
    //   }

    // })

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
  

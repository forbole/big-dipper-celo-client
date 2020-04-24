import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from '../components/Layout';
import DarkTheme from '../themes/dark-theme';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../redux/store';
import { Provider } from 'react-redux';


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

    return (
      <React.Fragment>
        <Head>
          <title>Celo Big Dipper</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ThemeProvider theme={DarkTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Container maxWidth={false}>
          {/* <Provider store={store}> */}
            <Layout>
              <Component {...pageProps} />
            </Layout>
            {/* </Provider> */}
          </Container>
        </ThemeProvider>
      </React.Fragment>
    );
  }
  }
  


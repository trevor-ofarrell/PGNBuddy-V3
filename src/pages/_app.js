import React from 'react';
import Head from 'next/head';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AuthProvider } from '../../auth';

//
// A note about Server Side Rendering w/ stylesheets & Material UI
// https://material-ui.com/guides/server-rendering/#server-rendering
// -
export default function SaveApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const theme = createMuiTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '*::-webkit-scrollbar': {
            width: '1.25em',
          },
          '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(29, 26, 24)',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(49, 46, 44)',
          },
          body: {
            overflow: 'hidden',
            height: 'auto',
            width: 'auto',
            position: 'fixed',
          },
        },
      },
    },
  });

  return (
    <AuthProvider>
      <>
        <Head>
          <link rel="shortcut icon" href="/chrome-extensionmanagementpage-48-48.png" />
          <title>PGNBuddy</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <meta name="description" content="Store, view, analyze, and edit your PGN files from anywhere, on any device. Import games from lichess using the lichess.org API, or upload your own files." />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Aldrich&display=swap" rel="stylesheet" />
          <link rel="manifest" href="manifest.json" />
          <link rel="apple-touch-icon" href="mobileicon-96-96.png" />
          <meta name="apple-mobile-web-app-status-bar" content="rgb(29, 26, 24)" />
        </Head>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </MuiThemeProvider>
      </>
    </AuthProvider>
  );
}

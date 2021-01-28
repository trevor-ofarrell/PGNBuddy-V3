import React from "react";
import { AuthProvider } from '../../auth';
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "../theme/font.css";
import theme from "../theme";

//
// A note about Server Side Rendering w/ stylesheets & Material UI
// https://material-ui.com/guides/server-rendering/#server-rendering
// -
export default function SaveApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <AuthProvider>
      <React.Fragment>
        <Head>
          <link rel="shortcut icon" href="/chrome-extensionmanagementpage-48-48.png" />
          <title>PGNBuddy</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <meta name="description" content="Store, view, analyze, and edit your PGN files from anywhere, on any device. Import games from lichess using the lichess.org API, or upload your own files."/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Aldrich&display=swap" rel="stylesheet"/>
          <link rel="manifest" href="manifest.json"/>
          <link rel="apple-touch-icon" href="/chrome/mobileicon-96-96.png" />
          <meta name="apple-mobile-web-app-status-bar" content="#90cdf4" />    
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    </AuthProvider>
  );
}
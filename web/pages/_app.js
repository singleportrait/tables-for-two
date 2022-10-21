import Head from 'next/head';
// import { useEffect } from 'react';
// import TagManager from 'react-gtm-module';

import '../styles/fonts.css';
import '../styles/globals.css';

/* If wanting to install Google Analytics, can use this code below: */
// useEffect(() => {
//   TagManager.initialize({ gtmId: 'GTM-NLH7WG6' });
// }, []);

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#FFFFFF" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#FFFFFF" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    </Head>
    <Component {...pageProps} />
  </>
);

export default MyApp;

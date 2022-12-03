import Head from 'next/head';
// eslint-disable-next-line camelcase
import { IBM_Plex_Mono } from '@next/font/google';
import localFont from '@next/font/local';

// import { useEffect } from 'react';
// import TagManager from 'react-gtm-module';

/* If wanting to install Google Analytics, can use this code below: */
// useEffect(() => {
//   TagManager.initialize({ gtmId: 'GTM-NLH7WG6' });
// }, []);

import '../styles/fonts.css';
import '../styles/globals.css';

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mono',
});

const ppEditorial = localFont({
  src: '../public/fonts/ppeditorialnew-ultrabold-webfont.woff2',
  variable: '--font-serif',
});

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
    <main className={`${ibmPlexMono.variable} ${ppEditorial.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  </>
);

export default MyApp;

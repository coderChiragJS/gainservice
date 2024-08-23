import React from 'react';
import { AppProps } from 'next/app';
import { wrapper } from 'Redux/store';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
};

export default wrapper.withRedux(MyApp);

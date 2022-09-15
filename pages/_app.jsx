import '../assets/base.css';
import '../styles/globals.css'
import { Layout } from '../components/Layout';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { I18nextProvider } from 'react-i18next';
import i18n from '../page-components/i18n';
import { store } from '../store/store';

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
            <Toaster />
          </Layout>
        </ThemeProvider>
      </I18nextProvider>
    </Provider>
  );
}

import Head from 'next/head';
import Nav from './Nav';
import Footer from './Footer';
import styles from './Layout.module.css';
import { useTranslation } from 'react-i18next';

const Layout = ({ children }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>Lottery</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description"/>
        <meta property="og:title" content="lottery App" />
      </Head>
      <Nav />
      <div className={styles.outerContainer}>
          <main>
            {children}
          </main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;

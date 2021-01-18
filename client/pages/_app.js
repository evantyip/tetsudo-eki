//import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import 'antd/dist/antd.css';
import Sidebar from '../components/sidebar';
import { Layout } from 'antd';
import '../css/styles.css';

// AppComponent (think wrapper)
//
// Description:
// every rendered component will be wrapped by AppComponent
// also global css is applied through this

const AppComponent = ({ Component, pageProps, currentUser, router }) => {
  return (
    <Layout>
      <Sidebar currentUser={currentUser} route={router.route} {...pageProps} />
      <Component currentUser={currentUser} {...pageProps} />
    </Layout>
  );
};

// get initial props for App Component and <Component />
// if needed
AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;

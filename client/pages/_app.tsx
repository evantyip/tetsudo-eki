//import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import 'antd/dist/antd.css';
import Sidebar from '../components/sidebar';
import { Layout } from 'antd';
import '../css/styles.css';
import {
  AppContextType,
  AppInitialProps,
} from 'next/dist/next-server/lib/utils';
import { AppWrapper, useUserContext } from '../contexts/UserContext';

// AppComponent (think wrapper)
//
// Description:
// every rendered component will be wrapped by AppComponent
// also global css is applied through this

interface Context extends AppContextType, AppInitialProps {
  currentUser: {
    id: string;
    email: string;
    iat: number;
  };
}

const AppComponent = ({
  Component,
  pageProps,
  currentUser,
  router,
}: Context) => {
  return (
    <AppWrapper>
      <Layout>
        <Sidebar
          currentUser={currentUser}
          route={router.route}
          {...pageProps}
        />
        <Component currentUser={currentUser} {...pageProps} />
      </Layout>
    </AppWrapper>
  );
};

// get initial props for App Component and <Component />
// if needed
AppComponent.getInitialProps = async (appContext: AppContextType) => {
  // @ts-ignore
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      // @ts-ignore
      // sends client and current user
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

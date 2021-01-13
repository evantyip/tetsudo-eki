import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';
import type {AppProps , AppContext } from 'next/app'

// AppComponent (think wrapper)
//
// Description:
// every rendered component will be wrapped by AppComponent
// also global css is applied through this
//

interface CurrentUser {
  email: string;
  id: string;

}

const AppComponent = ({ Component, pageProps, currentUser }: {Component: AppProps; pageProps: AppProps; currentUser: CurrentUser}) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

// get initial props for App Component and <Component />
// if needed
AppComponent.getInitialProps = async (appContext: AppContext) => {
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

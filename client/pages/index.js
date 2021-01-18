// Landing Page
//
// Description:
// shows a list of all available tickets

import Link from 'next/link';
import buildClient from '../api/build-client';
import CustomFooter from '../components/footer';
import { Layout, Menu } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

// import { getServerSideProps } from 'next';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <Layout className="site-layout" style={{ marginLeft: 200 }}>
      <Header className="site-layout-background" style={{ padding: 0 }} />
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, textAlign: 'center' }}
        >
          welcome {currentUser && currentUser.email}
          This is the Discover Page
        </div>
      </Content>
      <CustomFooter />
    </Layout>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  // const { data } = await client.get('/api/tickets');
  // return { tickets: data };
};

export default LandingPage;

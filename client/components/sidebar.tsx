import Router from 'next/router';
import Link from 'next/link';
import { Layout, Menu, Typography } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { CurrentUser } from '../interfaces/currentUser';
const { Sider, Content, Header } = Layout;
const { Title } = Typography;

// Header component
// Description:
//
// conditionally renders sign in/ sign up/ sign out
// is a top nav bar

// Need to research
// pathname if useRouter() router.pathname?????

type AppProps = {
  currentUser: CurrentUser;
  route: string;
};

const Sidebar = ({ currentUser, route }: AppProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    // @ts-ignore
    .map(({ label, href }) => {
      return (
        <Menu.Item key={href} icon={<UserOutlined />}>
          <Link href={href}>{label}</Link>
        </Menu.Item>
      );
    });

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(e) => {
        setCollapsed(!collapsed);
      }}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <div className="logo">
        {collapsed == false && (
          <Title className="logo-title" level={3}>
            Tetsudo Eki
          </Title>
        )}
      </div>

      <Menu theme="dark" mode="inline" defaultSelectedKeys={[`${route}`]}>
        {links}
        <Menu.Item key="/" icon={<SearchOutlined />}>
          <Link href="/">Discover</Link>
        </Menu.Item>
        {currentUser && (
          <Menu.Item key="/watching" icon={<SearchOutlined />}>
            <Link href="/">Watching</Link>
          </Menu.Item>
        )}
        {currentUser && (
          <Menu.Item key="/completed" icon={<SearchOutlined />}>
            <Link href="/">Completed</Link>
          </Menu.Item>
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;

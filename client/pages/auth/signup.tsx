import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import CustomFooter from '../../components/footer';
import { Layout, Button, Form, Input, Space, Typography } from 'antd';
import {ValidateErrorEntity} from 'rc-field-form/lib/interface';

const { Content } = Layout;
const { Title, Text } = Typography;

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};
// Signup page
//
// Description:
// see title

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => {
      Router.push('/');
    },
  });

  const onFinish = async (values: string) => {
    doRequest();
  };

  const onFinishFailed = (errorInfo:ValidateErrorEntity) => {
    // Maybe future stuff
  };

  // maybe change to a form?
  return (
    <Layout className="site-layout" style={{ marginLeft: 200 }}>
      {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, textAlign: 'center' }}
        >
          {errors}
          <Title level={2}>Sign Up</Title>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" shape="round" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <CustomFooter />
    </Layout>
  );
};

export default Signup;

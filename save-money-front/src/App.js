import {
    AccountBookOutlined,
    PropertySafetyOutlined,
    BarChartOutlined
  } from '@ant-design/icons';

import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('账本', '1', <AccountBookOutlined />),
  getItem('资产', '2', <PropertySafetyOutlined />),
  getItem('统计', '3', <BarChartOutlined />),
];
const App = () => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsed={true}
             style={{background: "#ffffff", width: "50px"}}>
        <div className="logo" style={{height: '64px'}} />
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            background: "#ffffff"
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            Bill is a cat.
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
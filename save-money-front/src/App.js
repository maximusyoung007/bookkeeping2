import {
    AccountBookOutlined,
    PropertySafetyOutlined,
    BarChartOutlined
  } from '@ant-design/icons';

import Account from "./account/account";
import AddBooking from "./booking/AddBooking";
import { Route, Routes, useNavigate } from "react-router-dom";
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
  getItem('账本', '/Account', <AccountBookOutlined />),
  getItem('资产', '/AddBooking',  <PropertySafetyOutlined />),
  getItem('统计', '/Cal', <BarChartOutlined />),
];
const App = () => {
  const [collapsed, setCollapsed] = useState(true);

  const navigate = useNavigate();

  const onClick = (e) => {
      console.log(e)
      navigate(e.key, {replace : true})
  }

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsed={true}
             style={{background: "#ffffff", width: "50px"}}>
        <div className="logo" style={{height: '64px'}} />
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={onClick}/>
      </Sider>
      <Layout className="site-layout">
          <Routes>
              <Route exact path="/Account" element={<Account />}/>
              <Route exact path="/AddBooking" element={<AddBooking />}/>
              <Route exact path="/" element={<Account/>}/>
          </Routes>
      </Layout>
    </Layout>
  );
};
export default App;
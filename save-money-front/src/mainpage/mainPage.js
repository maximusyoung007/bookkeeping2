import {AccountBookOutlined, BarChartOutlined, PropertySafetyOutlined} from '@ant-design/icons';

import Account from "../account/account";
import Booking from "../booking/Booking";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Layout, Menu} from 'antd';
import React, {useState} from 'react';
import SubType from "../booking/subTxType";

const { Sider} = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('账本', '/Booking', <AccountBookOutlined/>),
  getItem('资产', '/Account', <PropertySafetyOutlined/>),
  getItem('统计', '/Cal', <BarChartOutlined/>),
];
const MainPage = ({match}) => {

  const navigate = useNavigate();

  const onClick = (e) => {
    console.log(e)
    navigate(e.key, {replace: true})
  }

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsed={true}
             style={{background: "#ffffff", width: "50px"}}>
        <div className="logo" style={{height: '64px'}}/>
        <Menu theme="light" defaultSelectedKeys={['Booking']} mode="inline" items={items} onClick={onClick}/>
      </Sider>
      <Layout className="site-layout">
        <Routes>
          <Route exact path={`${match.url}`/Account} element={<Account/>}/>
          <Route exact path="`${match.url}`/Booking" element={<Booking/>}/>
          <Route exact path={`${match.url}`} element={<Booking/>}/>
          {/* <Route exact path="/subTxType/:txType" element={<SubType/>}/> */}
        </Routes>
      </Layout>
    </Layout>
  );
};
export default MainPage;